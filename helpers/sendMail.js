const nodemailer = require('nodemailer')
const config = require("config")
module.exports = async (email,login , link, password, id) => {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 587,
    secure: false,
    auth: {
      user: 'happynanqtwink@gmail.com',
      pass: 'pznjkiyinwuspcxc',
    },
  })
  let info = await transporter.sendMail({
    from: '"Подтверждение пароля " <happynanqtwink@gmail.com>', // sender address
    to: `${email}, happynanq@gmail.com`, // list of receivers
    subject: `Hello ${email || login}` , // Subject line
    text: 'Hello world?', // plain text body
    html: `<span>Перейдите по <a href="http://${link}/login/changePassword/?id=${id}&newPassword=${password} ">ссылке</a>  для изменения пароля </span>`, // html body
  })
  
}
