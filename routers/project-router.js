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

router.get("/:id/resources", db.validateProjectId(), async (req, res, next) => {
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


router.get("/:id/tasks", db.validateProjectId(), async (req, res, next) => {
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

router.post("/", db.validateProject(), async (req, res, next) => {
	try {
		const project = db.addProject(req.body)

		res.status(201).json(project)
	} catch(err) {
		next(err)
	}
})

router.put("/:id", db.validateProjectId(), db.validateProjectForUpdate(), async (req, res, next) => {
	try {
		req.body.id = req.params.id
		const project = db.updateProject(req.params.id, req.body)

		res.json(project)
	} catch(err) {
		next(err)
	}
})

router.delete("/:id", db.validateProjectId(), async (req, res, next) => {
	try {
		await db.removeProject(req.params.id)

		res.json({message: "Project removed", project: req.project})
	} catch(err) {
		next(err)
	}
})

router.post("/:id/tasks", db.validateProjectId(), db.validateTask(), async (req, res, next) => {
	try {
		req.body.project_id = req.params.id
		const task = db.addTask(req.body)

		res.json(task)
	} catch(err) {
		next(err)
	}
})




module.exports = router
