import { Request, Response } from "express";
import { pool } from "../../db/index";
import { userService } from "./user.service";
import { IUser } from "./user.interface";

//POST
const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserIntoDb(req.body);

    res.status(201).json({
      success: true,
      message: "User Created",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};

//GETALL
const getAllUser = async (req: Request, res: Response) => {
  console.log("From controller:", req.user);
  try {
    const result = await userService.getAllUserFromDb();

    res.status(200).json({
      success: true,
      message: "Get All Users",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};

////GetById -> req.url => /product/123

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.getUserByIdFromDb(id as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: true,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};

//UPDATE User Info
const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await userService.updateUserFromDb(id as string, req.body);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: true,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};

//Delete User
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await userService.deleteUserFromDb(id as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
