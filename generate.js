import express from 'express';
export const generateRoute = express.Router();

generateRoute.get('/', (req, res) => {
	res.json({ message: 'Generate route' });
});
