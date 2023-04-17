import mysql from "mysql";

export const db = mysql.createConnection({
  host: "database-1.c0spjvq1135f.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "5bv$ajYd255VDf,",
  port: "3306",
  database: "mogDB",
  multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    crossOriginIsolated.log(err.message);
    return;
  }
  console.log("Connected to backend from mysql!");
});
