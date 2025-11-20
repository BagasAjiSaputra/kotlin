import mysql from 'mysql2/promise'

// NOTE: jangan export default, pakai named export
export const db = mysql.createPool({
  host: 'localhost',       
  user: 'root',           
  password: '',            
  database: 'kotlinapi',   
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})