import { ComponentType } from "react";
import { styled } from "@mui/joy";
import FormField, { FormFieldProp } from "./FormField";

const StyledFormField: ComponentType<FormFieldProp> = styled(FormField)(() => ({
  ".MuiFormHelperText-root": {
    color: "#970e0e !important",
  },
}));

export default StyledFormField;
