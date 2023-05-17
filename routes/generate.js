import express from 'express'
import { generateContent } from '../libs/contentai.js'

export const generateRoute = express.Router();

generateRoute.post('/', async (req, res) => {
	const content = await generateContent(req.body.prompt)
	res.json({ content })
});
