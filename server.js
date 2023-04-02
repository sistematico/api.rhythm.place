import { createServer } from 'http'
import connect from 'connect'
import cors from 'cors'
import { routes } from './router/index.js'

const port = Number(process.env.PORT) || 4000
const app = connect()

app.use(cors())
app.use(routes)

const server = createServer(app)
server.listen(port)