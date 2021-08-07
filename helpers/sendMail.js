const nodemailer = require('nodemailer')
const config = require("config")
module.exports = async (email,login , link, password, id) => {
  console.log("email", email)

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 587,
    secure: false,
    auth: {
      user: config.get("email"),
      pass: config.get("emailPass")
    },
  })
  let info = await transporter.sendMail({
    from: `"Подтверждение пароля " <${config.get("email")}>`, // sender address
    to: `${email}`, // list of receivers
    subject: `Hello ${email || login}` , // Subject line
    
    html: `<span>Перейдите по <a href="http://${link}/login/changePassword/?id=${id}&newPassword=${password} ">ссылке</a>  для изменения пароля </span>`, // html body
  })
  
}
