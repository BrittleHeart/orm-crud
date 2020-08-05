import {app, csrfProtection} from '../server'
import UserController from '../app/http/controllers/UserController'

const user = new UserController()

app.get('/', async (req, res) => await user.index(req, res))