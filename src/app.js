import express, { json, urlencoded } from 'express'
import logger from 'morgan'
import router from './router'

const app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))

/**
 * OAuth authentication routes.
 */
app.use(router)

app.set('port', 3001)

export default app
