import { ShiftType } from "@/interface/shift.api";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const createShift = async (body: ShiftType) => {
  const res = await axiosInstance.post(endpoints.shift.create_shift, body);
  return res.data;
};

export const editShift = async (body: ShiftType) => {
  const res = await axiosInstance.put(
    endpoints.shift.edit_shift(body.id),
    body
  );
  return res.data;
};

export const cancelShift = async (id: number) => {
  const res = await axiosInstance.put(endpoints.shift.cancel_shift(id));
  return res.data;
};

export const getAllShifts = async ({
  token,
  startDate = "",
  endDate = ""
}: {
  token?: string;
  startDate?: string;
  endDate?: string;
}) => {
  const res = await axiosInstance.get(endpoints.shift.get_all_shifts, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`
        }
      : {},
    params: {
      startDate,
      endDate
    }
  });
  return res.data;
};
