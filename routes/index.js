import {app, csrfProtection} from '../server'

app.get('/', (req, res) => res.render('home'))