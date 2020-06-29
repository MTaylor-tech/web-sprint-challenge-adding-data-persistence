const express = require("express")
const db = require("../models/task-model")
const data = require("../data/config")

const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		const tasks = await db.getTasks()
		res.json(tasks)
	} catch(err) {
		next(err)
	}
})

router.get("/:id", async (req, res, next) => {
	try {
		const task = await db.getTask(req.params.id)
		if (!task) {
			return res.status(404).json({
				message: "Task not found",
			})
		}

		res.json(task)
	} catch(err) {
		next(err)
	}
})

router.put("/:id", db.validateTaskId(), async (req, res, next) => {
	try {
		req.body.id = req.params.id
		const task = db.updateTask(req.params.id, req.body)

		res.json(task)
	} catch(err) {
		next(err)
	}
})

router.delete("/:id", db.validateTaskId(), async (req, res, next) => {
	try {
		await db.removeTask(req.params.id)

		res.json({message: "Task removed", task: req.task})
	} catch(err) {
		next(err)
	}
})


module.exports = router
