import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../Config/Index";
import { pool } from "../db";
import { Role } from "../types";

const auth = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log({ req });
      // console.log("Hello");
      //check if token exists
      //Verify token
      //check if the user exists
      //Is the user status active

      console.log(roles);

      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const decode = jwt.verify(
        token as string,
        config.jwt_secret,
      ) as JwtPayload;
      // console.log(decode);

      const user = await pool.query(
        `
    
    SELECT * FROM users WHERE email = $1
    
    `,
        [decode.email],
      );

      if (user.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (!user.rows[0].is_active) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      //roles = ["admin" , "agent" , "user"]
      //user.roles = "admin" or user.roles = "agent"
      if (roles.length && !roles.includes(user.rows[0].role)) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      req.user = decode;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
