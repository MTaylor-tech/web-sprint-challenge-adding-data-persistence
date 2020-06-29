const db = require("../data/config")

function getResources() {
	return db("resources")
		.select("*")
}

async function getResource(id) {
	const resource = await db("resources")
		.where({id})
    .first()

  return resource
}

function getProjectsByResource(resource_id) {
  return db("projects_resources as pr")
    .where("pr.resource_id", resource_id)
    .leftJoin("projects as p", "pr.project_id", "p.id")
    .select("p.name as project_name", "p.description", "p.complete")
}

async function addResource(resource) {
	const [id] = await db("resources").insert(resource)
	return getResource(id)
}

async function updateResource(id, changes) {
	await db("resources").where({ id }).update(changes)
	const resource = await db("resources").where({ id }).first()
	return resource
}

function removeResource(id) {
	return db("resources").where({id}).del()
}

function validateResourceId() {
	return async (req, res, next) => {
		try {
			const { id } = req.params
			const resource = await db("resources").where({ id }).first()

			if (!resource) {
				return res.status(404).json({
					message: "Resource not found",
				})
			}

			req.resource = resource
			next()
		} catch(err) {
			next(err)
		}
	}
}

function validateResource() {
	return (req,res,next) => {
    if (!req.body || !req.body.name) {
  		// Make sure you have a return statement, otherwise the
  		// function will continue running and you'll see ERR_HTTP_HEADERS_SENT
  		res.status(400).json({
  			message: "Need a value for name",
  		})
  	} else {
      next()
    }
  }
}

module.exports = {
	getResources,
	getResource,
  getProjectsByResource,
	addResource,
	updateResource,
	removeResource,
  validateResourceId,
	validateResource,
}
