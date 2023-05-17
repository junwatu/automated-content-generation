import express from 'express';
import { generateRoute } from './generate.js';
import { imageRoute } from './image.js';

const app = express();
const port = 3000;

app.use('/api/generate', generateRoute);
app.use('/api/image', imageRoute);
app.get("/", async function (req, res) {
	res.json({ app: "automated content generation" })
})
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
