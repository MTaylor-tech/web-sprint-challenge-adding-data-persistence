const express = require("express")
const db = require("../models/project-model")

const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		const projects = await db.getProjects()
		res.json(projects)
	} catch(err) {
		next(err)
	}
})

router.get("/:id", async (req, res, next) => {
	try {
		const project = await db.getProject(req.params.id)
		if (!project) {
			return res.status(404).json({
				message: "Project not found",
			})
		}

		res.json(project)
	} catch(err) {
		next(err)
	}
})

router.get("/:id/resources", async (req, res, next) => {
  try {
    const resources = await db.getResourcesByProject(req.params.id)
    if (resources.length<1) {
      return res.status(404).json({
				message: "No Resources Found",
			})
    }
    res.json(resources)
  } catch(err) {
		next(err)
	}
})


router.get("/:id/tasks", async (req, res, next) => {
  try {
    const tasks = await db.getTasksByProject(req.params.id)
    if (tasks.length<1) {
      return res.status(404).json({
				message: "Tasks List Empty",
			})
    }
    res.json(tasks)
  } catch(err) {
		next(err)
	}
})


module.exports = router
