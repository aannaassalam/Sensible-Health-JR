import { InputLabel, TextField, TextFieldProps } from "@mui/material";
import { Box } from "@mui/system";

const CustomInput = (props: TextFieldProps) => {
  return (
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
      <TextField {...props} label="" fullWidth />
    </Box>
  );
};

export default CustomInput;
