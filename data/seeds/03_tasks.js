exports.seed = async function(knex) {
	await knex("tasks").insert([
		{ project_id: 1, description: "Remove old strings", complete: true},
    { project_id: 1, description: "Put on new strings", complete: false  },
    { project_id: 1, description: "Tune", notes: "(E)ddie (A)te (D)ynamite; (G)ood (B)ye, (E)ddie", complete: false  },
    { project_id: 1, description: "Practice", complete: false  },
    { project_id: 2, description: "Look for damage", notes: "I know the left front prop took a hit", complete: true},
    { project_id: 2, description: "Replace props", complete: true },
    { project_id: 2, description: "Set pids and rates", complete: true },
    { project_id: 2, description: "Test Flight", complete: true},
    { project_id: 3, description: "Make videos", complete: true},
    { project_id: 3, description: "Pull videos off SD Card", complete: true },
    { project_id: 3, description: "Edit videos", notes: "Don't forget that one from the other camera", complete: false },
    { project_id: 3, description: "Upload to YouTube", complete: false },
    { project_id: 4, description: "Be irresistible", complete: true},
    { project_id: 4, description: "Make cool vids", notes: "See other project", complete: false },
    { project_id: 4, description: "Gain followers", complete: false  },
	])
}
