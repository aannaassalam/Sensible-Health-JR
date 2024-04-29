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
    change_password: "/auth/change-password"
  },
  cms: {
    about: "/aboutpolicy/details",
    faq: "/faq/all"
  },
  staff: {
    new: "/user/add",
    list: "/user/employees/by-company/active",
    getStaff: "/user",
    update_profile_photo: "/user/photo",
    get_staff_settings: "/employeeSettings/employees",
    staff_note: "/",
    staff_compliance: "/"
  },
  user: {
    profile: "/user/profile",
    profile_photo: "/user/profile/photo",
    update: "/user/profile/update"
  },
  roles: {
    all: "/roles/all"
  }
};

export const sucessNotificationEndPoints = [
  endpoints.auth.signup,
  endpoints.auth.login,
  endpoints.auth.set_password,
  endpoints.auth.forgot_password,
  endpoints.auth.reset_password,
  endpoints.auth.change_password,
  endpoints.user.profile_photo,
  endpoints.user.update,
  endpoints.staff.new,
  endpoints.staff.update_profile_photo
];
