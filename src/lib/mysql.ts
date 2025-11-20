import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,       // mysql-kotlin-api-api-database-v2.f.aivencloud.com
  port: Number(process.env.DB_PORT), // 13305
  user: process.env.DB_USER,       // avnadmin
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,   // defaultdb
  ssl: {
    ca: fs.readFileSync(path.join(process.cwd(), 'ca.pem')), // CA certificate dari Aiven
  },
});

export default connection;
