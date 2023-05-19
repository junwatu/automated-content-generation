/**
 * Not used for this project. 
 * It's intended for future use and scalable version of this project.
 */
import express from 'express'
import { getImageAIByID } from '../libs/imageai.js'
export const imageRoute = express.Router()

imageRoute.get('/:id', async (req, res) => {
	const content = await getImageAIByID(req.params.id)
	res.json({ content })
});
