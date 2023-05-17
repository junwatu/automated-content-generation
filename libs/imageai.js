
import * as dotenv from 'dotenv'

dotenv.config()

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
	let prediction;
	// timeout in milliseconds
	const timeout = 15000;
	const endTime = Date.now() + timeout;

	while (Date.now() < endTime) {
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

		prediction = await response.json();

		if (prediction.status === 'succeeded') {
			return JSON.stringify(prediction);
		}

		// Wait before making another request
		await new Promise(resolve => setTimeout(resolve, 1000));
	}

	// Return the last prediction if it's still not 'succeeded' after the timeout
	return JSON.stringify(prediction);
}


export { generateImageAI, getImageAIByID }
