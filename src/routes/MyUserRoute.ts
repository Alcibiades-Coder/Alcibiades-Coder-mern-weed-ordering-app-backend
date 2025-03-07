import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middelware/auth";
import { validateMyUserRequest } from "../middelware/validation";

const myUserRoute = express.Router();

myUserRoute.get("/", jwtCheck, jwtParse, MyUserController.getCurrentUser);

// Crear usuario
myUserRoute.post("/", jwtCheck, MyUserController.createCurrentUser);

// Actualizar usuario
myUserRoute.put(
  "/",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  MyUserController.updateCurrentUser
);

export default myUserRoute;
