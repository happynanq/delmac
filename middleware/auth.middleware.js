const jwt = require("jsonwebtoken")
const config = require('config')

module.exports = async(req,res, next)=>{
  if(req.method==="OPTIONS"){
    return next()
  }
  try {
    const token = req.headers.authorization.split(" ")[1] // "Bearer TOKEN"

    if(!token){
      return res.status(401).json({message:"Нет авторизации"})
    }
    let er = false
    const decoded = await  jwt.verify(token, config.get("jwtSecret"), (err, d)=>{
      if(err){
        console.log("ОШИБКА БЛЯТЬ", err.message)
        if(err.message==='jwt expired'){
          er=true
        }
        
      }
      // console.log("D:",d)
      return d
    })
    if(er){
      return res.status(401).json({message:"JWT истёк", comand:"out"})
    }
    // console.log(decoded)

    req.user = decoded
    next()
  } catch (e) {
    // console.log("authMiddleware", e)
    res.status(401).json({message:"Нет авторизации"})
  }
}