import express from 'express'
import { } from '../libs/contentai'

export const generateRoute = express.Router();

generateRoute.post('/', async (req, res) => {
	const content = await generateContent(req.body.prompt)
	res.json({ content })
});
