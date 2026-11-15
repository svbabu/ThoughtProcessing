import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "thoughtprocessing",
  password: "svbabu",
  port: 5432, // default Postgres port
});