
export const checkIfAuthorized = async (req, res, next) => {
    const Authorization = new Promise((resolve, reject) => resolve())

    const authorization = await Authorization.findOne({where: {authorizedAt: Authorization.fn('between now and now - 7')}})
}