const jwt = require('jsonwebtoken')

const auth = (req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1]
    if(token){
        jwt.verify(token, process.env.AuthKey, (err, decoded)=>{
            if(decoded){
                // console.log(decoded);
                req.body.userID = decoded.userID
                // req.body.likes = decoded.userID
                // req.body.comments = decoded.userID
                // console.log(req.body.userID);
                next()
            } else {
                res.send({'msg': 'You authorised'})
            }
        })
    } else {
        res.send({'msg': 'You are not authorised'})
    }
}

module.exports={
    auth
}