import { useCallback, FC, forwardRef } from "react";
import {
  FormLabel,
  InputProps,
  Input,
  FormHelperText,
  FormControl,
} from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

export interface FormFieldProp extends InputProps {
  label?: string | JSX.Element;
  required?: boolean;
  error?: any;
  warning?: string;
  touched?: boolean;
  submitCount?: number;
  textAdorment?: string;
  className?: string;
}

const FormField: FC<FormFieldProp> = forwardRef((props, ref) => {
  const {
    children,
    label,
    placeholder,
    required,
    error,
    warning,
    touched,
    submitCount,
    textAdorment,
    className,
    ...rest
  } = props;
  const intent = useCallback((): SxProps => {
    let initial: SxProps = { color: "initial" };
    if (!!error) {
      return { color: "red" };
    }
    return initial;
  }, [error]);

  return (
    <FormControl className={className}>
      <FormLabel>{label}</FormLabel>
      <Input {...rest} ref={ref} />
      <FormHelperText sx={intent()}>{textAdorment}</FormHelperText>
    </FormControl>
  );
});

FormField.displayName = "FormField";

export default FormField;
