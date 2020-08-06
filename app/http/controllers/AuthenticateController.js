import bcrypt from 'bcrypt'
import User from '../../../models/User'
import {transporter} from '../../../server'
import UtilsController from './UtilsController'

const utils = new UtilsController()

class AuthenticateController {
    login(req, res) {
        return res.render('users/login', {csrfToken: req.csrfToken(), errors: req.session.error})
    }

    async twoFactorAuthentication(req, res, code) {
        const {email, name} = req.body
        // let code = Math.floor(Math.random() * 5000)

        let infoMessage = await transporter.sendMail({
            from: '"Bartosz Pazdur 👻" <skrillexpl@op.pl>', // sender address
            to: email, // list of receivers
            subject: `Confirm login process ${name}`, // Subject line
            html: `
                <div style="text-align: center; margin: 0 auto;">
                    <h1>Ktoś zalogował się na Twoje konto</h1>
                    <p>Jzeli to Ty, przepisz ponizszy kod, jeśli to nie Ty, NATYCHMIAST skontakuj się z administratorem</p>

                    <div style="padding: 7px 8px; color: #ffffff; font-size: 20px;">
                        ${code}
                    </div>
                </div>
            `, // plain text body
          })
        
        console.log(`Message sent ${infoMessage.messageId}`)
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

                await this.twoFactorAuthentication(req, res)

                return await res.redirect('/authenticate/dashboard')
            } else {
                req.session.error = {type: 'error', message: 'Invalid Credencials'}

                return await res.render('users/login', {errors: req.session.error})
            }
        })
    }

    async logout(req, res) {
        req.session.userInfo = false
        res.session.error = false

        res.redirect('/authenticate/login')
    }

    dashboard(req, res) {
        const {name, email} = req.session.userInfo
        return res.json({name, email})
    }
}

export default AuthenticateController