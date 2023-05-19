import express from 'express'
import { logger } from '../libs/logger.js'

export const contentRoute = express.Router()

contentRoute.post('/', async (req, res) => {
	const response = req.body
	logger.info(JSON.stringify(response))
	res.json({ content: response })
});
