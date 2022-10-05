const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const router = require('./src/routes/company_route')


dotenv.config()
const app = express();

const port = process.env.PORT;
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(router)


//serve form
app.get('/', (req, res) => {
    const absolutePath = __dirname + "/views/index.html"
    res.sendFile(absolutePath)
})

app.listen(port, () => {
    console.log(`Application running on port: ${port}`)
})