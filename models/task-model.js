const db = require("../data/config")

function getTasks() {
	return db("tasks as t")
    .join("projects as p", "p.id", "t.project_id")
    .select("t.description","t.notes","t.complete","p.name as project_name")
}

async function getTask(id) {
	const task = await db("tasks as t")
    .join("projects as p", "p.id", "t.project_id")
    .where("t.id",id)
    .first("t.description","t.notes","t.complete","p.name as project_name")

  return task
}


module.exports = {
	getTasks,
	getTask,
}
