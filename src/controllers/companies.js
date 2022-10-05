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

module.exports = fetchAllComp