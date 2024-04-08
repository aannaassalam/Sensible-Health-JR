import { InputLabel, TextField, TextFieldProps } from "@mui/material";
import { Box } from "@mui/system";

const CustomInput = (props: TextFieldProps) => {
  return (
    <Box>
      <InputLabel
        sx={{
          fontSize: "14px",
          marginBottom: "5px"
        }}
      >
        {props.label}
      </InputLabel>
      <TextField {...props} label="" fullWidth size="small" />
    </Box>
  );
};

export default CustomInput;
