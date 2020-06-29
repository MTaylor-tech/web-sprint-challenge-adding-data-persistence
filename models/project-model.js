const db = require("../data/config")

function getProjects() {
	return db("projects")
		.select("*")
}

async function getProject(id) {
	const project = await db("projects")
		.where({id})
    .first()

  project.resources = await getResourcesByProject(id)
  project.tasks = await getTasksByProject(id)

  return project
}

function getResourcesByProject(project_id) {
  return db("resources as r")
    .join("projects_resources as pr", "r.id", "pr.resource_id")
    .where("pr.project_id", project_id)
    .select("r.name as resource_name","r.description as resource_description")
}

function getTasksByProject(project_id) {
  return db("tasks as t")
    .where("project_id", project_id)
    .join("projects as p", "p.id", "t.project_id")
    .select("t.description","t.notes","t.complete","p.name as project_name")
}

module.exports = {
	getProjects,
	getProject,
  getResourcesByProject,
  getTasksByProject,
}
