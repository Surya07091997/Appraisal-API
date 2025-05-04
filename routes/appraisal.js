import express from 'express';
import { appraisalRecords } from '../utils/mockData.js';
import {
  validateScore,
  validateComment,
  validateSummaryComment,
  validateStatus
} from '../middleware/validators.js';
import { validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import cards from '../utils/cardsData.js';
import { generateToken } from '../auth.js';

const router = express.Router();

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.put('/:id/score', authenticateToken, (req, res) => {
  console.log("Updating score...");
  const { id } = req.params;
  if (!appraisalRecords[id]) return res.status(404).json({ message: 'Record not found' });
  appraisalRecords[id].score = req.body.score;
  res.json({ message: 'Score updated', data: appraisalRecords[id] });
});

router.put('/:id/feedback', authenticateToken, (req, res) => {
  const { id } = req.params;
  if (!appraisalRecords[id]) return res.status(404).json({ message: 'Record not found' });
  appraisalRecords[id].comment = req.body.comment;
  res.json({ message: 'Comment updated', data: appraisalRecords[id] });
});

router.put('/:id/summary-comment', authenticateToken, (req, res) => {
  const { id } = req.params;
  if (!appraisalRecords[id]) return res.status(404).json({ message: 'Record not found' });
  appraisalRecords[id].summaryComment = req.body.summaryComment;
  res.json({ message: 'Summary comment updated', data: appraisalRecords[id] });
});

router.put('/:id/summary-date', authenticateToken, (req, res) => {
  const { id } = req.params;
  if (!appraisalRecords[id]) return res.status(404).json({ message: 'Record not found' });
  appraisalRecords[id].summaryDate = req.body.summaryDate;
  res.json({ message: 'Summary date updated', data: appraisalRecords[id] });
});

router.put('/:id/status', authenticateToken, (req, res) => {
  const { id } = req.params;
  if (!appraisalRecords[id]) return res.status(404).json({ message: 'Record not found' });
  appraisalRecords[id].status = req.body.status;
  res.json({ message: 'Status updated', data: appraisalRecords[id] });
});

router.get('/cards', authenticateToken, handleValidation, (req, res) => {
  console.log("Fetching cards...");
  res.json(cards);
});
router.get('/token', (res) => {
  console.log("Generating token...");
  const token = generateToken(32);
  console.log('Your JWT token:', token);
  res.json({ token });
});

export default router;
