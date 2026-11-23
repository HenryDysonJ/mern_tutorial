const express = require("express");
const { getGoals, getGoalsById, createGoals, updateGoals, deleteGoals} = require('../controllers/goalsController');
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.route('/').get(protect, getGoals).post(protect, createGoals)
router.route('/:id').get(protect, getGoalsById).put(protect, updateGoals).delete(protect, deleteGoals);

module.exports = router;