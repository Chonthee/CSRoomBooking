const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    server: process.env.MSSQL_SERVER,
    database: process.env.MSSQL_DB,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
};

const pool= new sql.ConnectionPool(config);

async function sqlQuery(query){
    try{
        await pool.connect();
        const result = await pool.request().query(query);
        return result;
    } catch (err){
        console.error("[pool-nectec-asrs] query "+ query);
        console.error("[pool-nectec-asrs] config", config);
        console.error("[pool-nectec-asrs] err "+ err);
    }
}

module.exports = {sqlQuery};
