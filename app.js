const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

app.use(express.json({extended:true}))
app.use('/api/auth',  require('./routes/auth.routes'))
app.use('/api/get',  require('./routes/get.routes'))
app.use('/api/change',  require('./routes/change.routes'))
app.use('/api/driver',  require('./routes/driver.routes'))

if(process.env.NODE_ENV === "production"){
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}

const PORT = config.get("port") || 5000

async function start(){
  try {
    await mongoose.connect(config.get("mongoURI"),{
      useNewUrlParser: true,
      useUnifiedTopology:true,
      useCreateIndex:true
    })
  } catch (e) {
    process.exit(1)
  }
}

start()
app.listen(PORT, ()=>{
})