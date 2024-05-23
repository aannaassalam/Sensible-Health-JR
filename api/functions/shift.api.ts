import { ShiftType } from "@/interface/shift.api";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const createShift = async (body: ShiftType) => {
  const res = await axiosInstance.post(endpoints.shift.create_shift, body);
  return res.data;
};
