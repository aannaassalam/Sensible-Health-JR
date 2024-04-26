import { IStaff } from "@/interface/staff.interfaces";
import { Button, Divider, Paper, Typography } from "@mui/material";
import { Box, Stack, styled } from "@mui/system";
import React from "react";

const StyledDetailsBox = styled(Paper)`
  box-shadow: rgba(145, 158, 171, 0.2) 0px 5px 5px -3px,
    rgba(145, 158, 171, 0.14) 0px 8px 10px 1px,
    rgba(145, 158, 171, 0.12) 0px 3px 14px 2px;
  padding: 10px 20px;
  margin-top: 4px;
  margin-left: 3px;
  outline: 0;
  margin-top: 4px;
  margin-left: 6px;
  min-width: 4px;
  min-height: 4px;
  border-radius: 8px;
`;

export default function Details({ staff }: { staff: IStaff }) {
  return (
    <StyledDetailsBox>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ paddingBottom: "10px" }}
      >
        <Typography variant="h5">Demographic Detail</Typography>
        <Button size="small">Edit</Button>
      </Stack>
      <Divider />
    </StyledDetailsBox>
  );
}
