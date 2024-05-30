import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import React, { useCallback, useMemo } from "react";
import Shift from "./shift";
import styled from "@emotion/styled";
import moment, { Moment } from "moment";
import { Shift as IShift } from "@/interface/shift.api";
import { Box } from "@mui/system";

const StyledTable = styled(Table)`
  border: 1px solid #ddd;
  td,
  th {
    &:not(:last-of-type) {
      border-right: 1px solid #ddd;
    }
    border-bottom: 1px solid #ddd;
  }
  tbody {
    td {
      &:not(.named-cell) {
        padding: 0;
        padding-block: 5px;
      }
    }
  }
`;

export default function TimeSheetTable({
  day,
  type,
  shifts
}: {
  day: Moment;
  type: string;
  shifts: IShift[][];
}) {
  const dates = useMemo(
    () =>
      Array.from({ length: 7 }).map((_: unknown, index: number) =>
        moment(day).add(index, "day")
      ),
    [day]
  );

  return (
    <TableContainer>
      <StyledTable sx={{ minHeight: "100vh" }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {dates.map((_date: Moment) => {
              return (
                <TableCell align="center" key={_date.toISOString()}>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "14px", fontWeight: "500" }}
                  >
                    {_date.format("dddd")}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "14px", fontWeight: "500" }}
                  >
                    {_date.format("DD MMM, YYYY")}
                  </Typography>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {shifts.map((_carer) => (
            <TableRow key={_carer[0].employee.id}>
              <TableCell width={100} className="named-cell">
                {_carer[0].employee.displayName}
              </TableCell>
              {dates.map((_date, index) => {
                const carerShiftsByDate = _carer.filter(
                  (_shift) =>
                    moment(_shift.startDate).format("DD/MM/YYYY") ===
                    _date.format("DD/MM/YYYY")
                );
                const prevCarerShiftsByDate = _carer.filter(
                  (_shift) =>
                    moment(_shift.startDate).format("DD/MM/YYYY") ===
                    dates[index !== 0 ? index - 1 : 0].format("DD/MM/YYYY")
                );

                return prevCarerShiftsByDate[0]?.isShiftEndsNextDay &&
                  prevCarerShiftsByDate[0]?.id !==
                    carerShiftsByDate[0]?.id ? null : (
                  <TableCell
                    width={100}
                    key={_date.unix()}
                    height={120}
                    sx={{ position: "relative", minHeight: "100px" }}
                    colSpan={carerShiftsByDate[0]?.isShiftEndsNextDay ? 2 : 1}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "5px",
                        left: 0,
                        width: "100%"
                      }}
                    >
                      {carerShiftsByDate.slice(0, 1).map((_shift) => (
                        <Shift
                          shift={_shift}
                          key={_shift.id}
                          type={"comfortable"}
                        />
                      ))}
                      <Typography
                        variant="caption"
                        style={{
                          display: "block",
                          marginTop: "5px",
                          paddingLeft: "10px"
                        }}
                      >
                        {carerShiftsByDate.length > 1 &&
                          `+ ${carerShiftsByDate.length - 1} more`}
                      </Typography>
                    </Box>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
          <TableRow>
            <TableCell height="100%" />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}
