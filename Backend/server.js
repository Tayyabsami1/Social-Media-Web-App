const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


const config = {
    user: "tks",
    password: "1234",
    server: "TAYYAB-PC1234",
    database: "ATM",
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instancename: "SQLEXPRESS",
    },
    port: 1433
}

app.get('/Card', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const data = pool.request().query('select * from Card');
        data.then(res1 => {
            return res.json(res1);
        })
    }
    catch (err) {
        console.log(err);
    }

})

app.get('/', (req, res) => {
    return res.json("Hi i am backend");
})

app.listen(3000, () => {
    console.log("The server has started");
})