import bcrypt from 'bcrypt'
import User from '../../../models/User'
import UtilsController from './UtilsController'

const utils = new UtilsController()

class UserController {
    async index(req, res) {
        const users = await User.findAll()

        if (users)
            return await res.status(200).render('home', {users: users})
        else
            return await res.status(200).send('Could not find any users')        
    }

    async show(req, res) {
        const {id} = req.params

        if(!id || isNaN(id)) {
            res.status(400).send('Could not find any of records')
            throw new Error('Id param MUST be set as integer value')
        }

        const user = await User.findOne({
            where: {
                userId: id
            }
        })

        if(user)
            return await res.status(200).send({user})
        else
            return await res.status(304).send('Record has been not found! 😫')
    }

    create(req, res) {
        return res.render('users/create', {csrfToken: req.csrfToken()})
    }

    async register(req, res) {
        const {name, email, password_confirmation} = req.body

        if(!name || !email)
            return await res.status(400).send('All values name and email, must be set')

        let escapedName = escape(name)
        let escapedEmail = escape(email)
        let escapedPasswordConfirmation = escape(password_confirmation)

        if(!utils.cbeckMail(escapedEmail))
            return await res.status(400).send('Please enter VALID email address')
        
        bcrypt.genSalt(10, async (error, salt) => {
            if(error) throw new Error(`🤕 Something went wrong during generating salt, Try again`)

            const {password} = req.body

            let escapedPassword = escape(password)

            if(!escapedPassword || escapedPasswordConfirmation !== escapedPassword)
                return await res.status(400).send('Password value must be set and passwords must be the same!')

            bcrypt.hash(escapedPassword, salt, async (error, hash) => {
                if(error) throw new Error('🤕 Invalid Salt or placed data. Try again')

                await User.create(
                    {
                        name: escapedName,
                        email: escapedEmail,
                        password: hash,
                    }
                )

                await res.status(201).redirect('/')
            })
        })
    }

    async edit(req, res) {
        const {id} = req.params

        if(!id || isNaN(id))
            throw new Error('Id param must be set and has to be integer value')

        const user = await User.findOne({
            where: {userId: id}
        })

        return await res.render('users/edit', {csrfToken: req.csrfToken(), userInfo: user})
    }

    async update(req, res) {
        let {name, password} = req.body
        const {id} = req.params

        if(!id || isNaN(id))
            throw new Error('Id param must be set and has to be integer value')

        if(!name || !password)
            return await res.status(400).send('All values name and password, must be set')

        const user = await User.findOne({
            where: {
                userId: id
            }
        })

        if(name === user.name) {
            await User.update({name: name}, {where: {userId: id}})

            return res.redirect('/')
        }
        
        bcrypt.compare(password, user.password, async (error, match) => {
            if(error) throw new Error(`Something went wrong during comparing: ${error}`)

            if(match) {
                await User.update({password: password}, {where: {userId: id}})

                return res.redirect('/')
            }
        })

        bcrypt.genSalt(10, (error, salt) => {
            if(error) throw new Error(`🤕 Something went wrong during generating salt, Try again`)

            bcrypt.hash(password, salt, async (error, hash) => {
                if(error) throw new Error('🤕 Invalid Salt or placed data. Try again')

                password = hash

                await User.update({name: name, password: password},{where: {userId: id}})

                return res.redirect('/')
            })
        })
    }

    async destroy(req, res) {
        const {id} = req.params
        
        if(!id || isNaN(id))
            throw new Error('Id param must be set and has to be integer value')
            
        await User.destroy({where: {userId: id}})

        return await res.status(200).redirect('/')
    }
}

export default UserController