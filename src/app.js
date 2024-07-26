const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const path = require('path')
const app = express();

app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// init database
require('./db/init.postgres')

// require('./models/defination/define')

// init routes 
app.use('/', require('./routers/main'))


app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'))

// handling error
app.use((req, res, next) => {
    const error = new Error("Not found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    console.log("Final error (app.js): ", error)
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        stack: error.stack,
        message: error.message 
    })
})


module.exports = app