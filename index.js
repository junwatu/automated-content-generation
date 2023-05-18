import express from 'express'
import bodyParser from 'body-parser'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as GridDB from "./libs/griddb.cjs"
import { generateRoute } from './routes/generate.js'
import { imageRoute } from './routes/image.js'
import { logger } from './libs/logger.js'

const __dirname = dirname(fileURLToPath(import.meta.url));
const { collectionDb, store, conInfo } = await GridDB.initGridDbTS();

logger.info(await GridDB.containersInfo(store))

const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/generate', generateRoute)
app.use('/api/image', imageRoute)

app.get("/", async function (req, res) {
	res.json({ app: "automated content generation" })
})
app.listen(port, () => {
	logger.info(`Server running at http://localhost:${port}`)
});
