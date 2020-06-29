exports.seed = async function(knex) {
	await knex("resources").insert([
    { name: "guitar", description: "Epiphone Joe Pass" },
		{ name: "strings", description: "Elixirs" },
		{ name: "tuner" },
		{ name: "fpv goggles", description: "FatShark Attitude V5" },
		{ name: "betaflight software" },
		{ name: "lipos" },
		{ name: "radio", description: "FrSky Taranis X9" },
		{ name: "props" },
		{ name: "screws" },
    { name: "camera", description: "GoPro Hero 8" },
    { name: "SD card" },
    { name: "laptop" },
    { name: "external HD" },
    { name: "Final Cut Pro" },
    { name: "magnetic personality" },
    { name: "drive to succeed" },
	])
}
