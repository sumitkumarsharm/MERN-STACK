import { body } from "express-validator";

const userRegistrationValidator = () => {
  return [
    body("email")
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

    body("username")
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters"),

    body("role")
      .notEmpty()
      .withMessage("Role is required")
      .isIn(["admin", "user"])
      .withMessage("Role must be admin or user"),
  ];
};


const userLoginValidator = () =>{
    return [
        body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email"),
    
        body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
    ]
}
export { userRegistrationValidator, userLoginValidator };
