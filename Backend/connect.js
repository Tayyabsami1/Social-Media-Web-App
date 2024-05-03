import Express from "express";
import sql from "mssql";
import cors from "cors";

const config = {
    user: "ahad",
    password: "1234",
    server: "DESKTOP-Q3M4KLE",
    database: "SocialMediaDB1",
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instancename: "MSSQLSERVER",
    },
    port: 1433
}

export const db = await sql.connect(config);