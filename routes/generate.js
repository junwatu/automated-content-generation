import express from 'express'
import { generateContent } from '../libs/contentai.js'
import { logger } from '../libs/logger.js'

export const generateRoute = express.Router();

function sanitizeJSON(jsonString) {
	// This will remove any non-printable ASCII characters
	return jsonString.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
}

generateRoute.post('/', async (req, res) => {
	const content = await generateContent(req.body.prompt)
	logger.info(content)
	let sanitizedJSON = sanitizeJSON(JSON.stringify(content));
	let obj = JSON.parse(sanitizedJSON);

	res.json({ content: obj })
});
