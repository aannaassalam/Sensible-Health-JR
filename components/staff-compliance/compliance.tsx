import StyledPaper from "@/ui/Paper/Paper";
import Scrollbar from "@/ui/scrollbar";
import styled from "@emotion/styled";
import {
  Button,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useRef } from "react";

const StyledBox = styled(Box)`
  /* padding-top: 16px; */
  td,
  th {
    text-align: center;
  }
`;

function ComplianceTableRow() {
  return (
    <TableRow>
      <TableCell>COVID-19 Compliance</TableCell>
      <TableCell>-</TableCell>
      <TableCell>-</TableCell>
      <TableCell>
        <Chip label="Not Specified" color="warning" variant="outlined" />
      </TableCell>
    </TableRow>
  );
}

export default function Compliance() {
  const ref = useRef(null);

  return (
    <StyledPaper>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ paddingBottom: "15px" }}
      >
        <Typography variant="h5">Compliance</Typography>
        <Button size="small">Manage All</Button>
      </Stack>
      <Divider />
      <StyledBox>
        <Scrollbar ref={ref}>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Expires At</TableCell>
                  <TableCell>Last Update</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <ComplianceTableRow />
                <ComplianceTableRow />
                <ComplianceTableRow />
                <ComplianceTableRow />
                <ComplianceTableRow />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </StyledBox>
    </StyledPaper>
  );
}
