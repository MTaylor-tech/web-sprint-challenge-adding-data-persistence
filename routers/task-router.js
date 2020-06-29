const express = require("express")
const db = require("../models/task-model")

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


module.exports = router
