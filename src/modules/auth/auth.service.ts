import bcrypt from "bcryptjs";
import { pool } from "../../db";
import { ILogin } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../Config/Index";

const userLoginFromDb = async (payload: ILogin) => {
  //check if the user exist?
  //check if the password match
  //check the user status
  //If all pass then generate jwt token

  const { email, password } = payload;

  const user = await pool.query(
    `
        
        SELECT * FROM users WHERE email = $1
        
        `,
    [email],
  );

  //   console.log(result.rows[0]);
  if (user.rowCount === 0) {
    throw new Error("Invalid credential");
  }

  const matchPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!matchPassword) {
    throw new Error("Invalid credential");
  }

  if (!user.rows[0].is_active) {
    throw new Error("User don't have access");
  }

  const jwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    role: user.rows[0].role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret, {
    expiresIn: "1d",
  });

  delete user.rows[0].password;

  return { accessToken, user: user.rows[0] };
};

export const authService = {
  userLoginFromDb,
};
