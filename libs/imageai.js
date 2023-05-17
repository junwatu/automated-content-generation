async function generateImageAI(prompt) {
	const response = await fetch("https://api.replicate.com/v1/predictions", {
		method: "POST",
		headers: {
			Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			version: "6359a0cab3ca6e4d3320c33d79096161208e9024d174b2311e5a21b6c7e1131c",
			input: { prompt },
		}),
	});

	if (response.status !== 201) {
		let error = await response.json();
		return JSON.stringify({ detail: error.detail })
	}

	const prediction = await response.json();
	return JSON.stringify(prediction);
};

async function getImageAIByID(id) {
	const response = await fetch(
		"https://api.replicate.com/v1/predictions/" + id,
		{
			headers: {
				Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
				"Content-Type": "application/json",
			},
		}
	);
	if (response.status !== 200) {
		let error = await response.json();
		return JSON.stringify({ detail: error.detail });
	}

	const prediction = await response.json();
	return JSON.stringify(prediction);
}

export { generateImageAI, getImageAIByID }
