import {createPool} from "mysql2/promise";
export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    database: 'megak_ads',
    namedPlaceholders: true,
    decimalNumbers:true,
})
