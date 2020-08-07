export const checkSession = (req, res, next) => {
    const {userInfo} = req.session
    
    if(!userInfo)
        return res.redirect('/authenticate/login')

    next()
}

export const closeLoginForm = (req, res, next) => {
    const {userInfo} = req.session

    if(userInfo)
        return res.redirect('/')

    next()
}