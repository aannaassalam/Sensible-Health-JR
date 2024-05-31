import {
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  TooltipProps,
  Typography,
  tooltipClasses
} from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import Shift from "./shift";
import styled from "@emotion/styled";
import moment, { Moment } from "moment";
import { Shift as IShift } from "@/interface/shift.api";
import { Box, Stack } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import AddShift from "../add-shift/add-shift";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getStaffList } from "@/api/functions/staff.api";
import { IStaff } from "@/interface/staff.interfaces";
import Loader from "@/ui/Loader/Loder";

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
  .add-shift-box {
    height: 100%;
    margin-inline: 5px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .add-shift-text {
      opacity: 0;
      transition: all 0.3s;
      display: flex;
      align-items: center;
    }
    &:hover {
      background-color: #efefef;
      .add-shift-text {
        opacity: 1;
        transition: all 0.3s;
      }
    }
  }
`;

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    minWidth: "200px",
    backgroundColor: "#fff",
    // color: "rgba(0, 0, 0, 0.87)",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    border: "1px solid #ebebeb",
    borderRadius: "10px",
    fontSize: 11
  }
}));

const ShiftBox = ({ shifts }: { shifts: IShift[] }) => {
  const otherShifts = (
    <Stack spacing={1.5} sx={{ padding: "10px 5px" }}>
      {shifts.slice(1).map((_shift) => (
        <Shift shift={_shift} key={_shift.id} type={"comfortable"} />
      ))}
    </Stack>
  );

  return (
    <Box
      sx={{
        position: "absolute",
        top: "5px",
        left: 0,
        width: "100%"
      }}
    >
      {shifts.slice(0, 1).map((_shift) => (
        <Shift shift={_shift} key={_shift.id} type={"comfortable"} />
      ))}
      <StyledTooltip title={otherShifts}>
        <Typography
          variant="body1"
          style={{
            display: "block",
            marginTop: "5px",
            paddingLeft: "10px",
            fontSize: "15px",
            color: "#0a9797",
            fontWeight: "500",
            cursor: "pointer"
          }}
        >
          {shifts.length > 1 && `+ ${shifts.length - 1} more`}
        </Typography>
      </StyledTooltip>
    </Box>
  );
};

export default function TimeSheetTable({
  day,
  type,
  shifts
}: {
  day: Moment;
  type: string;
  shifts: IShift[];
}) {
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);

  const router = useRouter();

  const { data: staffs, isLoading } = useQuery({
    queryKey: ["user_list"],
    queryFn: getStaffList
  });

  const times = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24
  ];

  const dates = useMemo(
    () =>
      Array.from({ length: 7 }).map((_: unknown, index: number) =>
        moment(day).add(index, "day")
      ),
    [day]
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <TableContainer>
        <StyledTable sx={{ minHeight: "100vh" }}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {type === "daily"
                ? times.map((_time: number) => (
                    <TableCell align="center" key={_time}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "14px", fontWeight: "500" }}
                      >
                        {moment(_time, "HH").format("hh:mm a")}
                      </Typography>
                    </TableCell>
                  ))
                : dates.map((_date: Moment) => {
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
            {staffs?.map((_carer: IStaff) => (
              <TableRow key={_carer.id}>
                <TableCell width={100} className="named-cell">
                  {_carer.name}
                </TableCell>
                {type === "daily"
                  ? times.map((_time) => <TableCell key={_time}></TableCell>)
                  : dates.map((_date, index) => {
                      const carerShiftsByDate = shifts.filter(
                        (_shift) =>
                          moment(_shift.startDate).format("DD/MM/YYYY") ===
                            _date.format("DD/MM/YYYY") &&
                          _carer.id === _shift.employee.id
                      );
                      const prevCarerShiftsByDate = shifts.filter(
                        (_shift) =>
                          moment(_shift.startDate).format("DD/MM/YYYY") ===
                            dates[index !== 0 ? index - 1 : 0].format(
                              "DD/MM/YYYY"
                            ) && _carer.id === _shift.employee.id
                      );

                      return prevCarerShiftsByDate[0]?.isShiftEndsNextDay &&
                        prevCarerShiftsByDate[0]?.id !==
                          carerShiftsByDate[0]?.id ? null : (
                        <TableCell
                          width={100}
                          key={_date.unix()}
                          height={120}
                          sx={{ position: "relative", minHeight: "100px" }}
                          colSpan={
                            carerShiftsByDate[0]?.isShiftEndsNextDay &&
                            index !== dates.length - 1
                              ? 2
                              : 1
                          }
                        >
                          {carerShiftsByDate.length > 0 ? (
                            <ShiftBox shifts={carerShiftsByDate} />
                          ) : (
                            <Box
                              className="add-shift-box"
                              onClick={() => {
                                router.replace(
                                  {
                                    query: {
                                      staff: _carer.id
                                    }
                                  },
                                  undefined,
                                  { shallow: true }
                                );
                                setSelectedDate(_date);
                              }}
                            >
                              <Typography
                                variant="body1"
                                className="add-shift-text"
                              >
                                <AddIcon sx={{ marginRight: "10px" }} /> Shift
                              </Typography>
                            </Box>
                          )}
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
              {type === "daily" && (
                <>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                </>
              )}
            </TableRow>
          </TableBody>
        </StyledTable>
      </TableContainer>
      <AddShift
        open={Boolean(selectedDate)}
        onClose={() => {
          router.replace(
            {
              query: {}
            },
            undefined,
            { shallow: true }
          );
          setSelectedDate(null);
        }}
        selectedDate={selectedDate}
      />
    </>
  );
}
