import {app, csrfProtection} from '../server'
import UserController from '../app/http/controllers/UserController'
import AuthenticateController from '../app/http/controllers/AuthenticateController'
import { checkSession, closeLoginForm } from '../app/http/middlewares/authorizationMiddleware'

const user = new UserController()
const authenticate = new AuthenticateController()
let code = Math.floor(Math.random() * 5000)

app.get('/', async (req, res) => await user.index(req, res))
app.get('/get/:id', async (req, res) => await user.show(req, res))
app.get('/action/create', csrfProtection, (req, res) => user.create(req, res))
app.post('/action/register', csrfProtection , async (req, res) => await user.register(req, res))
app.get('/action/edit/:id', csrfProtection , async (req, res) =>  user.edit(req, res))
app.put('/action/update/:id', csrfProtection , async (req, res) => await user.update(req, res))
app.delete('/action/destroy/:id', async (req, res) => await user.destroy(req, res))

// Authenticate
app.get('/authenticate/login', [csrfProtection, closeLoginForm], (req, res) => authenticate.login(req, res))
app.post('/authenticate/process', csrfProtection, async (req, res) => await authenticate.authenticate(req, res, code))
app.post('/authenticate/logout', async (req, res) => await authenticate.logout(req, res))

app.get('/authenticate/dashboard', checkSession , async (req, res) => await authenticate.dashboard(req, res))