import KnexInterface from 'knex';
import knex from '../../database';

export default abstract class Model<T> {
  public table: string;

  protected knex: KnexInterface;

  public columns: string[];

  constructor(table: string, columns?: string[]) {
    this.table = table;
    this.knex = knex;
    this.columns = columns || ['*'];
  }

  public getSelect(alias = 't') {
    return this.columns.map((colName) => `${alias}.${colName}`);
  }

  public knexGetAll(where?: T, renameColumns = true) {
    let query = this.knex(this.knex.raw(`${this.table} t`));
    if (renameColumns) query = query.select(this.getSelect());
    if (where) query = query.where(where);
    return query;
  }

  public async getAll(where?: T, renameColumns = true) {
    return this.knexGetAll(where, renameColumns);
  }

  public knexGetOne(where?: T, renameColumns = true) {
    return this.knexGetAll(where, renameColumns).first();
  }

  public async getOne(where?: T, renameColumns = true) {
    return this.knexGetOne(where, renameColumns);
  }

  public knexInsert(data: T | T[]) {
    return this.knex(this.table).insert(data);
  }

  public async insert(data: T | T[]) {
    return this.knexInsert(data);
  }

  public knexUpdate(where: T, data: T) {
    return this.knex(this.table)
      .where(where)
      .update(data);
  }

  public async update(where: T, data: T) {
    return this.knexUpdate(where, data);
  }

  public knexDelete(where?: T) {
    return this.knex(this.table)
      .where(where)
      .del();
  }

  public async delete(where?: T) {
    return this.knexDelete(where);
  }
}
