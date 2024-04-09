import { IgetSignUpQuery } from "@/interface/apiresp.interfaces";
import { userData } from "@/types/common.type";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export interface loginMutationPayload {
  email: string;
  password: string;
}

export const GetProfileDetails = async () => {
  return {
    status: 0,
    data: { data: {} as userData }
  };
};

export const loginMutation = async (body: loginMutationPayload) => {
  const res = await axiosInstance.post<IgetSignUpQuery>(
    endpoints.auth.login,
    body
  );
  return res;
};
