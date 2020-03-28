import { check } from 'express-validator';

export const insert = [
  check('projectId').isNumeric().notEmpty(),
  check('deliveryDate').isString().notEmpty().optional(),
  check('feature').isString().optional(),
  check('description').isString().optional(),
  check('info').isString().optional(),
  check('status').isString().optional(),
  check('languages').isArray().optional(),
  check('labels').isArray(),
  check('labels.*.key').isString().notEmpty(),
  check('labels.*.text').isString().notEmpty(),
  check('pullRequest.userId').isNumeric().optional(),
  check('pullRequest.repoId').isNumeric().optional(),
  check('pullRequest.pullRequestId').isNumeric().optional(),
  check('pullRequest.mergedAt').isString().optional()
];

export const update = [
  check('projectId').isNumeric().notEmpty().optional(),
  check('deliveryDate').isString().notEmpty().optional(),
  check('feature').isString().optional(),
  check('description').isString().optional(),
  check('info').isString().optional(),
  check('status').isString().optional(),
  check('languages').isArray().optional(),
  check('labels').isArray().optional(),
  check('labels.*.key').isString().notEmpty().optional(),
  check('labels.*.text').isString().notEmpty().optional(),
  check('pullRequest.userId').isNumeric().optional(),
  check('pullRequest.repoId').isNumeric().optional(),
  check('pullRequest.pullRequestId').isNumeric().optional(),
  check('pullRequest.mergedAt').isString().optional()
];
