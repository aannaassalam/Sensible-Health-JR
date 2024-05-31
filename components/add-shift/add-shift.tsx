import styled from "@emotion/styled";
import {
  Autocomplete,
  AutocompleteProps,
  Button,
  Checkbox,
  Divider,
  Drawer,
  DrawerProps,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Iconify from "../Iconify/Iconify";
import { Box, Stack } from "@mui/system";
import StyledPaper from "@/ui/Paper/Paper";
import Image from "next/image";
import assets from "@/json/assets";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps
} from "@mui/base/Unstable_NumberInput";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import CustomInput from "@/ui/Inputs/CustomInput";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getStaffList } from "@/api/functions/staff.api";
import { IStaff } from "@/interface/staff.interfaces";
import { getAllClients } from "@/api/functions/client.api";
import { IClient } from "@/interface/client.interface";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import { ShiftBody, Task } from "@/interface/shift.api";
import { createShift } from "@/api/functions/shift.api";
import { LoadingButton } from "@mui/lab";
import { useCurrentEditor } from "@tiptap/react";
import { Moment } from "moment";

const StyledDrawer = styled(Drawer)`
  > .drawer {
    width: 700px;
    background-color: #f0f0f0;
    @media (width<=699px) {
      width: 100%;
    }
  }
  .header {
    padding: 15px;
    background-color: #fff;
  }
  .main-container {
    padding: 15px;
  }
  img.icon {
    width: 30px;
    height: 30px;
  }
`;

const StyledInputRoot = styled(Box)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled("input")`
  height: 40px;
  width: 100%;
  padding: 8.5px 14px;
  text-align: center;
  border-block: 1px solid rgba(145, 158, 171, 0.24);
  border-inline: none;
  font-size: 16px;
  color: #212b36;
  font-weight: 400;
  letter-spacing: 1px;
  font-family: "Inter", sans-serif;
`;

const StyledButton = styled("button")`
  padding: 8.7px;
  background-color: #f0f0f0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid rgba(145, 158, 171, 0.24);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &.increment {
    order: 1;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const CustomStepperInput = (
  props: NumberInputProps & {
    onChange: (value: number | null) => void;
  }
) => {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" sx={{ color: "#606266" }} />,
          className: "increment"
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" sx={{ color: "#606266" }} />
        }
      }}
      min={1}
      max={60}
      {...props}
      onChange={(e, val) => props.onChange(val)}
    />
  );
};

interface CustomAutoCompleteProps
  extends Omit<
    AutocompleteProps<
      string,
      boolean | undefined,
      boolean | undefined,
      boolean | undefined
    >,
    "onChange"
  > {
  onChange: (value: string) => void;
}

const AddressInput = ({ ...props }: CustomAutoCompleteProps) => {
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGoogle({
      apiKey: process.env.NEXT_APP_GOOGLE_API
    });

  console.log(placePredictions, isPlacePredictionsLoading);

  const AddressItem = ({ description }: { description: any }) => {
    return (
      <Stack alignItems="center" gap={1}>
        <Iconify icon="carbon:location-filled" />
        <Typography variant="caption">{description}</Typography>
      </Stack>
    );
  };

  return (
    <Autocomplete
      size="small"
      freeSolo
      {...props}
      onChange={(e: any, newValue: any | null) => {
        console.log(e, newValue, "dfd");
      }}
      onInputChange={(e: any, value: string) => {
        getPlacePredictions({ input: value });
        props.onChange && props.onChange(value as string);
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Search Address" />
      )}
      loading={isPlacePredictionsLoading}
      loadingText="Loading Locations"
      options={placePredictions}
      renderOption={(item) => <AddressItem description={item} />}
    />
  );
};

const ClientSection = () => {
  const { control } = useFormContext();

  const { data, isLoading } = useQuery({
    queryKey: ["client_list"],
    queryFn: getAllClients
  });

  return (
    <StyledPaper>
      <Stack direction="row" alignItems="center" gap={2}>
        <Image
          src={assets.client_img}
          alt="Client"
          width={512}
          height={512}
          className="icon"
        />
        <Typography variant="h6">Paritcipant</Typography>
      </Stack>
      <Divider sx={{ marginBlock: "10px" }} />
      <Grid container alignItems="center">
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Typography>Choose Participant</Typography>
        </Grid>
        <Grid item lg={8} md={6} sm={12} xs={12}>
          <Controller
            control={control}
            name="clientId"
            render={({ field, fieldState: { error, invalid } }) => (
              <Box>
                <Select
                  fullWidth
                  size="small"
                  {...field}
                  displayEmpty
                  renderValue={
                    field.value !== "" ? undefined : () => "Select Participant"
                  }
                >
                  {isLoading ? (
                    <MenuItem disabled>Loading...</MenuItem>
                  ) : (
                    data?.map((_data: IClient) => (
                      <MenuItem value={_data.id} key={_data.id}>
                        {_data.firstName} {_data.lastName}
                      </MenuItem>
                    ))
                  )}
                </Select>
                {invalid && <FormHelperText>{error?.message}</FormHelperText>}
              </Box>
            )}
          />
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

const StaffSection = () => {
  const { control } = useFormContext();

  const { data, isLoading } = useQuery({
    queryKey: ["user_list"],
    queryFn: getStaffList
  });

  return (
    <StyledPaper>
      <Stack direction="row" alignItems="center" gap={2}>
        <Image
          src={assets.nurse}
          alt="Carer"
          width={512}
          height={512}
          className="icon"
        />
        <Typography variant="h6">Carer</Typography>
      </Stack>
      <Divider sx={{ marginBlock: "10px" }} />
      <Grid container alignItems="center">
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Typography>Choose Carer</Typography>
        </Grid>
        <Grid item lg={8} md={6} sm={12} xs={12}>
          <Controller
            control={control}
            name="employeeIds"
            render={({ field, fieldState: { error, invalid } }) => {
              return (
                <Box>
                  <Select
                    fullWidth
                    size="small"
                    {...field}
                    onChange={(e) => {
                      const _value = e.target.value;
                      field.onChange(
                        typeof _value === "string" ? _value.split(",") : _value
                      );
                    }}
                    displayEmpty
                    renderValue={
                      field.value?.length !== 0
                        ? undefined
                        : () => "Select Carer"
                    }
                    multiple
                  >
                    {isLoading ? (
                      <MenuItem disabled>Loading...</MenuItem>
                    ) : (
                      data?.map((_data: IStaff) => (
                        <MenuItem value={_data.id} key={_data.id}>
                          {_data.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  {invalid && <FormHelperText>{error?.message}</FormHelperText>}
                </Box>
              );
            }}
          />
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

const TaskSection = () => {
  const { control, watch } = useFormContext();

  const { append, remove } = useFieldArray({
    name: "tasks",
    control: control
  });

  const shortSchema = yup.object().shape({
    task: yup.string().required("Please enter a task"),
    isTaskMandatory: yup.boolean()
  });

  const {
    control: shortControl,
    handleSubmit,
    reset
  } = useForm({
    resolver: yupResolver(shortSchema),
    defaultValues: {
      task: "",
      isTaskMandatory: false
    }
  });

  const onSubmit = (data: Task) => {
    append(data);
    reset();
  };

  return (
    <StyledPaper>
      <Stack direction="row" alignItems="center" gap={2}>
        <Image
          src={assets.task}
          alt="tasks"
          width={512}
          height={512}
          className="icon"
        />
        <Typography variant="h6">Tasks</Typography>
      </Stack>
      <Divider sx={{ marginBlock: "10px" }} />
      <Box>
        <Stack
          direction="row"
          alignItems="flex-start"
          gap={2}
          justifyContent="space-between"
          marginBottom={2}
        >
          <Controller
            name="task"
            control={shortControl}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                size="small"
                fullWidth
                placeholder="Task Description"
                {...field}
                error={invalid}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="isTaskMandatory"
            control={shortControl}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Mandatory"
                {...field}
                checked={field.value}
              />
            )}
          />
          <Button
            startIcon={<AddIcon fontSize="small" />}
            variant="contained"
            size="small"
            sx={{ minWidth: "auto", marginTop: "5px" }}
            onClick={handleSubmit(onSubmit)}
          >
            Task
          </Button>
        </Stack>
        {watch("tasks").map((_task: Task, index: number) => (
          <Stack
            key={index}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            padding={1}
            paddingRight={5}
            marginBottom={2}
            position="relative"
            sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}
          >
            <Typography>{_task.task}</Typography>
            <Typography>
              <strong>Mandatory: </strong>
              {_task.isTaskMandatory ? "Yes" : "No"}
            </Typography>
            <button
              style={{
                borderRadius: "50%",
                backgroundColor: "#fff",
                color: "#fff",
                border: "2px solid #fff",
                position: "absolute",
                top: -10,
                right: -10,
                boxShadow: "0 1px 2px 0 rgba(0,0,0,.3)",
                cursor: "pointer"
              }}
              onClick={() => remove(index)}
            >
              <Image
                src={assets.delete}
                alt="delete"
                width={512}
                height={512}
                style={{ width: 25, height: 25 }}
              />
            </button>
          </Stack>
        ))}
      </Box>
    </StyledPaper>
  );
};

const InstructionSection = () => {
  const { control } = useFormContext();

  return (
    <StyledPaper>
      <Stack direction="row" alignItems="center" gap={2}>
        <Image
          src={assets.notes}
          alt="notes"
          width={512}
          height={512}
          className="icon"
        />
        <Typography variant="h6">Instructions</Typography>
      </Stack>
      <Divider sx={{ marginBlock: "10px" }} />
      <Controller
        name="instruction"
        control={control}
        render={({ field }) => (
          <RichTextEditor value={field.value} onChange={field.onChange} />
        )}
      />
    </StyledPaper>
  );
};

const repeatPeriods = {
  Daily: {
    repeats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    name: "Day",
    display: ""
  },
  Weekly: {
    repeats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    name: "Week",
    display: "days"
  },
  Monthly: {
    repeats: [1, 2, 3],
    name: "Month",
    display: "daysOfMonth"
  }
};

const shiftTypeArray = [
  {
    id: "PersonalCare",
    name: "Personal Care"
  },
  {
    id: "DomesticAssistance",
    name: "Domestic Assistance"
  },
  {
    id: "NightShift",
    name: "Night Shift"
  },
  {
    id: "RespiteCare",
    name: "Respite Care"
  },
  {
    id: "Sleepover",
    name: "Sleepover"
  },
  {
    id: "SupportCoordination",
    name: "Support Coordination"
  },
  {
    id: "Transport",
    name: "Transport"
  }
];

const daysOfWeek = [
  {
    id: "SUNDAY",
    name: "Sun"
  },
  {
    id: "MONDAY",
    name: "Mon"
  },
  {
    id: "TUESDAY",
    name: "Tue"
  },
  {
    id: "WEDNESDAY",
    name: "Wed"
  },
  {
    id: "THURSDAY",
    name: "Thur"
  },
  {
    id: "FRIDAY",
    name: "Fri"
  },
  {
    id: "SATURDAY",
    name: "Sat"
  }
];

const TimeAndLocation = () => {
  const { control, watch, setValue } = useFormContext();

  return (
    <StyledPaper>
      <Stack direction="row" alignItems="center" gap={2}>
        <Image
          src={assets.calendar}
          alt="Calendar"
          width={512}
          height={512}
          style={{ width: 25, height: 25 }}
          className="icon"
        />
        <Typography variant="h6">Time & Location</Typography>
      </Stack>
      <Divider sx={{ marginBlock: "10px" }} />
      <Grid container rowSpacing={2} columnSpacing={1} alignItems="center">
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Typography>Shift Type</Typography>
        </Grid>
        <Grid item lg={8} md={6} sm={12} xs={12}>
          <Controller
            name="shiftType"
            control={control}
            render={({ field }) => (
              <Select fullWidth size="small" {...field}>
                {shiftTypeArray.map((_shift) => (
                  <MenuItem value={_shift.id} key={_shift.id}>
                    {_shift.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          Date
        </Grid>
        <Grid item lg={8} md={6} sm={12} xs={12}>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true
                  }
                }}
                minDate={dayjs()}
                format="DD/MM/YYYY"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  setValue("occursOnDays", [e.format("dddd").toUpperCase()]);
                }}
              />
            )}
          />
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          display="flex"
          justifyContent="flex-end"
        >
          <Controller
            control={control}
            name="isShiftEndsNextDay"
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Shift finishes the next day"
                checked={field.value}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          Time
        </Grid>
        <Grid item lg={8} md={6} sm={12} xs={12}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Controller
              name="startTime"
              control={control}
              render={({ field }) => (
                <TimePicker
                  slotProps={{
                    textField: {
                      size: "small"
                    }
                  }}
                  views={["hours", "minutes"]}
                  minutesStep={15}
                  skipDisabled
                  {...field}
                />
              )}
            />
            -
            <Controller
              name="endTime"
              control={control}
              render={({ field }) => (
                <TimePicker
                  slotProps={{
                    textField: {
                      size: "small"
                    }
                  }}
                  views={["hours", "minutes"]}
                  minutesStep={15}
                  skipDisabled
                  {...field}
                />
              )}
            />
          </Stack>
          {watch("isShiftEndsNextDay") && (
            <Typography variant="body2" marginTop={2}>
              This shift is{" "}
              {dayjs(watch("endTime").add(1, "day")).diff(
                watch("startTime"),
                "hours"
              )}{" "}
              hours, finishing next day,{" "}
              {watch("startDate").add(1, "day").format("DD/MM/YYYY")}
            </Typography>
          )}
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          Break time in minutes
        </Grid>
        <Grid item lg={8} md={6} sm={12} xs={12}>
          <Controller
            name="breakTimeInMins"
            control={control}
            render={({ field }) => <CustomStepperInput {...field} />}
          />
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          display="flex"
          justifyContent="flex-end"
        >
          <Controller
            name="isRepeated"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Repeat"
                checked={field.value}
                {...field}
              />
            )}
          />
        </Grid>
        {watch("isRepeated") && (
          <>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Typography>Recurrance</Typography>
            </Grid>
            <Grid item lg={8} md={6} sm={12} xs={12}>
              <Controller
                control={control}
                name="recurrance"
                render={({ field }) => (
                  <Select
                    fullWidth
                    size="small"
                    defaultValue="Weekly"
                    {...field}
                  >
                    <MenuItem value="Daily">Daily</MenuItem>
                    <MenuItem value="Weekly">Weekly</MenuItem>
                    <MenuItem value="Monthly">Monthly</MenuItem>
                  </Select>
                )}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Typography>Repeat Every</Typography>
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              sm={12}
              xs={12}
              display="flex"
              alignItems="center"
            >
              <Controller
                control={control}
                name={
                  watch("recurrance") === "Daily"
                    ? "repeatNoOfDays"
                    : watch("recurrance") === "Weekly"
                    ? "repeatNoOfWeeks"
                    : "repeatNoOfMonths"
                }
                render={({ field }) => (
                  <Select
                    fullWidth
                    size="small"
                    defaultValue="Weekly"
                    {...field}
                  >
                    {repeatPeriods[
                      watch("recurrance") as keyof typeof repeatPeriods
                    ].repeats.map((_value: number) => (
                      <MenuItem value={_value} key={_value}>
                        {_value}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <Typography paddingLeft={2}>
                {
                  repeatPeriods[
                    watch("recurrance") as keyof typeof repeatPeriods
                  ].name
                }
              </Typography>
            </Grid>
            {repeatPeriods[watch("recurrance") as keyof typeof repeatPeriods]
              .display !== "" && (
              <>
                <Grid item lg={4} md={6} sm={12} xs={12}>
                  <Typography>Occurs on</Typography>
                </Grid>
                <Grid
                  item
                  lg={8}
                  md={6}
                  sm={12}
                  xs={12}
                  display="flex"
                  alignItems="center"
                >
                  {repeatPeriods[
                    watch("recurrance") as keyof typeof repeatPeriods
                  ].display === "days" ? (
                    <Stack
                      direction="row"
                      alignItems="center"
                      flexWrap="wrap"
                      gap={1}
                    >
                      {daysOfWeek.map((_day) => {
                        return (
                          <FormControlLabel
                            key={_day.id}
                            control={<Checkbox />}
                            checked={watch("occursOnDays").includes(_day.id)}
                            onChange={() =>
                              setValue(
                                "occursOnDays",
                                watch("occursOnDays").includes(_day.id)
                                  ? watch("occursOnDays").filter(
                                      (_item: string) => _item !== _day.id
                                    )
                                  : [...watch("occursOnDays"), _day.id]
                              )
                            }
                            label={_day.name}
                          />
                        );
                      })}
                    </Stack>
                  ) : (
                    <>
                      <Typography paddingRight={1}>Day</Typography>
                      <Controller
                        name="occursOnDayOfMonth"
                        control={control}
                        render={({ field }) => (
                          <Select fullWidth size="small" {...field}>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={11}>11</MenuItem>
                            <MenuItem value={12}>12</MenuItem>
                            <MenuItem value={13}>13</MenuItem>
                            <MenuItem value={14}>14</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                            <MenuItem value={16}>16</MenuItem>
                            <MenuItem value={17}>17</MenuItem>
                            <MenuItem value={18}>18</MenuItem>
                            <MenuItem value={19}>19</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={21}>21</MenuItem>
                            <MenuItem value={22}>22</MenuItem>
                            <MenuItem value={23}>23</MenuItem>
                            <MenuItem value={24}>24</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={26}>26</MenuItem>
                            <MenuItem value={27}>27</MenuItem>
                            <MenuItem value={28}>28</MenuItem>
                            <MenuItem value={29}>29</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={31}>31</MenuItem>
                          </Select>
                        )}
                      />
                      <Typography paddingLeft={2} whiteSpace="nowrap">
                        of the Month
                      </Typography>
                    </>
                  )}
                </Grid>
              </>
            )}
            <Grid item lg={4} md={6} sm={12} xs={12}>
              End Date
            </Grid>
            <Grid item lg={8} md={6} sm={12} xs={12}>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true
                      }
                    }}
                    minDate={dayjs(watch("startDate"))}
                    format="DD/MM/YYYY"
                    {...field}
                  />
                )}
              />
            </Grid>
          </>
        )}
        <Grid item lg={4} md={6} sm={12} xs={12}>
          Address
        </Grid>
        <Grid item lg={8} md={6} sm={12} xs={12}>
          <CustomInput name="address" placeholder="Enter Address here" />
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          Unit/Apartment Number
        </Grid>
        <Grid item lg={8} md={6} sm={12} xs={12}>
          <CustomInput
            name="apartmentNumber"
            placeholder="Enter Unit/Apartment Number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="bxs:building" color="#c0c4cc" />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          display="flex"
          justifyContent="flex-end"
        >
          <Controller
            name="isDropOffAddress"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox size="small" />}
                checked={field.value}
                {...field}
                label="Drop off address"
              />
            )}
          />
        </Grid>
        {watch("isDropOffAddress") && (
          <>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              Drop off address
            </Grid>
            <Grid item lg={8} md={6} sm={12} xs={12}>
              <CustomInput
                name="dropOffAddress"
                placeholder="Enter Address here"
              />
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              Drop off Unit/Aparment number
            </Grid>
            <Grid item lg={8} md={6} sm={12} xs={12}>
              <CustomInput
                name="dropOffApartmentNumber"
                placeholder="Enter Unit/Apartment Number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="bxs:building" color="#c0c4cc" />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </>
        )}
      </Grid>
    </StyledPaper>
  );
};

interface AddShiftProps extends DrawerProps {
  isClient?: boolean;
  onClose: () => void;
  selectedDate?: Moment | null;
}

const schema = yup.object().shape({
  startDate: yup.date().required("Please Select a Date"),
  isShiftEndsNextDay: yup.boolean(),
  startTime: yup.date().required("Please select a start time"),
  endTime: yup.date().required("Please select an end time"),
  breakTimeInMins: yup.number().nullable(),
  isRepeated: yup.boolean(),
  address: yup.string(),
  apartmentNumber: yup.string(),
  isDropOffAddress: yup.boolean(),
  shiftType: yup.string(),
  recurrance: yup.string(),
  repeatNoOfDays: yup.number(),
  repeatNoOfWeeks: yup.number(),
  occursOnDays: yup.array().of(yup.string()),
  repeatNoOfMonths: yup.number(),
  occursOnDayOfMonth: yup.number(),
  endDate: yup.date(),
  dropOffAddress: yup.string(),
  dropOffApartmentNumber: yup.string(),
  tasks: yup.array().of(
    yup.object().shape({
      task: yup.string().required("Please enter a task"),
      isTaskMandatory: yup.boolean()
    })
  ),
  instruction: yup.string(),
  clientId: yup.number().nullable().required("Please Select a Paricipant"),
  employeeIds: yup.array().of(yup.number()).required("Please Select a Carer")
});

export default function AddShift({ ...props }: AddShiftProps) {
  const router = useRouter();
  const { id } = useParams();
  const { staff, client } = router.query;

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      startDate: dayjs(),
      isShiftEndsNextDay: false,
      startTime: dayjs().set("hour", 10).set("minute", 0),
      endTime: dayjs().set("hour", 11).set("minute", 0),
      breakTimeInMins: null,
      isRepeated: false,
      address: "",
      apartmentNumber: "",
      isDropOffAddress: false,
      shiftType: shiftTypeArray[0].id,
      recurrance: "Daily",
      repeatNoOfDays: "1",
      repeatNoOfWeeks: "1",
      occursOnDays: [dayjs().format("dddd").toUpperCase()],
      repeatNoOfMonths: "1",
      occursOnDayOfMonth: "1",
      endDate: dayjs().add(1, "day"),
      dropOffAddress: "",
      dropOffApartmentNumber: "",
      tasks: [],
      instruction: "",
      clientId: router.pathname.includes("participants")
        ? (id as string)
        : client
        ? (client as string)
        : null,
      employeeIds: router.pathname.includes("staff")
        ? [parseInt(id as string)]
        : staff
        ? [parseInt(staff as string)]
        : []
    }
  });

  useEffect(() => {
    if (client) {
      methods.setValue("clientId", client as string);
    }
    if (staff) {
      methods.setValue("employeeIds", [parseInt(staff as string)]);
    }
    if (props.selectedDate) {
      methods.setValue("startDate", dayjs(props.selectedDate?.toDate()));
    }
  }, [staff, client]);

  const { mutate, isPending } = useMutation({
    mutationFn: createShift,
    onSuccess: () => {
      methods.reset();
      props.onClose();
    }
  });

  const onSubmit = (data: ShiftBody) => {
    const newData = {
      ...data,
      startDate: dayjs(data.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(data.endDate).format("YYYY-MM-DD"),
      // shiftEndDate: data.isShiftEndsNextDay
      //   ? dayjs(data.startDate).add(1, "day").format("YYYY-MM-DD")
      //   : dayjs(data.startDate).format("YYYY-MM-DD"),
      breakTimeInMins: data.breakTimeInMins || 0,
      startTime: dayjs(data.startTime).format("HH:mm"),
      endTime: dayjs(data.endTime).format("HH:mm"),
      clientId: parseInt(data.clientId as string)
      // instruction: JSON.stringify(editor?.getJSON(), null, 2)
    };
    mutate(newData);
  };

  return (
    <StyledDrawer
      anchor="right"
      {...props}
      PaperProps={{
        className: "drawer"
      }}
      onClose={isPending ? undefined : props.onClose}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        className="header"
      >
        <Button
          variant="outlined"
          startIcon={<Iconify icon="mingcute:close-fill" />}
          onClick={props.onClose}
          disabled={isPending}
        >
          Close
        </Button>
        <LoadingButton
          variant="contained"
          startIcon={<Iconify icon="ic:baseline-save" />}
          onClick={methods.handleSubmit(onSubmit)}
          loading={isPending}
        >
          Save
        </LoadingButton>
      </Stack>
      <Divider />
      <Stack
        gap={2}
        className="main-container"
        sx={{
          height: "100%",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            display: "none"
          }
        }}
      >
        <FormProvider {...methods}>
          <ClientSection />
          <StaffSection />
          <TaskSection />
          <InstructionSection />
          <TimeAndLocation />
        </FormProvider>
      </Stack>
    </StyledDrawer>
  );
}
