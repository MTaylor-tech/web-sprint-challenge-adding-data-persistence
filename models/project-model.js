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
    .select("t.description","t.notes","t.complete","p.name as project_name","p.description as project_description")
}

async function addProject(project) {
	const [id] = await db("projects").insert(project)
	return getProject(id)
}

async function updateProject(id, changes) {
	await db("projects").where({ id }).update(changes)
	const project = await db("projects").where({ id }).first()
	return project
}

function removeProject(id) {
	return db("projects").where({id}).del()
}

function validateProjectId() {
	return async (req, res, next) => {
		try {
			const { id } = req.params
			const project = await db("projects").where({ id }).first()

			if (!project) {
				return res.status(404).json({
					message: "Project not found",
				})
			}

			req.project = project
			next()
		} catch(err) {
			next(err)
		}
	}
}

async function addTask(task) {
  const [id] = await db("tasks").insert(task)

  return db("tasks as t")
    .join("projects as p", "p.id", "t.project_id")
    .where("t.id",id)
    .first("t.description","t.notes","t.complete","p.name as project_name","p.description as project_description")
}

module.exports = {
	getProjects,
	getProject,
  getResourcesByProject,
  getTasksByProject,
	addProject,
	updateProject,
	removeProject,
	validateProjectId,
  addTask,
}
