import { RegisterOptions } from "react-hook-form";
import { baseFieldValidation } from "@/Utils/validator/validator";
import { VALID_EMAIL_REGEX } from "@/Helper/regex";

export const EmailRule: RegisterOptions = {
  ...baseFieldValidation("Email", true, 1, 128, VALID_EMAIL_REGEX),
};

export const PasswordRule: RegisterOptions = {
  ...baseFieldValidation("PassWord", true, 1, 64),
};
