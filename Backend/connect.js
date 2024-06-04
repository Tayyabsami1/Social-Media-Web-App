import Express from "express";
import sql from "mssql";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();
let tss=false;
if (process.env.REACT_APP_ServerCertificate === "true") {
    tss=true;
}
else{
    tss=false;
}
const config = {
    user: process.env.REACT_APP_Username,
    password: process.env.REACT_APP_Password,
    server: process.env.REACT_APP_Server,
    database: process.env.REACT_APP_DBName,
    options: {
        trustServerCertificate: tss, // false for remote
        trustedConnection: true,
        enableArithAbort: true,
        instancename: "MSSQLSERVER",
        port: parseInt(process.env.REACT_APP_Port),
    }
}

export const db = await sql.connect(config);