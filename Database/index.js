const { Pool } = require("pg") // el método pool dentro de pg
 /*
const connect = new Pool({
 host:"localhost",
 user: "postgres",
 password: "Lydiadabbah1",
 database: "api-ecommerce",
 port: "5432"
})
 */

const connect = new Pool({
    host:"jelani.db.elephantsql.com",
    user: "lsxgwdvw",
    password: "ymQ10quOpHSNhFNzKolRrqXigcHm4Xdy",
    database: "lsxgwdvw",
    port: "5432"
   })

module.exports = connect