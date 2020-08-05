import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import csurf from 'csurf'
import logger from 'morgan'
import expressHandlebars from 'express-handlebars'
import * as path from 'path'
import * as fs from 'fs'

export const app = express()
export const csrfProtection = csurf({cookie: true})

app.use(express.static(path.resolve('./public/')))
app.use(express.static(path.resolve('../node_modules/')))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cookieParser())
app.use(logger('dev'))

app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

fs.readdir(path.resolve('./routes'), (error, files) => {
    if(error) throw new Error(`Could not find typed directory: ${error.stack}`)

    files.forEach(file => require(`./routes/${file}`))
})

app.listen(5000, () => console.log('Server has been exposed here -> http://localhost:5000'))
