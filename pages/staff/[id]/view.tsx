import { getStaff } from "@/api/functions/staff.api";
import Iconify from "@/components/Iconify/Iconify";
import Details from "@/components/staff-details/details";
import assets from "@/json/assets";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import Loader from "@/ui/Loader/Loder";
import styled from "@emotion/styled";
import {
  Avatar,
  Button,
  Grid,
  MenuItem,
  Popover,
  Typography
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const StyledViewPage = styled(Grid)`
  padding: 20px 10px;
  h4 {
    margin-bottom: 40px;
  }
  .back-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 14px;
  }
`;

export default function Index() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["staff", id],
    queryFn: () => getStaff(id as string)
  });

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl((prev) => (prev ? null : event.currentTarget));
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  if (isLoading) return <Loader />;

  return (
    <DashboardLayout>
      <Box sx={{ padding: "0px 10px 20px 10px" }}>
        <Link href="/staff/list" className="back-link">
          <Iconify
            icon="eva:arrow-back-fill"
            sx={{
              width: 17,
              height: 17,
              marginRight: "5px"
            }}
          />{" "}
          Back to Staff List
        </Link>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginTop: "10px" }}
        >
          <Stack direction="row" alignItems="center" gap={2}>
            <Avatar
              src={data.photoDownloadURL || assets.nurse_placeholder}
            ></Avatar>
            <Typography variant="h4">
              {data.name}
              <Typography variant="body1" display="inline-block" ml={1}>
                Details
              </Typography>
            </Typography>
          </Stack>
          <Button
            variant="contained"
            onClick={handlePopoverOpen}
            // onMouseLeave={handlePopoverClose}
          >
            Manage{" "}
            <Iconify
              icon="eva:arrow-ios-downward-outline"
              sx={{ ml: "5px" }}
            ></Iconify>
          </Button>
          <Popover
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
            sx={{
              ".MuiPaper-root": {
                boxShadow:
                  " rgba(145, 158, 171, 0.2) 0px 5px 5px -3px, rgba(145, 158, 171, 0.14) 0px 8px 10px 1px, rgba(145, 158, 171, 0.12) 0px 3px 14px 2px",
                p: 0,
                mt: 1,
                ml: 0.75,
                width: 200,
                outline: 0,
                padding: 0,
                paddingBlock: 1,
                marginTop: 1,
                marginLeft: "6px",
                minWidth: 4,
                minHeight: 4,
                maxWidth: "calc(100% - 32px)",
                maxHeight: "calc(100% - 32px)",
                borderRadius: "8px"
              }
            }}
          >
            <MenuItem
              // key={option.label}
              onClick={handlePopoverClose}
            >
              Add Shift
            </MenuItem>
            <MenuItem
              // key={option.label}
              onClick={handlePopoverClose}
            >
              Communications
            </MenuItem>
            <MenuItem
              // key={option.label}
              onClick={handlePopoverClose}
            >
              Timesheet
            </MenuItem>
            <MenuItem
              // key={option.label}
              onClick={handlePopoverClose}
            >
              Calendar
            </MenuItem>
            <MenuItem
              // key={option.label}
              onClick={handlePopoverClose}
            >
              Documents
            </MenuItem>
            <MenuItem
              // key={option.label}
              onClick={handlePopoverClose}
            >
              Reset Password
            </MenuItem>
          </Popover>
        </Stack>
      </Box>
      <StyledViewPage container spacing={4}>
        <Grid item md={8} sm={12} xs={12}>
          <Details staff={data} />
        </Grid>
        <Grid item md={4} sm={12} xs={12}></Grid>
      </StyledViewPage>
    </DashboardLayout>
  );
}
