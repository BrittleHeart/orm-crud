import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import csurf from 'csurf'
import logger from 'morgan'
import expressHandlebars from 'express-handlebars'
import methodOverride from 'method-override'
import * as path from 'path'
import * as fs from 'fs'
import connection from './config/database'
import nodeMailer from 'nodemailer'

require('dotenv').config()

export const app = express()
export const csrfProtection = csurf({cookie: true})

export const transporter = nodeMailer.createTransport({
    pool: true,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
})

app.use(expressSession({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false, sameSite: false, maxAge: 3600 * 1000}
}))

app.use(express.static('dist/'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(bodyParser.json())

app.use(cookieParser())
app.use(logger('dev'))

app.set('trust proxy', 1)

connection.authenticate()
    .then(() => console.log(`Connection succeed 😍`))
    .catch(error => new Error(`Invalid Credencials 😫: ${error}`))

app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

fs.readdir(path.resolve('./routes'), (error, files) => {
    if(error) throw new Error(`Could not find typed directory: ${error.stack}`)

    if(files.length)
        files.forEach(file => require(`./routes/${file}`))
    else
        throw new Error(`The directory is empty. Please create some files first 🤓`)

})

app.listen(5000, () => console.log('Server has been exposed here -> http://localhost:5000'))
