const express = require("express")
const db = require("../models/resource-model")


const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		const resources = await db.getResources()
		res.json(resources)
	} catch(err) {
		next(err)
	}
})

router.get("/:id", db.validateResourceId(), async (req, res, next) => {
	try {
		const resource = await db.getResource(req.params.id)
		if (!resource) {
			return res.status(404).json({
				message: "Resource not found",
			})
		}

		res.json(resource)
	} catch(err) {
		next(err)
	}
})

router.get("/:id/projects", db.validateResourceId(), async(req, res, next) => {
  try {
    const projects = await db.getProjectsByResource(req.params.id)
    if (projects.length<1) {
      return res.status(404).json({
				message: "No Projects Found",
			})
    }
    res.json(projects)
  } catch(err) {
		next(err)
	}
})

router.post("/", db.validateResource(), async (req, res, next) => {
	try {
		const resource = db.addResource(req.body)

		res.status(201).json(resource)
	} catch(err) {
		next(err)
	}
})

router.put("/:id", db.validateResourceId(), db.validateResource(), async (req, res, next) => {
	try {
		req.body.id = req.params.id
		const resource = db.updateResource(req.params.id, req.body)

		res.json(resource)
	} catch(err) {
		next(err)
	}
})

router.delete("/:id", db.validateResourceId(), async (req, res, next) => {
	try {
		await db.removeResource(req.params.id)

		res.json({message: "Resource removed", resource: req.resource})
	} catch(err) {
		next(err)
	}
})

module.exports = router
