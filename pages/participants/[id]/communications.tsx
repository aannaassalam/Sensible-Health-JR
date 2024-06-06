import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import styled from "@emotion/styled";
import { Button, Chip, Divider, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import { DatePicker } from "antd";
import StyledPaper from "@/ui/Paper/Paper";
import Iconify from "@/components/Iconify/Iconify";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getAllShiftNotes } from "@/api/functions/client.api";
import { Dayjs } from "dayjs";
import { RangePickerProps } from "antd/lib/date-picker";
import moment from "moment";
import { ShiftNotes } from "@/interface/shift.interface";

const { RangePicker } = DatePicker;

const StyledBox = styled(Box)``;

const StyledCommunication = styled(Box)`
  padding-inline: 40px;
  .mainBox {
    border-left: 3px solid #ccc;
    padding: 10px 30px;
    padding-right: 0;
    position: relative;

    .floating-element {
      width: 28px;
      height: 28px;
      padding: 3px;
      display: flex;
      align-items: center;
      border-radius: 50%;
      justify-content: center;
      position: absolute;
      top: 25px;
      left: -10.5px;
      color: #fff;
    }
  }
`;

const getIcon = (noteType: string) => {
  switch (noteType) {
    case "Enquiry":
      return (
        <Box className="floating-element" sx={{ backgroundColor: "#ff851b" }}>
          <Iconify icon="mdi:magnify" />
        </Box>
      );
    case "Notes":
      return (
        <Box className="floating-element" sx={{ backgroundColor: "#00a65a" }}>
          <Iconify icon="ic:sharp-person" />
        </Box>
      );
    case "Incident":
      return (
        <Box className="floating-element" sx={{ backgroundColor: "#0073b7" }}>
          <Iconify icon="ph:flag-fill" />
        </Box>
      );
    case "Injury":
      return (
        <Box className="floating-element" sx={{ backgroundColor: "#dd4b39" }}>
          <Iconify icon="fa:ambulance" />
        </Box>
      );
    case "Feedback":
      return (
        <Box className="floating-element" sx={{ backgroundColor: "#ff851b" }}>
          <Iconify icon="ep:warning-filled" />
        </Box>
      );
  }
};

const EachCommunication = ({
  note,
  lastElement
}: {
  note: ShiftNotes;
  lastElement?: boolean;
}) => {
  return (
    <StyledCommunication>
      <Box
        className="mainBox"
        paddingBottom={lastElement ? "80px !important" : "10px"}
      >
        <Stack
          direction="row"
          gap={2}
          alignItems="flex-end"
          justifyContent="space-between"
        >
          {getIcon(note.shiftNotesCategories)}
          <Typography variant="body1">
            <strong>{note.addedByEmployee}</strong> added{" "}
            {note.shiftNotesCategories} dated{" "}
            {moment.unix(note.epochDate).format("DD/MM/YYYY")}
          </Typography>
          <Stack alignItems="flex-end">
            <Typography
              variant="caption"
              display="flex"
              alignItems="center"
              gap={0.5}
            >
              <Iconify icon="bi:clock" width={13} height={13} />
              {moment.unix(note.createdAtEpoch).fromNow()}
            </Typography>
            <Typography variant="caption">
              {moment.unix(note.createdAtEpoch).format("LLL")}
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ marginBlock: "10px 15px" }} />
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          gap={2}
        >
          <Box>
            <Typography variant="body1" marginBottom={1}>
              <strong>{note.subject}</strong>
            </Typography>
            <Typography variant="body1">{note.notes}</Typography>
          </Box>
          <Button>Edit</Button>
        </Stack>
        <Divider sx={{ marginTop: "80px", borderColor: "#ccc" }} />
      </Box>
    </StyledCommunication>
  );
};

export default function Communications() {
  const [dates, setDates] = useState<
    [Dayjs | null | undefined, Dayjs | null | undefined] | null | undefined
  >([null, null]);
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["all_shift_notes", id, dates],
    queryFn: () =>
      getAllShiftNotes({
        id: id as string,
        startDate: dates?.[0]?.unix(),
        endDate: dates?.[1]?.endOf("day").unix()
      })
  });

  return (
    <DashboardLayout isLoading={isLoading}>
      <StyledBox>
        <Stack
          direction="row"
          justifyContent="space-between"
          gap={2}
          flexWrap="wrap"
          marginBottom={5}
        >
          <Button role="a" href="#add-noted" variant="contained">
            Add Note
          </Button>
          <Stack direction="row" gap={2} flexWrap="wrap">
            <Button variant="contained">Export</Button>
            <RangePicker
              allowClear
              format="DD/MM/YYYY"
              value={dates}
              onChange={(dates: RangePickerProps["value"]) => setDates(dates)}
            />
            <Button variant="outlined">Filter Categories</Button>
          </Stack>
        </Stack>
        <StyledPaper>
          {Object.entries(data || {}).map((_item) => {
            return (
              <Box key={_item[0]}>
                <Chip
                  label={moment.unix(parseInt(_item[0])).format("D MMM, YYYY")}
                  variant="filled"
                />
                {(_item[1] as ShiftNotes[]).map((_note, index: number) => (
                  <EachCommunication
                    key={_note.id}
                    note={_note}
                    lastElement={
                      index === (_item[1] as ShiftNotes[]).length - 1
                    }
                  />
                ))}
              </Box>
            );
          })}
        </StyledPaper>
      </StyledBox>
    </DashboardLayout>
  );
}
