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
