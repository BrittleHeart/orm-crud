export const checkSession = (req, res, next) => {
    const {userInfo} = req.session
    
    if(!userInfo)
        return res.redirect('/authenticate/login')

    next()
}