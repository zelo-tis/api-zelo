import { RequestInterface, LabelInterface, PRInterface, RequestPictureInterface } from '../common/interfaces/database';
import Model from '../common/utils/class/model';
import Language from './language.model';
import RequestLanguage from './request-language.model';
import Label from './label.model';
import PR from './pr.model';
import RequestPicture from './request-picture.model';
import LabelLanguage from './label-language.model';
import { REQUEST_STATUS } from '../common/constants';

class Request extends Model<RequestInterface> {
  public id?: number;

  public labels?: LabelInterface[];

  public languages?: number[];

  public pullRequest?: PRInterface;

  public pictures?: RequestPictureInterface[];

  constructor() {
    const columns = [
      'id',
      'project_id AS projectId',
      'delivery_date AS deliveryDate',
      'feature',
      'description',
      'info',
      'created_at AS createdAt',
      'created_by AS createdBy',
      'status'
    ];

    super('request', columns);
  }

  public async getOne(where: RequestInterface) {
    const response = await super.knexGetOne(where);
    const id: number = +response.id;

    if (id) {
      response.pullRequest = await this.getPullRequest(id);
      response.languages = await this.getLanguages(id);
      response.labels = await this.getLabels(id);
      response.pictures = await this.getPictures(id);
    }

    return response;
  }

  public getLanguages(requestId: number) {
    return Language.knexGetAll()
      .leftJoin(
        this.knex.raw(`${RequestLanguage.table} rl`),
        't.id',
        'rl.language_id'
      )
      .where('rl.request_id', requestId);
  }

  public getPictures(requestId: number) {
    return RequestPicture.getAll({ request_id: requestId });
  }

  public getLabels(requestId: number) {
    return Label.knexGetAll({ request_id: requestId });
  }

  public getPullRequest(requestId: number) {
    return PR.getOne({ request_id: requestId });
  }

  public async list(
    orderBy: { column: number; order: number },
    page: number = 0,
    limit: number = 10,
    where?: RequestInterface
  ) {
    const { column = 0, order = 0 } = orderBy;
    const sortableColumns = [
      't.description',
      'labels',
      'comments',
      't.delivery_date',
      't.status'
    ];

    let query = this.knexGetAll(where)
      .select([
        'p.description AS project',
        this.knex.raw('COUNT(DISTINCT L.id) AS labels'),
        this.knex.raw('COUNT(DISTINCT C.id) AS comments')
      ])
      .leftJoin(this.knex.raw('project p'), 'p.id', 't.project_id')
      .leftJoin(this.knex.raw('label l'), 'l.request_id', 't.id')
      .leftJoin(this.knex.raw('comments c'), 'c.request_id', 't.id');

    if (this.languages) {
      query = query
        .leftJoin(this.knex.raw('request_language rl'), 'rl.request_id', 't.id')
        .whereIn('rl.language_id', this.languages);
    }

    const count = query.clone();

    const total = await count
      .select(this.knex.raw('COUNT(0) AS total'))
      .first()
      .then((response) => {
        const { total = 0 } = response;
        return total;
      });

    const data = await query
      .groupBy('t.id')
      .orderBy(sortableColumns[column], order == 0 ? 'DESC' : 'ASC')
      .limit(limit)
      .offset(page * limit);

    const percents = await Promise.all(
      data.map((item) => this.getLabelPercentCompleted(item.id))
    );

    data.forEach((item, key) => {
      item.languages = percents[key];
    });

    return {
      page,
      limit,
      total,
      data
    };
  }

  public getLabelPercentCompleted(requestId: number) {
    return this.knex
      .select([
        'll.language_id',
        'lang.description',
        this.knex.raw('(SUM(IF(ll.translated = 1, 1, 0)) / COUNT(ll.id)) * 100 AS percent')
      ])
      .from(this.knex.raw(`${Label.table} l`))
      .innerJoin(this.knex.raw(`${LabelLanguage.table} ll`), 'l.id', 'll.label_id')
      .innerJoin(this.knex.raw(`${Language.table} lang`), 'lang.id', 'll.language_id')
      .where({
        request_id: requestId
      })
      .groupBy('l.request_id', 'll.language_id');
  }

  public async insert(data: RequestInterface) {
    const response = await this.knexInsert(data);

    this.id = response[0];

    await this.afterSave();
    if (this.pullRequest) {
      await PR.insert({ ...this.pullRequest, request_id: this.id });
    }

    return response;
  }

  public async update(where: RequestInterface, data: RequestInterface) {
    this.id = where.id;
    const response = await this
      .knexUpdate(where, data)
      .catch((error) => error);

    if (this.id) {
      await this.afterSave();
      if (this.pullRequest) {
        await PR.update({ request_id: this.id }, this.pullRequest);
      }
    }

    return response;
  }

  public afterSave() {
    return Promise.all([this.saveLanguages(), this.saveLabels()]);
  }

  public async saveLabels() {
    const request_id = this.id;

    if (!request_id || this.labels === undefined) return false;

    const dataToInsert: LabelInterface[] = [];
    const promises: Promise<any>[] = [];
    const idsToNotDelete: number[] = [];

    for (const label of this.labels) {
      const data = {
        id: label.id,
        key: label.key,
        text: label.text,
        request_id,
        hash: label.hash
      };
      const { id } = data;

      if (id) {
        idsToNotDelete.push(id);
        promises.push(Label.update({ id }, data));
      } else {
        dataToInsert.push(data);
      }
    }

    await Label.knexDelete({ request_id }).whereNotIn('id', idsToNotDelete);

    if (dataToInsert.length > 0) promises.push(Label.insert(dataToInsert));

    return Promise.all(promises);
  }

  public async saveLanguages() {
    const request_id = this.id;

    if (!request_id || this.languages === undefined) return false;

    await this.deleteLanguages();

    const languagesToInert = this.languages.map((language_id) => ({
      language_id: +language_id,
      request_id
    }));

    return RequestLanguage.insert(languagesToInert);
  }

  public async deleteLanguages() {
    return this.knex(RequestLanguage.table)
      .where({ request_id: this.id })
      .del();
  }

  public async getRequestLabelsToCheck(project_id: number) {
    // const sql = 'select * from project p inner join request r on p.id = r.project_id  inner join  label l on r.id = l.request_id inner join label_language  ll on l.id = ll.label_id where ll.translated = 0;';
    const response = await this.knex
      .select([
        'LL.id',
        'L.key',
        'L.hash',
        'LANG.language_code',
        this.knex.raw('LANG.id AS language_id')
      ])
      .from(this.knex.raw(`${this.table} R`))
      .innerJoin(this.knex.raw('label L'), 'R.id', 'L.request_id')
      .innerJoin(this.knex.raw('label_language LL'), 'L.id', 'LL.label_id')
      .innerJoin(this.knex.raw('language LANG'), 'LL.language_id', 'LANG.id')
      .where({
        'R.project_id': project_id,
        'R.status': REQUEST_STATUS.TODO,
        'LL.translated': false
      });
    return response;
  }

  public async getProjectRequestToCheck() {
    const response = await this.knex
      .select(['*'])
      .from(this.knex.raw(`${this.table} R`))
      .innerJoin(this.knex.raw('project P'), 'R.project_id', 'P.id')
      .innerJoin(this.knex.raw('project_transifex PT'), 'P.id', 'PT.project_id')
      .where('R.status', REQUEST_STATUS.TODO);
    return response;
  }

  public async getProjectLanguagesToCheck(project_id: number) {
    const response = await this.knex
      .select(['LANG.*'])
      .from(this.knex.raw(`${this.table} R`))
      .innerJoin(this.knex.raw('project P'), 'R.project_id', 'P.id')
      .innerJoin(this.knex.raw('label L'), 'R.id', 'L.request_id')
      .innerJoin(this.knex.raw('label_language LL'), 'L.id', 'LL.label_id')
      .innerJoin(this.knex.raw('language LANG'), 'LL.language_id', 'LANG.id')
      .groupBy('LL.language_id')
      .where({
        'P.id': project_id,
        'R.status': REQUEST_STATUS.TODO,
        'LL.translated': false
      });

    return response;
  }
}

export default new Request();
