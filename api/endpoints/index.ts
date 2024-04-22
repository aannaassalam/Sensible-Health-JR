export const baseUrl = process.env.NEXT_APP_BASE_URL;
export const baseUrlApi = `${process.env.NEXT_APP_BASE_URL}/api`;
export const baseUrlMedia = process.env.NEXT_APP_BASE_URL;

// api doc => https://militarymoves-admin.dedicateddevelopers.us/apidoc

export const mediaUrl = (url: string) => {
  return `${baseUrlMedia}/uploads/${url}`;
};

export const endpoints = {
  auth: {
    signup: "/auth/register",
    login: "/auth/signin",
    set_password: "/auth/set-password",
    forgot_password: "/auth/forgot-password",
    reset_password: "/auth/reset-password",
    change_password: "/auth/change-password",
    profile: "/user/profile"
  },
  cms: {
    about: "/aboutpolicy/details",
    faq: "/faq/all"
  },
  staff: {
    new: "/user"
  }
};

export const sucessNotificationEndPoints = [
  endpoints.auth.signup,
  endpoints.auth.login,
  endpoints.auth.set_password,
  endpoints.auth.forgot_password,
  endpoints.auth.reset_password,
  endpoints.auth.change_password
];
