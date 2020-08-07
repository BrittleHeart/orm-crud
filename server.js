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

export const app = express()
export const csrfProtection = csurf({cookie: true})

export const transporter = nodeMailer.createTransport({
    pool: true,
    host: "smtp.poczta.onet.pl",
    port: 465,
    secure: true,
    auth: {
      user: 'skrillexpl@op.pl',
      pass: 'B+GB!6EwpgO%GbyL',
    },
})

app.use(expressSession({
    secret: 'iasid992142j9$!farqrtqwfq<24141!@$!1r1!1ffsds_351Qfw3!$!',
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
