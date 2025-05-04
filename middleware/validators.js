import { body } from 'express-validator';

export const validateScore = [body('score').isInt({ min: 0, max: 100 }).withMessage('Score must be 0-100')];
export const validateComment = [body('comment').isLength({ min: 1 }).withMessage('Comment is required')];
export const validateSummaryComment = [body('summaryComment').isLength({ min: 1 }).withMessage('Summary Comment is required')];
export const validateStatus = [body('status').isIn(['Pending', 'Approved', 'Rejected']).withMessage('Invalid status')];
