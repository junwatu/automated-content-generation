import express from 'express'
import bodyParser from 'body-parser'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as GridDB from "./libs/griddb.cjs"
import { generateRoute } from './routes/generate.js'
import { logger } from './libs/logger.js'

const __dirname = dirname(fileURLToPath(import.meta.url));
const { collectionDb, store, conInfo, containerName } = await GridDB.initGridDbTS()

logger.info(await GridDB.containersInfo(store))

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/generate', generateRoute)

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post('/api/content', async (req, res) => {
	const response = req.body
	logger.info(JSON.stringify(response))

	const content = [parseInt(getRandomInt(1, 1000)), response.title, response.content, response.imageUrl]
	console.log(content)
	//save data to GridDB
	const saveStatus = GridDB.insert(content, collectionDb)
	if (saveStatus.status) {
		res.json({ status: saveStatus, operation: 'save' })
	} else {
		res.json({ status: saveStatus, operation: 'save' })
	}
})

app.get("/api/contents", async (req, res) => {
	const data = await GridDB.queryAll(conInfo, store)
	console.log(data)
	res.json({ posts: data })
})

app.get("/api/content/:id", async (req, res) => {
	const { id } = req.params
	const data = await GridDB.queryByID(id, conInfo, store)
	console.log(data[0])
	res.json({ post: data })
})


app.get("/api/container/drop", (req, res) => {

	store.dropContainer(containerName)
		.then(() => {
			console.log('Connect to Cluster');
			return store.putContainer(conInfo);
		})
		.then(() => {
			console.log("Sample data generation: Create Collection name=%s", containerName);
			return store.getContainerInfo(containerName);
		})
		.then((info) => {
			console.log("Get ContainerInfo: \n    name=%s", info.name);
			if (info.type == griddb.ContainerType.COLLECTION) {
				console.log('    type=Collection');
			} else {
				console.log('    type=TimeSeries');
			}
			console.log("    rowKeyAssigned=%s", info.rowKey.toString());
			console.log("    columnCount=%d", info.columnInfoList.length);
			info.columnInfoList.forEach(
				element => console.log("    column (%s, %d)",
					element[0], element[1])
			);
			console.log('Success!');
			return true;
		})
		.catch(err => {
			if (err.constructor.name == 'GSException') {
				for (var i = 0; i < err.getErrorStackSize(); i++) {
					console.log("[%d]", i);
					console.log(err.getErrorCode(i));
					console.log(err.getMessage(i));
				}
			} else {
				console.log(err);
			}
		});
	res.json({})
})

app.get("/", async function (req, res) {
	res.json({ app: "automated content generation" })
})
app.listen(port, () => {
	logger.info(`Server running at http://localhost:${port}`)
});
