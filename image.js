import express from 'express';
export const imageRoute = express.Router();

imageRoute.get('/', (req, res) => {
	res.json({ message: 'Image route' });
});
