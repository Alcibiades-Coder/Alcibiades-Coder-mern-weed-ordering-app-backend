import { Request, Response, NextFunction, RequestHandler } from "express";
import { body, validationResult } from "express-validator";

// Middleware para manejar los errores de validación
const handleValidationErrors: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() }); // Corrección de la llamada a `array()`
  }
  next();
};

// Middleware de validación para el cuerpo de la solicitud
export const validateMyUserRequest: RequestHandler[] = [
  body("name").isString().notEmpty().withMessage("Nombre debe ser Válido"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("Dirección debe ser Válida"),
  body("city").isString().notEmpty().withMessage("La Ciudad debe ser Válida"),
  body("country").isString().notEmpty().withMessage("El País debe ser Válido"),
  handleValidationErrors, // Llamamos al middleware de validación de errores
];
