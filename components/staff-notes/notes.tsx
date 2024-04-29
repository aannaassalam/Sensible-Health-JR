import StyledPaper from "@/ui/Paper/Paper";
import styled from "@emotion/styled";
import { Button, Divider, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";

const StyledBox = styled(Box)`
  padding-top: 10px;
`;

export default function Notes() {
  const [edit, setEdit] = useState(false);

  return (
    <StyledPaper>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ paddingBottom: "15px" }}
      >
        <Typography variant="h5">Notes</Typography>
        {!edit && (
          <Button size="small" onClick={() => setEdit(true)}>
            Edit
          </Button>
        )}
      </Stack>
      <Divider />
      <StyledBox
        sx={{
          paddingBottom: edit ? "16px" : 0
        }}
      >
        <Typography variant="caption">Private Info</Typography>
        {edit && (
          <TextField
            multiline
            size="small"
            sx={{
              display: "block",
              marginTop: "5px",
              fontSize: "14px",
              "& textarea::placeholder": {
                fontSize: "14px"
              }
            }}
            fullWidth
            rows={5}
            placeholder="Enter Private Info"
          />
        )}
      </StyledBox>
      {edit && (
        <>
          <Divider />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            gap={1}
            sx={{ paddingTop: "16px" }}
          >
            <Button
              variant="outlined"
              size="small"
              onClick={() => setEdit(false)}
            >
              Cancel
            </Button>
            <Button variant="contained" size="small">
              Update
            </Button>
          </Stack>
        </>
      )}
    </StyledPaper>
  );
}
