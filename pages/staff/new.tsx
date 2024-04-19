import { addStaff } from "@/api/functions/staff.api";
import { IStaffPost } from "@/interface/staff.interfaces";
import validationText from "@/json/messages/validationText";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import CustomInput from "@/ui/Inputs/CustomInput";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import EmailIcon from "@mui/icons-material/Email";
import InfoIcon from "@mui/icons-material/Info";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import {
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { SyntheticEvent, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

const StyledBox = styled(Box)`
  padding: 20px 10px;
  h2 {
    margin-bottom: 30px;
  }
  .inner-container {
    padding: 10px 20px;
    background-color: #fff;
    border-radius: 5px;
    .header {
      padding-bottom: 10px;
    }
    .footer {
      padding-block: 15px;
    }
    hr:first-of-type {
      margin-bottom: 20px;
    }
    hr:last-of-type {
      margin-top: 20px;
    }
    .date-picker {
      .MuiInputBase-root {
        flex-direction: row-reverse;
      }
    }

    .MuiInputBase-root {
      svg {
        color: #ccc;
      }
    }
  }
`;

const salutation_list = [
  "Mr",
  "Mrs",
  "Miss",
  "Ms",
  "Mx",
  "Doctor",
  "Them",
  "They"
];

const roles_list = [
  "Admin",
  "Coordinator",
  "HR",
  "OfficeSupport",
  "Ops",
  "Kiosk"
];

const gender_list = [
  "Male",
  "Female",
  "Intersex",
  "Non-binary",
  "Unspecified",
  "Prefer not to say"
];

const employment_list = ["Employee", "Contractor"];

const schema = yup.object().shape({
  salutation: yup.string(),
  name: yup.string().required(validationText.error.name),
  email: yup
    .string()
    .email(validationText.error.email_format)
    .trim()
    .required(validationText.error.enter_email),
  mobileNo: yup.string().trim().required(validationText.error.mobile),
  phoneNo: yup.string().trim().required(validationText.error.phone),
  typeOfUser: yup.string().trim().required(validationText.error.type_of_user),
  role: yup
    .string()
    .trim()
    .when("typeOfUser", {
      is: "Office_user",
      then: yup.string().trim().required(validationText.error.role)
    }),
  gender: yup.string().trim().required(validationText.error.gender),
  dateOfBirth: yup.date().required(validationText.error.dob),
  employmentType: yup
    .string()
    .trim()
    .required(validationText.error.employment_type),
  address: yup.string().trim().required(validationText.error.address)
});

export default function Index() {
  const [salutation, setSalutation] = useState(true);

  const methods = useForm<IStaffPost>({
    resolver: yupResolver(schema),
    defaultValues: {
      salutation: "",
      name: "",
      email: "",
      mobileNo: "",
      phoneNo: "",
      typeOfUser: "",
      role: "",
      gender: "",
      dateOfBirth: "",
      employmentType: "",
      address: ""
    }
  });

  const handleToggle = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null,
    onChange: (value: string) => void
  ) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: addStaff
  });

  const onSubmit = (data: IStaffPost) => {
    data.dateOfBirth = dayjs(data.dateOfBirth).format("DDMMYY");
    mutate(data);
  };

  return (
    <DashboardLayout>
      <StyledBox>
        <Typography variant="h2">Add New Staff</Typography>
        <Box className="inner-container">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className="header"
          >
            <Typography variant="h5">Staff detail</Typography>
            <FormControlLabel
              control={<Checkbox size="small" />}
              label={
                <Stack direction="row" alignItems="center" gap={1}>
                  <Typography variant="caption">No Access</Typography>
                  <Tooltip
                    placement="top-start"
                    title="User will not be able to access ShiftCare. This user will not be counted towards subscription limit either."
                  >
                    <InfoIcon fontSize="small" />
                  </Tooltip>
                </Stack>
              }
            />
          </Stack>
          <Divider />
          <FormProvider {...methods}>
            <Grid container spacing={2}>
              <Grid item lg={3}>
                <Typography variant="body1">Name:</Typography>
              </Grid>
              <Grid item lg={9}>
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Use Salutation"
                  checked={salutation}
                  onChange={(e: SyntheticEvent<Element, Event>, checked) => {
                    setSalutation(checked);
                    methods.setValue("salutation", "");
                  }}
                />
                <Grid container spacing={2}>
                  <Grid item lg={2}>
                    <Controller
                      control={methods.control}
                      name="salutation"
                      render={({
                        field: { value, onChange },
                        fieldState: { invalid, error }
                      }) => (
                        <Box>
                          <Select
                            fullWidth
                            displayEmpty
                            renderValue={
                              value !== ""
                                ? undefined
                                : () => "Select Salutation"
                            }
                            value={value}
                            onChange={onChange}
                            disabled={!salutation}
                            defaultValue={salutation ? salutation_list[0] : ""}
                          >
                            {salutation_list.map((_salutation) => (
                              <MenuItem value={_salutation} key={_salutation}>
                                {_salutation}
                              </MenuItem>
                            ))}
                          </Select>
                          {invalid && (
                            <FormHelperText sx={{ color: "#FF5630" }}>
                              {error?.message}
                            </FormHelperText>
                          )}
                        </Box>
                      )}
                    />
                  </Grid>
                  <Grid item lg={10}>
                    <CustomInput
                      fullWidth
                      name="name"
                      placeholder="Enter Name"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3}>
                <Typography variant="body1">Email:</Typography>
              </Grid>
              <Grid item lg={9}>
                <CustomInput
                  fullWidth
                  name="email"
                  placeholder="Enter Email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item lg={3}>
                <Typography variant="body1">Contact:</Typography>
              </Grid>
              <Grid item lg={9}>
                <Grid container spacing={2}>
                  <Grid item lg={6}>
                    <CustomInput
                      fullWidth
                      name="phoneNo"
                      type="number"
                      placeholder="Enter Mobile Number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIphoneIcon fontSize="small" />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <CustomInput
                      fullWidth
                      name="mobileNo"
                      type="number"
                      placeholder="Enter Phone Number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon fontSize="small" />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <Controller
                      control={methods.control}
                      name="typeOfUser"
                      render={({
                        field: { value, onChange },
                        fieldState: { error, invalid }
                      }) => (
                        <>
                          <ToggleButtonGroup
                            value={value}
                            exclusive
                            onChange={(e, newValue) =>
                              handleToggle(e, newValue, onChange)
                            }
                          >
                            <ToggleButton value="carer">
                              <Typography variant="body1">Carer</Typography>
                            </ToggleButton>
                            <ToggleButton value="Office_user">
                              <Typography variant="body1">
                                Office User
                              </Typography>
                            </ToggleButton>
                          </ToggleButtonGroup>
                          {invalid && (
                            <FormHelperText sx={{ color: "#FF5630" }}>
                              {error?.message}
                            </FormHelperText>
                          )}
                        </>
                      )}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    {methods.watch("typeOfUser") === "Office_user" && (
                      <Stack direction="row" alignItems="center" spacing={3}>
                        <Typography variant="body1">Role:</Typography>
                        <Controller
                          control={methods.control}
                          name="role"
                          render={({
                            field: { value, onChange },
                            fieldState: { error, invalid }
                          }) => (
                            <Box>
                              <Select
                                sx={{ width: "200px" }}
                                displayEmpty
                                renderValue={
                                  value !== "" ? undefined : () => "Select Role"
                                }
                                value={value}
                                onChange={onChange}
                                defaultValue={""}
                              >
                                {roles_list.map((_salutation) => (
                                  <MenuItem
                                    value={_salutation}
                                    key={_salutation}
                                  >
                                    {_salutation}
                                  </MenuItem>
                                ))}
                              </Select>

                              {invalid && (
                                <FormHelperText sx={{ color: "#FF5630" }}>
                                  {error?.message}
                                </FormHelperText>
                              )}
                            </Box>
                          )}
                        />
                      </Stack>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={6}>
                <Grid container>
                  <Grid item lg={6.15}>
                    <Typography>Gender:</Typography>
                  </Grid>
                  <Grid item lg={5.85}>
                    <Controller
                      control={methods.control}
                      name="gender"
                      render={({
                        field: { value, onChange },
                        fieldState: { error, invalid }
                      }) => (
                        <Box>
                          <Select
                            fullWidth
                            displayEmpty
                            renderValue={
                              value !== "" ? undefined : () => "Select Gender"
                            }
                            value={value}
                            onChange={onChange}
                            defaultValue={""}
                          >
                            {gender_list.map((_salutation) => (
                              <MenuItem value={_salutation} key={_salutation}>
                                {_salutation}
                              </MenuItem>
                            ))}
                          </Select>
                          {invalid && (
                            <FormHelperText sx={{ color: "#FF5630" }}>
                              {error?.message}
                            </FormHelperText>
                          )}
                        </Box>
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={6}>
                <Grid container>
                  <Grid
                    item
                    lg={3}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography>Date of Birth:</Typography>
                  </Grid>
                  <Grid item lg={9}>
                    <Controller
                      control={methods.control}
                      name="dateOfBirth"
                      render={({
                        field: { value, onChange },
                        fieldState: { error, invalid }
                      }) => (
                        <Box>
                          <DatePicker
                            sx={{ width: "100%" }}
                            className="date-picker"
                            value={value}
                            onChange={onChange}
                            maxDate={dayjs()
                              .subtract(18, "years")
                              .toISOString()}
                          />
                          {invalid && (
                            <FormHelperText sx={{ color: "#FF5630" }}>
                              {error?.message}
                            </FormHelperText>
                          )}
                        </Box>
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={3}>
                <Typography variant="body1">Employment Type:</Typography>
              </Grid>
              <Grid item lg={9}>
                <Controller
                  control={methods.control}
                  name="employmentType"
                  render={({
                    field: { value, onChange },
                    fieldState: { error, invalid }
                  }) => (
                    <Box>
                      <Select
                        fullWidth
                        displayEmpty
                        renderValue={
                          value !== ""
                            ? undefined
                            : () => "Select Employment Type"
                        }
                        value={value}
                        onChange={onChange}
                        defaultValue={""}
                      >
                        {employment_list.map((_salutation) => (
                          <MenuItem value={_salutation} key={_salutation}>
                            {_salutation}
                          </MenuItem>
                        ))}
                      </Select>
                      {invalid && (
                        <FormHelperText sx={{ color: "#FF5630" }}>
                          {error?.message}
                        </FormHelperText>
                      )}
                    </Box>
                  )}
                />
              </Grid>
              <Grid item lg={3}>
                <Typography variant="body1">Address:</Typography>
              </Grid>
              <Grid item lg={9}>
                <CustomInput
                  fullWidth
                  name="address"
                  placeholder="Enter Address"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </FormProvider>
          <Divider />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            className="footer"
            spacing={2}
          >
            <Button variant="outlined" disabled={isPending}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={methods.handleSubmit(onSubmit)}
              disabled={isPending}
            >
              Create
              {isPending && (
                <CircularProgress color="inherit" sx={{ marginLeft: "5px" }} />
              )}
            </Button>
          </Stack>
        </Box>
      </StyledBox>
    </DashboardLayout>
  );
}
