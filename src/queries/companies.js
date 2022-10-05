function postNewCompany(name, location) {
    const insert = `
        INSERT INTO 
        companies (name, location) 
            VALUES
                ( '${name}', '${location}');
    `
    return insert;
}

function patchExistingComp(name, location, id) {
    const update = `UPDATE companies 
            SET name = '${name}', location = '${location}'
            WHERE id = ${id};
    `
    return update;
}

function getOne(id) {
    const foundComp = `SELECT * 
                        FROM 
                            companies
                        WHERE id = ${id};
    `
    return foundComp;
}

function deleteOne(id) {
    const foundComp = `DELETE FROM
                            companies
                        WHERE id = ${id};
    `
    return foundComp;
}
module.exports = {
    getAllCompanies: `
        SELECT * 
        FROM 
            companies;
    `,
    postNewCompany,
    patchExistingComp,
    getOne,
    deleteOne
}
