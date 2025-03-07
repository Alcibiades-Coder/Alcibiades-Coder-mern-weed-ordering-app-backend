import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      res.status(200).json({ message: "User already exists" }); // ✅ Sin return
      return;
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.error("Error en createCurrentUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("Valor de req.userId:", req.userId);

  try {
    if (!req.userId) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const { name, addressLine1, country, city } = req.body;
    const user = await User.findOne({ auth0Id: req.userId }); // Cambiamos a findOne y buscamos por auth0Id.

    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();
    res.send(user);
  } catch (error) {
    console.error("Error en updateCurrentUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const currentUser = await User.findOne({ auth0Id: req.userId });

    if (!currentUser) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.status(200).json(currentUser);
  } catch (error) {
    console.error("Error en getCurrentUser:", error);
    res.status(500).json({ message: "Algo salió mal" });
  }
};

const MyUserController = {
  createCurrentUser,
  updateCurrentUser,
  getCurrentUser,
};
export default MyUserController;
