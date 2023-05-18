import { OpenAIApi, Configuration } from "openai"
import { logger } from '../libs/logger.js'
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

	return `Make a blog with 500 words minimal and 700 words maxiumum using this topic:
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
		const message = completion.data.choices[0].message;
		logger.info(message);
		return message;
	} catch (error) {
		console.error("Error occurred while generating content:", error)
		return "An error occurred while generating content."
	}
}

export { createContentPrompt, generateContent }