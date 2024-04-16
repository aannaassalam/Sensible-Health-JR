import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import { useState } from "react";

import {
  signupMutation,
  signupMutationPayload
} from "@/api/functions/user.api";
import Logo from "@/components/logo/logo";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import validationText from "@/json/messages/validationText";
import { setCookieClient } from "@/lib/functions/storage.lib";
import { bgGradient } from "@/themes/css";
import CustomInput from "@/ui/Inputs/CustomInput";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import { alpha, useTheme } from "@mui/material/styles";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
// ----------------------------------------------------------------------

const StyledSignUpPage = styled(Box)`
  min-height: 100vh;
  padding-top: 80px;
  padding-bottom: 40px;

  h6 {
    margin-bottom: 40px;
    a {
      color: inherit;
    }
  }

  .MuiToggleButton-root {
    letter-spacing: normal;
    &.Mui-selected {
      svg {
        color: #3b719f;
      }
    }
  }

  .more-info {
    font-size: 14px;
    margin-top: 15px;
    margin-bottom: 20px;
    .MuiTypography-root {
      font-size: inherit;
    }

    a {
      text-decoration: none;
    }
  }

  .MuiButton-root {
    letter-spacing: normal;
  }
`;

const schema = yup.object().shape({
  name: yup.string().trim().required(validationText.error.fullName),
  company: yup.string().trim().required(validationText.error.company_name),
  email: yup
    .string()
    .trim()
    .email(validationText.error.email_format)
    .required(validationText.error.enter_email),
  password: yup.string().trim().required(validationText.error.enter_password)
  // role: yup.string().required(validationText.error.role),
  // manager_email: yup.string().when("role", {
  //   is: "employee",
  //   then: yup
  //     .string()
  //     .trim()
  //     .email(validationText.error.email_format)
  //     .required(validationText.error.enter_email)
  // })
});

export default function LoginView() {
  const { isLoggedIn } = useAppSelector((s) => s.userSlice);

  const router = useRouter();

  const { handleSubmit, watch, control } = useForm({
    resolver: yupResolver(schema),
    // mode: "all",
    defaultValues: {
      email: "",
      password: "",
      name: "",
      company: ""
      // role: "business",
      // manager_email: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signupMutation,
    onSuccess: (data: any) => {
      setCookieClient("token", data.jwtToken);
      delete data.jwtToken;
      setCookieClient("üser", JSON.stringify(data));
      router.push("/");
    }
  });

  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (data: signupMutationPayload) => {
    // setCookieClient(process.env.NEXT_APP_TOKEN_NAME!!, "test@1234");
    // dispatch(setAccessToken("test@1234"));
    mutate(data);
    // mutate(
    //   { ...data },
    //   {
    //     onSuccess: (res) => {
    //       if (res?.status === "success") {
    //         if (res?.data) {
    //           toast.success(messages.success.loginsuccess(res?.data?.name));
    //           //   dispatch(setAccessToken(access));
    //           //   dispatch(setUserData(userData));
    //           router.push("/dashboard/branch");
    //         }
    //       }
    //     }
    //   }
    // );
  };

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     router.push("/dashboard");
  //   }
  // }, [isLoggedIn]);

  return (
    <StyledSignUpPage
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.4),
          imgUrl: "/assets/background/overlay-4.jpg"
        })
      }}
    >
      <Logo
        sx={{
          position: "fixed",
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 }
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Typography variant="h2">Create a new account</Typography>
        <Typography variant="h6">
          Or <Link href="/auth/signin">sign in to your account</Link>
        </Typography>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420
          }}
        >
          <Box component="form" onSubmit={handleSubmit(handleSignup)}>
            <Stack spacing={3}>
              <Controller
                control={control}
                name="name"
                render={({
                  field: { value, onChange },
                  fieldState: { invalid, error }
                }) => (
                  <CustomInput
                    label="Full name"
                    placeholder="Enter your full name"
                    size="small"
                    type="text"
                    value={value}
                    onChange={onChange}
                    error={invalid}
                    helperText={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({
                  field: { value, onChange },
                  fieldState: { invalid, error }
                }) => (
                  <CustomInput
                    label="Email Address"
                    placeholder="Enter you email address"
                    type="email"
                    size="small"
                    value={value}
                    onChange={onChange}
                    error={invalid}
                    helperText={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="company"
                render={({
                  field: { value, onChange },
                  fieldState: { invalid, error }
                }) => (
                  <CustomInput
                    label="Company Name"
                    type="text"
                    placeholder="Enter your company name"
                    size="small"
                    value={value}
                    onChange={onChange}
                    error={invalid}
                    helperText={error?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { invalid, error }
                }) => (
                  <CustomInput
                    label="Password"
                    size="small"
                    placeholder="********"
                    value={value}
                    onChange={onChange}
                    error={invalid}
                    helperText={error?.message}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffIcon fontSize="small" />
                            ) : (
                              <RemoveRedEyeIcon fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
              {/* <Controller
                control={control}
                name="role"
                render={({
                  field: { value, onChange },
                  fieldState: { error, invalid }
                }) => (
                  <>
                    <FormLabel>Choose your Account Type</FormLabel>
                    <ToggleButtonGroup
                      value={value}
                      exclusive
                      onChange={(_, newAlignment) => {
                        if (newAlignment !== null) {
                          onChange(newAlignment);
                        }
                      }}
                    >
                      <ToggleButton value="business">
                        <BusinessCenterIcon
                          fontSize="small"
                          sx={{ marginRight: "5px" }}
                        />
                        <Typography>Business</Typography>
                      </ToggleButton>
                      <ToggleButton value="employee">
                        <PersonIcon
                          fontSize="small"
                          sx={{ marginRight: "5px" }}
                        />
                        <Typography>Employee</Typography>
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
              {watch("role") === "employee" && (
                <Controller
                  control={control}
                  name="manager_email"
                  render={({
                    field: { value, onChange },
                    fieldState: { invalid, error }
                  }) => (
                    <CustomInput
                      label="Manager Email"
                      placeholder="Enter your manager email"
                      type="email"
                      size="small"
                      value={value}
                      onChange={onChange}
                      error={invalid}
                      helperText={error?.message}
                    />
                  )}
                />
              )} */}

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                loading={isPending}
              >
                Sign Up
              </LoadingButton>
            </Stack>
          </Box>
        </Card>
      </Stack>
    </StyledSignUpPage>
  );
}
