import { ShiftType } from "@/interface/shift.api";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const createShift = async (body: ShiftType) => {
  const res = await axiosInstance.post(endpoints.shift.create_shift, body);
  return res.data;
};

export const getAllShifts = async (token?: string) => {
  const res = await axiosInstance.get(endpoints.shift.get_all_shifts, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`
        }
      : {}
  });
  return res.data;
};
