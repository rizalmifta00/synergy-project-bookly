const JWT = require('jsonwebtoken')

exports.JWTVerify = async (TokenData) => {
    let TokenAuth = TokenData.authorization.split(' ')

    if ( TokenAuth[0] !== 'Bearer' ) {
        return false
    } else {
        let ResultToken = await JWT.verify(TokenAuth[1], process.env.SecretKey, function(err, resultToken) {
            if ( err ) return false
            if ( resultToken ) return resultToken
        })
    
        return ResultToken
    }
}