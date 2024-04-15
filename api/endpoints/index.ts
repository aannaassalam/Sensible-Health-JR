export const baseUrl = process.env.NEXT_APP_BASE_URL;
export const baseUrlApi = `${process.env.NEXT_APP_BASE_URL}/api`;
export const baseUrlMedia = process.env.NEXT_APP_BASE_URL;

// api doc => https://militarymoves-admin.dedicateddevelopers.us/apidoc

export const mediaUrl = (url: string) => {
  return `${baseUrlMedia}/uploads/${url}`;
};

export const endpoints = {
  auth: {
    signup: "/auth/signup",
    login: "/auth/signin"
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
  endpoints.auth.login
];
