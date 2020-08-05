import {app, csrfProtection} from '../server'
import UserController from '../app/http/controllers/UserController'

const user = new UserController()

app.get('/', async (req, res) => await user.index(req, res))
app.get('/get/:id', async (req, res) => await user.show(req, res))
app.get('/action/create', csrfProtection, (req, res) => user.create(req, res))
app.post('/action/register', csrfProtection ,async (req, res) => await user.register(req, res))