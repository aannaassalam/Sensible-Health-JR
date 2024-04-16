import { InputLabel, TextField, TextFieldProps } from "@mui/material";
import { Box } from "@mui/system";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps
} from "react-hook-form";

type CustomInputProps<T extends TextFieldProps> = {
  control?: Control<T>;
  name: FieldPath<T>;
} & UseControllerProps;

function CustomInput<T extends TextFieldProps>(props: CustomInputProps<T>) {
  return (
    <Controller
      name={props.name}
      control={props?.control || null}
      render={({
        field: { value, onChange },
        fieldState: { invalid, error }
      }) => (
        <Box>
          {Boolean(props.label) && (
            <InputLabel
              sx={{
                fontSize: "14px",
                marginBottom: "5px"
              }}
            >
              {props.label}
            </InputLabel>
          )}
          <TextField
            {...props}
            label=""
            fullWidth
            value={value}
            onChange={onChange}
            error={invalid}
            helperText={error?.message}
          />
        </Box>
      )}
    />
  );
}

export default CustomInput;
