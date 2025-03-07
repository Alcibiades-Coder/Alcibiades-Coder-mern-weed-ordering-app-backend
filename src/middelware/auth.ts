import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import User from "../models/user";

import mongoose from "mongoose";

type UserType = typeof User;

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
      user?: UserType; // user ahora es opcional.
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

export const jwtParse = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    console.error("❌ No se recibió el token");
    res.status(401).json({ message: "Token no proporcionado" });
    return; // Asegura que la función termine aquí.
  }

  const token = authHeader.split(" ")[1];
  console.log("Token recibido:", token);

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    if (!decoded) {
      res.status(401).json({ message: "Token invalido" });
      return;
    }

    req.userId = decoded.sub as string;
    req.auth0Id = decoded.sub as string;
    console.log("✔️ User ID extraído:", req.userId);
    console.log("✔️ Auth0 ID extraído:", req.auth0Id);

    next();
  } catch (error) {
    console.error("❌ Error al decodificar el token:", error);
    res.status(401).json({ message: "Token inválido", error });
    return; // Asegura que la función termine aquí.
  }
};
