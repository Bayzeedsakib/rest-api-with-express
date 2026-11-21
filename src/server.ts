import express, { Application, Request, Response } from "express";
import { Pool } from "pg";
const app: Application = express();

const port = 5000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_vC8hlu6XEYDK@ep-jolly-water-azpvhbqz-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

console.log(pool);

app.get("/", (req: Request, res: Response) => {
  console.log(req);
  // res.send("This is root route");
  res.status(200).json({
    success: true,
    message: "This is root route",
    author: "PH",
  });
});

app.post("/", async (req: Request, res: Response) => {
  // console.log(req.body);

  const { name, age, password } = req.body;
  // console.log(password);

  res.status(200).json({
    success: true,
    message: "This is a test api",
    data: { name, age },
  });
});

app.listen(port, () => {
  console.log(`The express server is running on the port ${port}`);
});
