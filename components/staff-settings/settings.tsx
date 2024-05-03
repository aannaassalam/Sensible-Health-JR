import StyledPaper from "@/ui/Paper/Paper";
import styled from "@emotion/styled";
import {
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import Iconify from "../Iconify/Iconify";
import { getRoles } from "@/api/functions/cms.api";
import { useQuery } from "@tanstack/react-query";
import { ISettings } from "@/interface/staff.interfaces";

const StyledBox = styled(Box)`
  padding-top: 15px;
  p {
    color: #95959a;
  }
`;

export default function Settings({ settings }: { settings: ISettings }) {
  const [edit, setEdit] = useState(false);

  const { data: roles, isLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles
  });

  return (
    <StyledPaper>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ paddingBottom: "15px" }}
      >
        <Typography variant="h5">Settings</Typography>
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
        <Grid container spacing={2}>
          <Grid item lg={5} md={6} sm={12} xs={12}>
            <Typography variant="body1">Role</Typography>
          </Grid>
          <Grid item lg={7} md={6} sm={12} xs={12}>
            {edit ? (
              <Select fullWidth size="small">
                {roles.map((role: { id: number; name: string }) => (
                  <MenuItem
                    value={role.id}
                    key={role.id}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {role.name
                      .replace("ROLE_", "")
                      .replaceAll("_", " ")
                      .toLowerCase()}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <Chip
                variant="outlined"
                label={settings.roleId
                  .replace("ROLE_", "")
                  .replaceAll("_", " ")
                  .toLowerCase()}
                color="primary"
                size="small"
              />
            )}
          </Grid>
          {/* <Grid item lg={5} md={6} sm={12} xs={12}>
            <Typography variant="body1">Teams:</Typography>
          </Grid>
          <Grid item lg={7} md={6} sm={12} xs={12}>
            {edit ? (
              <Select fullWidth size="small">
                <MenuItem value="Team 1">Team 1</MenuItem>
                <MenuItem value="Team 1">Team 1</MenuItem>
                <MenuItem value="Team 1">Team 1</MenuItem>
                <MenuItem value="Team 1">Team 1</MenuItem>
                <MenuItem value="Team 1">Team 1</MenuItem>
              </Select>
            ) : (
              <Chip
                variant="outlined"
                label="Team 1"
                color="primary"
                size="small"
              />
            )}
          </Grid> */}
          <Grid item lg={5} md={6} sm={12} xs={12}>
            <Typography variant="body1">Notify Timesheet Approval</Typography>
          </Grid>
          <Grid item lg={7} md={6} sm={12} xs={12}>
            {edit ? (
              <FormControlLabel control={<Checkbox />} label="" />
            ) : (
              <Iconify
                icon={`eva:${
                  settings.isNotifyTimesheetApproval ? "checkmark" : "close"
                }-fill`}
              ></Iconify>
            )}
          </Grid>
          <Grid item lg={5} md={6} sm={12} xs={12}>
            <Typography variant="body1">Available For Rostering</Typography>
          </Grid>
          <Grid item lg={7} md={6} sm={12} xs={12}>
            {edit ? (
              <FormControlLabel control={<Checkbox />} label="" />
            ) : (
              <Iconify
                icon={`eva:${
                  settings.isAvailableForRostering ? "checkmark" : "close"
                }-fill`}
              ></Iconify>
            )}
          </Grid>
          <Grid item lg={5} md={6} sm={12} xs={12}>
            <Typography variant="body1">
              Read and write private notes
            </Typography>
          </Grid>
          <Grid item lg={7} md={6} sm={12} xs={12}>
            {edit ? (
              <>
                <FormControlLabel control={<Checkbox />} label="Client Notes" />
                <FormControlLabel control={<Checkbox />} label="Staff Notes" />
              </>
            ) : (
              <>
                <Typography
                  variant="subtitle2"
                  display="flex"
                  alignItems="center"
                >
                  Client Notes
                  <Iconify
                    icon={`eva:${
                      settings.isReadAndWriteClientPrivateNotes
                        ? "checkmark"
                        : "close"
                    }-fill`}
                  ></Iconify>
                </Typography>
                <Typography
                  variant="subtitle2"
                  display="flex"
                  alignItems="center"
                >
                  Staff Notes
                  <Iconify
                    icon={`eva:${
                      settings.isReadAndWriteStaffPrivateNotes
                        ? "checkmark"
                        : "close"
                    }-fill`}
                  ></Iconify>
                </Typography>
              </>
            )}
          </Grid>
          <Grid item lg={5} md={6} sm={12} xs={12}>
            <Typography variant="body1">No Access</Typography>
          </Grid>
          <Grid item lg={7} md={6} sm={12} xs={12}>
            {edit ? (
              <FormControlLabel control={<Checkbox />} label="" />
            ) : (
              <Iconify
                icon={`eva:${settings.isAccess ? "checkmark" : "close"}-fill`}
              ></Iconify>
            )}
          </Grid>
          <Grid item lg={5} md={6} sm={12} xs={12}>
            <Typography variant="body1">Account Owner</Typography>
          </Grid>
          <Grid item lg={7} md={6} sm={12} xs={12}>
            {edit ? (
              <FormControlLabel control={<Checkbox />} label="" />
            ) : (
              <Iconify
                icon={`eva:${
                  settings.isAccountOwner ? "checkmark" : "close"
                }-fill`}
              ></Iconify>
            )}
          </Grid>
        </Grid>
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
