import { body } from "express-validator";

const userRegistrationValidatorSchema = () => {
  return [
    // for mail validation
    body("email")
      .trim()
      .normalizeEmail()
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .isLength({ max: 100 })
      .withMessage("Email must not exceed 100 characters."),

    // for password validation
    body("password")
      .notEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 8, max: 64 })
      .withMessage("Password must be 8–64 characters long.")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter.")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter.")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number.")
      .matches(/[@$!%*?&#]/)
      .withMessage("Password must contain at least one special character."),

    // for First Name validation
    body("firstname")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("First name is required.")
      .isLength({ min: 2, max: 50 })
      .withMessage("First name must be 2–50 characters long.")
      .matches(/^[A-Za-z\s'-]+$/)
      .withMessage("First name contains invalid characters."),

    // for Last Name validation
    body("lastname")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Last name is required.")
      .isLength({ min: 2, max: 50 })
      .withMessage("Last name must be 2–50 characters long.")
      .matches(/^[A-Za-z\s'-]+$/)
      .withMessage("Last name contains invalid characters."),

    // for Username validation
    body("username")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Username is required.")
      .isLength({ min: 3, max: 30 })
      .withMessage("Username must be 3–30 characters long.")
      .matches(/^[a-zA-Z0-9._]+$/)
      .withMessage(
        "Username can only contain letters, numbers, dots, or underscores.",
      ),

    // for Role validation
    body("role")
      .notEmpty()
      .withMessage("Role is required.")
      .isIn(["admin", "user", "manager", "moderator"])
      .withMessage("Invalid role selected."),

    // for Mobile validation
    body("mobile")
      .trim()
      .notEmpty()
      .withMessage("Mobile number is required.")
      .isMobilePhone("any")
      .withMessage("Please enter a valid mobile number.")
      .isLength({ min: 10, max: 15 })
      .withMessage("Mobile number must be between 10 and 15 digits."),
  ];
};

const userLoginValidatorSchema = () => {
  return [
    // for mail validation
    body("email")
      .trim()
      .normalizeEmail()
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .isLength({ max: 100 })
      .withMessage("Email must not exceed 100 characters."),

    // for password validation
    body("password")
      .notEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 8, max: 64 })
      .withMessage("Password must be 8–64 characters long.")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter.")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter.")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number.")
      .matches(/[@$!%*?&#]/)
      .withMessage("Password must contain at least one special character."),
  ];
};

const resetPasswordValidatorSchema = () => {
  return [
    // for password validation
    body("password")
      .notEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 8, max: 64 })
      .withMessage("Password must be 8–64 characters long.")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter.")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter.")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number.")
      .matches(/[@$!%*?&#]/)
      .withMessage("Password must contain at least one special character."),

    // for new password
    body("newPassword")
      .notEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 8, max: 64 })
      .withMessage("Password must be 8–64 characters long.")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter.")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter.")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number.")
      .matches(/[@$!%*?&#]/)
      .withMessage("Password must contain at least one special character."),
  ];
};

export {
  userRegistrationValidatorSchema,
  userLoginValidatorSchema,
  resetPasswordValidatorSchema,
};
