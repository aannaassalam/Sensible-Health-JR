/* eslint-disable @typescript-eslint/no-non-null-assertion */
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import styled from "@emotion/styled";
import {
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Popover,
  Select,
  Typography
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useRef, useState } from "react";
import { DatePicker } from "antd";
import { DatePicker as Datepicker } from "@mui/x-date-pickers";
import StyledPaper from "@/ui/Paper/Paper";
import Iconify from "@/components/Iconify/Iconify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getAllShiftNotes } from "@/api/functions/client.api";
import dayjs, { Dayjs } from "dayjs";
import { RangePickerProps } from "antd/lib/date-picker";
import moment from "moment";
import { ShiftNoteBody, ShiftNotes } from "@/interface/shift.interface";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MenuItem from "@mui/material/MenuItem";
import CustomInput from "@/ui/Inputs/CustomInput";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import { addShiftNote, exportShiftNotes } from "@/api/functions/shift.api";
import { LoadingButton } from "@mui/lab";
import { useCurrentEditor } from "@tiptap/react";
import { useRouter } from "next/router";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import prettyBytes from "pretty-bytes";
import Image from "next/image";
import assets from "@/json/assets";
import Link from "next/link";

const { RangePicker } = DatePicker;

const StyledBox = styled(Box)`
  .tiptap {
    height: 400px;
    overflow: auto;
  }
`;

const StyledCommunication = styled(Box)`
  padding-inline: 40px;
  .mainBox {
    border-left: 3px solid #ccc;
    padding: 10px 30px;
    padding-right: 0;
    position: relative;

    .floating-element {
      width: 30px;
      height: 30px;
      /* padding: 3px; */
      display: flex;
      align-items: center;
      border-radius: 50%;
      justify-content: center;
      position: absolute;
      top: 20px;
      left: -15.5px;
      color: #fff;
    }
  }
  .file {
    margin-top: 20px;
    width: 280px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    > div {
      flex: 1;
      p {
        width: 175px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    a {
      display: flex;
      align-items: center;
    }
    img {
      width: 30px;
      height: 30px;
      aspect-ratio: 1/1;
      &.file_image {
        width: 45px;
        height: 45px;
      }
    }
  }
`;

const getIcon = (noteType: string) => {
  switch (noteType) {
    case "Enquiry":
      return (
        <Box className="floating-element" sx={{ backgroundColor: "#ff851b" }}>
          <Iconify icon="iconamoon:search-bold" />
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
  const [isEdit, setIsEdit] = useState(false);
  // const schema = yup.object().shape({
  //   shiftNoteCategories: yup.string(),
  //   date: yup.date(),
  //   subject: yup.string().required("Please enter a Subject"),
  //   notes: yup.string().required("Please enter a note")
  // });

  // const methods = useForm({
  //   resolver: yupResolver(schema),
  //   defaultValues: {
  //     shiftNoteCategories: note.shiftNotesCategories,
  //     date: note.date,
  //     subject: note.subject,
  //     notes:note.notes
  //   }
  // });

  return (
    <>
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
              <Box dangerouslySetInnerHTML={{ __html: note.notes }} />
            </Box>
            {/* <Button>Edit</Button> */}
          </Stack>
          {note.documents.map((_document) => (
            <Stack
              direction="row"
              className="file"
              key={_document.downloadURL}
              gap={1}
            >
              <Image
                src={assets.file_icon}
                alt="File Icon"
                width={512}
                height={512}
                className="file_image"
              />
              <Box>
                <Typography sx={{ fontSize: "15px" }}>
                  {_document.fileName}
                </Typography>
                <Typography variant="caption">
                  {prettyBytes(_document.fileSize)}
                </Typography>
              </Box>
              <Link href={_document.downloadURL} download>
                <Image
                  src={assets.download}
                  alt="download"
                  width={512}
                  height={512}
                />
              </Link>
            </Stack>
          ))}
          <Divider sx={{ marginTop: "80px", borderColor: "#ccc" }} />
        </Box>
      </StyledCommunication>
      {/* <MuiModalWrapper
        title="Edit Shift Notes"
        open={isEdit}
        onClose={() => setIsEdit(false)}
      >
        <FormProvider {...methods}>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Controller
                control={methods.control}
                name="shiftNoteCategories"
                render={({ field }) => (
                  <Select {...field} fullWidth size="small">
                    <MenuItem value="Notes">Notes</MenuItem>
                    <MenuItem value="Feedback">Feedback</MenuItem>
                    <MenuItem value="Enquiry">Enquiry</MenuItem>
                    <MenuItem value="Incident">Incident</MenuItem>
                    <MenuItem value="Injury">Injury</MenuItem>
                  </Select>
                )}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Controller
                control={methods.control}
                name="date"
                render={({ field }) => (
                  <Datepicker
                    {...field}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small"
                      }
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <CustomInput name="subject" placeholder="Enter Notes" />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Box
                padding={1}
                paddingInline={1.5}
                border="1px solid #ededed"
                borderRadius={1}
              >
                <Controller
                  control={methods.control}
                  name="notes"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <Box>
                      <RichTextEditor {...field} />
                      {invalid && (
                        <FormHelperText>{error?.message}</FormHelperText>
                      )}
                    </Box>
                  )}
                />
              </Box>
            </Grid>
          </Grid>
        </FormProvider>
      </MuiModalWrapper> */}
    </>
  );
};

const schema = yup.object().shape({
  shiftNoteCategories: yup.string(),
  date: yup.date(),
  subject: yup.string().required("Please enter a Subject"),
  notes: yup.string().required("Please enter a note")
});

export default function Communications() {
  const [dates, setDates] = useState<
    [Dayjs | null | undefined, Dayjs | null | undefined] | null | undefined
  >([null, null]);
  const [documents, setDocuments] = useState<File | null | undefined>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [filterValues, setFilterValues] = useState([
    "Enquiry",
    "Injury",
    "Incident",
    "Notes",
    "Feedback"
  ]);
  const { id } = useParams();
  const router = useRouter();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      shiftNoteCategories: "Notes",
      date: dayjs(),
      subject: "",
      notes: ""
    }
  });

  const { data, isLoading } = useQuery({
    queryKey: ["all_shift_notes", id, dates],
    queryFn: () =>
      getAllShiftNotes({
        id: id as string,
        startDate: dates?.[0]?.unix(),
        endDate: dates?.[1]?.endOf("day").unix()
      })
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addShiftNote,
    onSuccess: router.reload
  });

  const onSubmit = (
    data: Omit<ShiftNoteBody, "documents" | "date"> & { date: Dayjs }
  ) => {
    const formData = new FormData();
    formData.append("shiftNotesCategories", data.shiftNoteCategories);
    formData.append("date", dayjs(data.date).format("YYYY-MM-DD"));
    formData.append("notes", data.notes);
    formData.append("subject", data.subject);
    formData.append("clientId", id.toString());
    if (documents) formData.append("files", documents);
    mutate(formData);
  };

  const { mutate: exportShiftNotesMutation, isPending: isExporting } =
    useMutation({
      mutationFn: exportShiftNotes
    });

  const open = Boolean(anchorEl);

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
          <Button role="a" href="#add-notes" variant="contained">
            Add Note
          </Button>
          <Stack direction="row" gap={2} flexWrap="wrap">
            <LoadingButton
              variant="contained"
              onClick={() => exportShiftNotesMutation(id as string)}
              loading={isExporting}
            >
              Export
            </LoadingButton>
            <RangePicker
              allowClear
              format="DD/MM/YYYY"
              value={dates}
              onChange={(dates: RangePickerProps["value"]) => setDates(dates)}
            />
            <Box>
              <Button
                variant="outlined"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                Filter Categories
              </Button>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  horizontal: "center",
                  vertical: "bottom"
                }}
                transformOrigin={{
                  horizontal: "center",
                  vertical: "top"
                }}
                sx={{
                  ".MuiPaper-root": {
                    paddingBlock: "10px",
                    paddingInline: "15px"
                  }
                }}
              >
                <Stack>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    checked={filterValues.includes("Notes")}
                    onChange={() =>
                      setFilterValues((prev) =>
                        prev.includes("Notes")
                          ? prev.filter((_prev) => _prev !== "Notes")
                          : [...prev, "Notes"]
                      )
                    }
                    label="Notes"
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    checked={filterValues.includes("Feedback")}
                    onChange={() =>
                      setFilterValues((prev) =>
                        prev.includes("Feedback")
                          ? prev.filter((_prev) => _prev !== "Feedback")
                          : [...prev, "Feedback"]
                      )
                    }
                    label="Feedback"
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    checked={filterValues.includes("Enquiry")}
                    onChange={() =>
                      setFilterValues((prev) =>
                        prev.includes("Enquiry")
                          ? prev.filter((_prev) => _prev !== "Enquiry")
                          : [...prev, "Enquiry"]
                      )
                    }
                    label="Enquiry"
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    checked={filterValues.includes("Incident")}
                    onChange={() =>
                      setFilterValues((prev) =>
                        prev.includes("Incident")
                          ? prev.filter((_prev) => _prev !== "Incident")
                          : [...prev, "Incident"]
                      )
                    }
                    label="Incident"
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    checked={filterValues.includes("Injury")}
                    onChange={() =>
                      setFilterValues((prev) =>
                        prev.includes("Injury")
                          ? prev.filter((_prev) => _prev !== "Injury")
                          : [...prev, "Injury"]
                      )
                    }
                    label="Injury"
                  />
                </Stack>
              </Popover>
            </Box>
          </Stack>
        </Stack>
        <StyledPaper>
          {Object.keys(data || {})
            .sort((a, b) => parseInt(b) - parseInt(a))
            .map((_key) => {
              const eachShiftNotesArray = data[_key] as ShiftNotes[];
              return (
                eachShiftNotesArray.some((_data) =>
                  filterValues.includes(_data.shiftNotesCategories)
                ) && (
                  <Box key={_key}>
                    <Chip
                      label={moment.unix(parseInt(_key)).format("D MMM, YYYY")}
                      variant="filled"
                      color="error"
                    />
                    {eachShiftNotesArray
                      .filter((_note) =>
                        filterValues.includes(_note.shiftNotesCategories)
                      )
                      .sort((a, b) => b.createdAtEpoch - a.createdAtEpoch)
                      .map((_note, index: number) => (
                        <EachCommunication
                          key={_note.id}
                          note={_note}
                          lastElement={index === eachShiftNotesArray.length - 1}
                        />
                      ))}
                  </Box>
                )
              );
            })}
          <Box paddingLeft={8} paddingRight={5} id="add-notes">
            <FormProvider {...methods}>
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Controller
                    control={methods.control}
                    name="shiftNoteCategories"
                    render={({ field }) => (
                      <Select {...field} fullWidth size="small">
                        <MenuItem value="Notes">Notes</MenuItem>
                        <MenuItem value="Feedback">Feedback</MenuItem>
                        <MenuItem value="Enquiry">Enquiry</MenuItem>
                        <MenuItem value="Incident">Incident</MenuItem>
                        <MenuItem value="Injury">Injury</MenuItem>
                      </Select>
                    )}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Controller
                    control={methods.control}
                    name="date"
                    render={({ field }) => (
                      <Datepicker
                        {...field}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            size: "small"
                          }
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <CustomInput name="subject" placeholder="Enter Subject" />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Box
                    padding={1}
                    paddingInline={1.5}
                    border="1px solid #ededed"
                    borderRadius={1}
                  >
                    <Controller
                      control={methods.control}
                      name="notes"
                      render={({ field, fieldState: { invalid, error } }) => (
                        <Box>
                          <RichTextEditor {...field} />
                          {invalid && (
                            <FormHelperText>{error?.message}</FormHelperText>
                          )}
                        </Box>
                      )}
                    />
                  </Box>
                </Grid>
              </Grid>
            </FormProvider>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              marginTop={3}
              marginBottom={5}
            >
              <input
                type="file"
                onChange={(e) => setDocuments(e.target.files?.[0])}
              />
              <LoadingButton
                variant="contained"
                onClick={methods.handleSubmit(onSubmit)}
                loading={isPending}
              >
                Add
              </LoadingButton>
            </Stack>
          </Box>
        </StyledPaper>
      </StyledBox>
    </DashboardLayout>
  );
}
