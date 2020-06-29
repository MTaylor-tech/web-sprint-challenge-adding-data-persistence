exports.seed = async function(knex) {
	await knex("projects").insert([
		{ name: "Prepare Guitar", description: "Make it play.", complete: false },
    { name: "Repair and Ready Kwad", description: "Get out and fly", complete: true },
    { name: "Publish Videos", complete: false  },
    { name: "Build a following", description: "Get me some fame", complete: false  }
	])
}
