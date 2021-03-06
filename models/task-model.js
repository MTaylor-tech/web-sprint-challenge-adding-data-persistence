const db = require("../data/config")

function getTasks() {
	return db("tasks as t")
    .join("projects as p", "p.id", "t.project_id")
    .select("t.description","t.notes","t.complete","p.name as project_name","p.description as project_description")
}

async function getTask(id) {
	const task = await db("tasks as t")
    .join("projects as p", "p.id", "t.project_id")
    .where("t.id",id)
    .first("t.description","t.notes","t.complete","p.name as project_name","p.description as project_description")

  return task
}

async function updateTask(id, changes) {
	await db("tasks").where({ id }).update(changes)
	const task = await getTask(id)
	return task
}

function removeTask(id) {
	return db("tasks").where({id}).del()
}

function validateTaskId() {
	return async (req, res, next) => {
		try {
			const { id } = req.params
			const task = await db("tasks").where({ id }).first()

			if (!task) {
				return res.status(404).json({
					message: "Task not found",
				})
			}

			req.task = task
			next()
		} catch(err) {
			next(err)
		}
	}
}

function validateTask() {
	return (req,res,next) => {
    if (!req.body || !req.body.description) {
  		// Make sure you have a return statement, otherwise the
  		// function will continue running and you'll see ERR_HTTP_HEADERS_SENT
  		res.status(400).json({
  			message: "Need a value for description",
  		})
  	} else {
			if (!req.body.complete) {
				req.body.complete = false
			}
      next()
    }
  }
}

function validateTaskForUpdate() {
	return (req,res,next) => {
    if (!req.body || !req.body.description) {
  		// Make sure you have a return statement, otherwise the
  		// function will continue running and you'll see ERR_HTTP_HEADERS_SENT
  		res.status(400).json({
  			message: "Need a value for description",
  		})
  	} else {
      next()
    }
  }
}

module.exports = {
	getTasks,
	getTask,
  updateTask,
  removeTask,
  validateTaskId,
	validateTask,
	validateTaskForUpdate,
}
