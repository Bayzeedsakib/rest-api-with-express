import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_vC8hlu6XEYDK@ep-jolly-water-azpvhbqz.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=false&channel_binding=require",
});

// console.log(pool);

const initDB = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR (255),
        email VARCHAR (255) UNIQUE NOT NULL,
        password VARCHAR (255) NOT NULL,
        age INT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )  
    `);

    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

initDB();
