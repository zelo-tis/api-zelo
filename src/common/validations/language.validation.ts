import { check } from 'express-validator';

export const insert = [
  check('description').isString().notEmpty(),
  check('languageCode').isString().notEmpty()
];

export const update = [
  check('description').isString().optional().notEmpty(),
  check('languageCode').isString().optional().notEmpty()
];
