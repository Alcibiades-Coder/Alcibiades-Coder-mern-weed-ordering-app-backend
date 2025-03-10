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

export const validateMyRestaurantRequest: RequestHandler[] = [
  body("restaurantName")
    .isString()
    .notEmpty()
    .withMessage("Nombre debe ser Válido!"),
  body("city").isString().notEmpty().withMessage("La Ciudad debe ser Válida!"),
  body("country").isString().notEmpty().withMessage("El País debe ser Válido!"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .notEmpty()
    .withMessage("El Precio debe ser Válido y Positivo!"),
  body("estmatedDeliveryTime")
    .isInt({ min: 0 })
    .notEmpty()
    .withMessage("El Tiempo Estimado debe ser Válido y Positivo!"),
  body("cuisines")
    .isArray()
    .withMessage("Las Cosinas deben ser un Arreglo Válido!")
    .not()
    .isEmpty()
    .withMessage("Las Cosinas no pueden estar Vacias!"),
  body("menuItems")
    .isArray()
    .withMessage("Los Menus deben ser un Arreglo Válido!"),
  body("menuItems.*.name")
    .notEmpty()
    .withMessage("El Nombre del Menu no puede estar Vacio!"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("El Precio del Menu no puede estar Vacio y ser Positivo!"),

  handleValidationErrors,
];
