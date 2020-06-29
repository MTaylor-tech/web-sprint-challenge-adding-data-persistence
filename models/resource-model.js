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

module.exports = {
	getResources,
	getResource,
  getProjectsByResource,
}
