import { OpenAIApi, Configuration } from "openai"

import * as dotenv from 'dotenv'

dotenv.config()

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration)

function createContentPrompt(imagine) {
	if (!imagine) {
		throw new Error("User request is required to create a content prompt.")
	}

	return `Make a short blog of fewer than 700 words with this user request:
    \n
    ${imagine}
    \n
    The answer should be a JSON only with the format {title: [insert_title], content: [insert_content], imageprompt: [summarize_content_for_image_generation]}. Do not answer with the context or any explanation.`;
}

async function generateContent(imagine) {
	const prompt = createContentPrompt(imagine)
	try {
		const completion = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			max_tokens: 2000,
			messages: [{ role: "user", content: prompt }],
		});
		return completion.data.choices[0].message;
	} catch (error) {
		console.error("Error occurred while generating content:", error)
		return "An error occurred while generating content."
	}
}

export { createContentPrompt, generateContent }