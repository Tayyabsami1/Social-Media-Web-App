import Express from "express";
import sql from "mssql";
import cors from "cors";

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

export const db = await sql.connect(config);