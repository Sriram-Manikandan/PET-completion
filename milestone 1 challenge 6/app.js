require('dotenv').config()
const express = require('express')
const app = express()

const confessionRoutes = require('./routes/confessionRoutes')

app.use(express.json())

app.use('/api/v1', confessionRoutes)

app.listen(process.env.PORT, () => {
  console.log(`running on ${process.env.PORT}`)
})