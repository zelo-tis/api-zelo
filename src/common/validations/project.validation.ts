import { check } from 'express-validator';

export const insert = [
  check('description').isString().notEmpty(),
  check('githubRepo').isString().notEmpty(),
  check('transifex.projectName').isString().notEmpty(),
  check('transifex.projectSlug').isString().notEmpty(),
  check('transifex.resourceName').isString().notEmpty(),
  check('transifex.resourceSlug').isString().notEmpty(),
  check('transifex.resourceLanguage').isString().notEmpty(),
  check('languages').isArray()
];

export const update = [
  check('description').isString().notEmpty().optional(),
  check('githubRepo').isString().notEmpty().optional(),
  check('transifex.projectName').isString().notEmpty().optional(),
  check('transifex.projectSlug').isString().notEmpty().optional(),
  check('transifex.resourceName').isString().notEmpty().optional(),
  check('transifex.resourceSlug').isString().notEmpty().optional(),
  check('transifex.resourceLanguage').isString().notEmpty().optional(),
  check('languages').isArray().optional()
];
