import bcrypt from 'bcrypt'
import User from '../../../models/User'
import UtilsController from './UtilsController'

const utils = new UtilsController()

class AuthenticateController {
    login(req, res) {
        return res.render('users/login', {csrfToken: req.csrfToken(), errors: req.session.error})
    }

    async authenticate(req, res) {
        const {email, password} = req.body

        const escapedEmail = escape(email)
        const escapedPassword = escape(password)

        if(!escapedEmail || !escapedPassword)
            return await res.status(400).send('🤕 Both values must be set')
        
        if(!utils.cbeckMail(escapedEmail))
            return await res.status(400).send('Please enter Valid email address')

        const user = await User.findOne({where: {email: escapedEmail}})

        if(!user)
            return await res.status(200).send('No user has been found')
   
        bcrypt.compare(escapedPassword, user.password, async (error, match) => {
            if(error) throw new Error(`🤕 Something went wrong during compare passwords`)

            if(match && escapedEmail === user.email) {
                req.session.userInfo = {name: user.name, email: user.email}

                return await res.render('users/dashboard', {
                    errors: req.session.error, 
                    userInfo: req.session.userInfo
                })
            } else {
                req.session.error = {type: 'error', message: 'Invalid Credencials'}

                return await res.render('users/login', {errors: req.session.error})
            }
        })
    }
}

export default AuthenticateController