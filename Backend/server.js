const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

Hi
const config = {
    user: "tks",
    password: "1234",
    server: "TAYYAB-PC1234",
    database: "SocialMediaDB",
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instancename: "SQLEXPRESS",
    },
    port: 1433
}

// ! Commented this because no longer using this DB
// app.get('/Card', async (req, res) => {
//     try {
//         const pool = await sql.connect(config);
//         const data = pool.request().query('select * from Card');
//         data.then(res1 => {
//             console.log(res1);
//             return res.json(res1);
//         })
//     }
//     catch (err) {
//         console.log(err);
//     }

// })

// ! This is also related to old db
// TODO Make a youtube video about it 
// app.get('/card/:cardNum', async (req, res) => {
//     try {
//         const pool = await sql.connect(config);
//         const data = pool.request().input('parameter', sql.VarChar, req.params.cardNum).query("select * from card where cardNum=@parameter");

//         data.then(res1 => {
//             return res.json(res1.recordset);
//         }
//         )

//     }
//     catch (err) {
//         console.log(err);
//     }
// })

// Sample Json data for the code below 
// {
//     "Username":"tayyab4",
//     "Password":"1234"
//   }
app.post('/Signup', async (req, res) => {

    try {

        if (!req.body.Username || !req.body.Password) {
            return res.status(400).json({ msg: 'Missing required fields: Username and Password' });
        }

        const pool = await sql.connect(config);

        const myreq =  pool.request();
        myreq.input("Username", sql.VarChar(50), req.body.Username);
        myreq.input("Password", sql.VarChar(50), req.body.Password);

        const data = await myreq.query("insert into Users (Username,Password) values (@Username,@Password);")

            return res.json({ msg: 'User added successfully' });
    }
    catch (err) {
        console.log(err);
    }

});


app.get('/', (req, res) => {
    return res.json("Hi i am backend");
})

app.listen(3000, () => {
    console.log("The server has started");
})