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

//get all companies
// app.get('/companies', (req, res) => {
//     fs.readFile('./src/companies.json', (err, data) => {
//         if (err) {
//             console.log(err)
//         }
//         res.send(JSON.parse(data))
//         res.end()
//     })
// });

//post company
app.post('/', (req, res) => {
    const id = Date.now();
    const company = { ...req.body, id: id }
    fs.readFile('./src/companies.json', function (err, data) {
        const newData = JSON.parse(data)
        console.log(newData)
        newData.push(company)
        fs.writeFile('./src/companies.json', JSON.stringify(newData), function (err, result) {
            if (err) console.log('error', err);
        });
    });
    res.send("Company Added")
    res.end();
});

//get company by id
app.get('/:id', (req, res) => {
    const { id } = req.params;
    fs.readFile('./src/companies.json', (err, data) => {
        const companies = JSON.parse(data)
        const company = companies.find((company) => id == company.id)
        if (company) {
            res.send(company)
        } else {
            res.send(`Company with id: ${id} not found`)
        }
    })
})

//delete company by id
app.delete('/:id', (req, res) => {
    const { id } = req.params;
    fs.readFile('./src/companies.json', (err, data) => {
        const companies = JSON.parse(data)
        const company = companies.filter((company) => id != company.id)
        fs.writeFile('./src/companies.json', JSON.stringify(company), function (err, result) {
            if (err) console.log('error', err);
        });
        if (company) {
            res.send("Company removed")
        } else {
            res.send(`Company with id: ${id} not found`)
        }
    })
})

//update company by id
app.patch('/:id', (req, res) => {
    const { id } = req.params;
    // console.log(id)
    const { name, location } = req.body;
    fs.readFile('./src/companies.json', (err, data) => {
        const companies = JSON.parse(data)
        const selectedComp = companies.find((company) => id == company.id)
        console.log(selectedComp)
        if (!selectedComp) {
            res.send(`Company with id ${id} not found`)
        }
        if (name) selectedComp.name = name;
        if (location) selectedComp.location = location

        fs.writeFile('./src/companies.json', JSON.stringify(companies), function (err, result) {
            if (err) console.log('error', err);
        });
        res.send(`Company with ${id} has been updated successfully`)
    })
})

//middleware example
// app.get('/now', (req, res, next) => {
//     req.time = new Date().toString();
//     next()
// }, (req, res) => {
//     res.send({ "time": req.time })
// })

app.listen(port, () => {
    console.log(`Application running on port: ${port}`)
})