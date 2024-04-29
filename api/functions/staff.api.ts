import { IStaffPost } from "@/interface/staff.interfaces";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const addStaff = async (body: IStaffPost) => {
  const res = await axiosInstance.post(endpoints.staff.new, body);
  return res.data;
};

export const getStaffList = async () => {
  const res = await axiosInstance.get(endpoints.staff.list);
  return res.data;
};

export const getStaff = async (id: string) => {
  const res = await axiosInstance.get(`${endpoints.staff.getStaff}/${id}`);
  return res.data;
};

export const updateProfilePhoto = async (body: {
  file: FormData;
  user: string;
}) => {
  const res = await axiosInstance.post(
    `${endpoints.staff.update_profile_photo}/${body.user}`,
    body.file
  );
  return res.data;
};

export const getStaffSettings = async (id: string) => {
  const res = await axiosInstance.get(
    `${endpoints.staff.get_staff_settings}/${id}`
  );
  return res.data;
};

export const getStaffNotes = async (id: string) => {
  const res = await axiosInstance.get(`${endpoints.staff.staff_note}/${id}`);
  return res.data;
};

export const getStaffCompliance = async (id: string) => {
  const res = await axiosInstance.get(
    `${endpoints.staff.staff_compliance}/${id}`
  );
  return res.data;
};
