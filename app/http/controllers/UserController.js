import bcrypt from 'bcrypt'
import User from '../../../models/User'

class UserController {
    async index(req, res) {
        const users = await User.findAll()

        if (users)
            return await res.status(200).send({users})
        else
            return await res.status(200).send('Could not find any users')        
    }
}

export default UserController