const errorHandler = require('express-async-handler');
const Goal = require('../model/goalsModel');

// @desc   Get Goals
// @route  GET api/goals
// @access Private
const getGoals = errorHandler(async (req, res) => {
    const allGoals = await Goal.find({ user: req.user.id});
    res.status(200).json({
        message: "Fetch all data successfuly",
        data: allGoals
    })
})

// @desc   Get Goals
// @route  GET api/goals/:id
// @access Private
const getGoalsById = errorHandler(async (req, res) => {

    const getById = await Goal.findById(req.params.id);

    if (!getById) {
        res.status(404);
        throw new Error(`Record not found: ${req.params.id}`);
    }

    if (!getById.user || getById.user.toString() !== req.user.id) {
        res.status(404);
        throw new Error('Record not found');
    }

    res.status(200).json({
        message: "Get data successfully",
        data: getById
    });
});

// @desc   create Goals
// @route  POST api/goals
// @access Private
const createGoals = errorHandler(async (req, res) => {
    if (!req.body || !req.body.text || !req.body.feedback) {
        res.status(400);
        throw new Error("Please add all feild");
    }
    const newGoal = await Goal.create({
        text: req.body.text,
        feedback: req.body.feedback,
        user: req.user.id
    });

    res.status(201).json({
        goal: newGoal,
        message: "Created data successfully"
    });
});

// @desc   update Goals
// @route  PUT api/goals/:id
// @access Private
const updateGoals = errorHandler(async (req, res) => {
    const id = req.params.id;
    const { text, feedback } = req.body;
    
    const getById = await Goal.findById(req.params.id);
    if (!getById) {
        res.status(404);
        throw new Error(`Record not found: ${req.params.id}`);
    }

    if (!getById.user || getById.user.toString() !== req.user.id) {
        res.status(404);
        throw new Error('Record not found');
    }

    const update = await Goal.findByIdAndUpdate(
        id, { text: text , feedback: feedback}, { new: true }
    );

    res.status(200).json({
        message: `${getById.text} Update data successfuly`,
        data: update
    })
})

// @desc   Delete Goals
// @route  DELETE api/goals/:id
// @access Private
const deleteGoals = errorHandler(async (req, res) => {
    const getById = await Goal.findById(req.params.id);
    if (!getById) {
        res.status(404);
        throw new Error(`Record not found: ${req.params.id}`);
    }

    if (!getById.user || getById.user.toString() !== req.user.id) {
        res.status(404);
        throw new Error('Record not found');
    }

    const deletes = await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json({
        message: ` ${getById.text} Deleted successfuly`,
        data: deletes
    })
})


module.exports = {
    getGoals,
    getGoalsById,
    createGoals,
    updateGoals,
    deleteGoals
}