import { userData } from "@/types/common.type";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export interface loginMutationPayload {
  email: string;
  password: string;
}

export interface signupMutationPayload {
  email: string;
  password: string;
  company: string;
  // role: string;
  // manager_email: string;
  name: string;
}

export const GetProfileDetails = async () => {
  return {
    status: 0,
    data: { data: {} as userData }
  };
};

export const loginMutation = async (body: loginMutationPayload) => {
  const res = await axiosInstance.post(endpoints.auth.login, body);
  return res.data;
};

export const signupMutation = async (body: signupMutationPayload) => {
  const res = await axiosInstance.post(endpoints.auth.signup, body);
  return res.data;
};
