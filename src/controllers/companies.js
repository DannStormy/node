const db = require('../config/config.js')
const query = require('../queries/companies.js')

const fetchAllComp = async (req, res) => {
    try {
        const companies = await db.any(query.getAllCompanies)
        return res.status(200).json({
            status: 'Success',
            message: 'Successfully fetched companies',
            data: companies
        })
    } catch (err) {
        if (err) {
            console.log(err)
            return err;
        }
    }
}

const postComp = async (req, res) => {
    try {
        const name = req.body.name;
        const location = req.body.location;
        console.log(`${name} ,${location}`)
        await db.none(query.postNewCompany(name, location))
        return res.status(200).json({
            status: 'Success',
            message: 'Company Added',
        })
    } catch (err) {
        if (err) {
            console.log(err)
            return err;
        }
    }
}

const patchComp = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location } = req.body;
        await db.none(query.patchExistingComp(name, location, id))
        return res.status(200).json({
            status: 'Success',
            message: 'Company Updated',
        })
    } catch (err) {
        if (err) {
            console.log(err)
            return err;
        }
    }
}

const getOneComp = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await db.one(query.getOne(id))
        return res.status(200).json({
            status: 'Success',
            message: `Company with id:${id} Found`,
            data: data
        })

    } catch (err) {
        if (err) {
            console.log(err)
            return err;
        }
    }
}

const deleteOneComp = async (req, res) => {
    try {
        const { id } = req.params;
        await db.none(query.deleteOne(id))
        return res.status(200).json({
            status: 'Success',
            message: `Company with id:${id} deleted`,
        })
    } catch (err) {
        if (err) {
            console.log(err)
            return err;
        }
    }
}



module.exports = {
    fetchAllComp,
    postComp,
    patchComp,
    getOneComp,
    deleteOneComp
}