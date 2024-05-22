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
    last_signin: (id: string) => `/auth/${id}/last-signin`,
    resend_invite: "/auth/verification-link"
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
    staff_compliance: (id: string) =>
      `/document/employees/${id}/documents/by-category/3`,
    delete_staff: "/user/soft",
    get_note: "/user/get-notes",
    update_notes: (id: string) => `/user/${id}/notes`,
    update_staff: "/user/editEmployee",
    update_settings: "/employeeSettings/employees",
    get_archieved_staffs: "/user/employees/by-company/soft-deleted",
    unarchive_staff: "/user/unarchived",
    get_all_documents: "/document/all",
    upload_documents: "/document/upload",
    edit_document: "/document/updateDocument",
    delete_document: "/document"
  },
  client: {
    get_all: "/client/by-company/active",
    get_archieved_clients: "/client/by-company/inactive",
    add_client: "/client/add",
    delete_client: "/client/softDelete",
    unarchive_client: "/client/unarchived",
    get_client: (id: string) => `/client/${id}`,
    get_client_settngs: (id: string) => `/clientSettings/client/${id}`,
    get_client_funds: (id: string) => `/funds/client/${id}`,
    get_client_documents: (id: string) => `/document/client/${id}`,
    get_client_additional_information: (id: string) =>
      `/client/${id}/additionalInformation`,
    get_client_contacts: (id: string) =>
      `/client/${id}/getAll/additional-contacts`,
    add_client_contacts: (id: string) => `/client/${id}/additional-contacts`,
    update_profile_pic: (id: string) => `/client/photo/${id}`,
    update_profile: (id: string) => `/client/editClient/${id}`,
    update_settings: (id: string) => `/clientSettings/update/${id}`,
    update_additional_information: (id: string) =>
      `/client/${id}/additionalInformation`,
    update_client_contact: (id: string) => `/client/${id}/additional-contacts`,
    delete_client_contact: (id: string, contact_id: number) =>
      `/client/${id}/additional-contacts/${contact_id}`
  },
  teams: {
    get_all: "/teams/allTeams",
    create_team: "/teams/create",
    get_team: "/teams",
    edit_team: "/teams",
    delete_team: "/teams"
  },
  user: {
    profile: "/user/profile",
    profile_photo: "/user/profile/photo",
    update: "/user/profile/update"
  },
  roles: {
    all: "/roles/all"
  },
  funds: {
    add_fund: (id: string) => `/funds/add/${id}`
  },
  settings: {
    pricebook: {
      get_pricebooks: "/priceBook/getAll/priceBook",
      get_all_pricebooks: "/priceBook/listAll/priceBook",
      add_pricebook: "/priceBook/add",
      edit_pricebook: (id: number) => `/priceBook/${id}`,
      delte_pricebook: (id: number) => `/priceBook/softDelete/${id}`,
      copy_pricebook: (id: number) => `/priceBook/copy/${id}`
    },
    prices: {
      update_prices: (id: number) => `/prices/update/${id}`
    },
    pay_groups: {
      add_paygroup: "/payGroup/add",
      update_paygroup: (id: number) => `/payGroup/update/${id}`,
      delete_paygroup: (id: number) => `/payGroup/softDelete/${id}`,
      get_all_paygroup: "/payGroup/getAll/payGroup"
    },
    price_items: {
      update_price_items: (id: number) => `/payItems/update/${id}`
    }
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
  endpoints.staff.update_profile_photo,
  endpoints.staff.update_staff,
  endpoints.auth.resend_invite,
  endpoints.staff.upload_documents,
  endpoints.staff.delete_document,
  endpoints.staff.edit_document,
  endpoints.teams.create_team,
  endpoints.teams.delete_team,
  endpoints.teams.edit_team,
  endpoints.client.add_client,
  endpoints.settings.pricebook.add_pricebook
];
