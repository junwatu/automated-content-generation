import express from 'express'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'

import { generateRoute } from './routes/generate.js'
import { imageRoute } from './routes/image.js'

dotenv.config()

const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use('/api/generate', generateRoute)
app.use('/api/image', imageRoute)

app.get("/", async function (req, res) {
	res.json({ app: "automated content generation" })
})
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
});
