const express = require('express')
const path = require('path')
const app = express();
const favicon = require('serve-favicon')
const exp = require('constants');
const PORT = process.env.PORT || 8080

app.use(favicon(path.join(__dirname, 'public','img', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))

// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


 // Render Web Page
app.get('/', (req, res) => {
    res.render('index', {
        greeting: 'Hello'
    })
})

// Port to listen on
app.listen(PORT, ()=> console.log(`Listening on http://localhost:${PORT}`))
