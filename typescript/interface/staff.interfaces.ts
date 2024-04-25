export interface IStaffPost {
  salutation: string;
  name: string;
  email: string;
  mobileNo: string;
  phoneNo: string;
  typeOfUser: string;
  role: number;
  roleIds?: number[];
  gender: string;
  dateOfBirth: string | null;
  employmentType: string;
  address: string;
}

export interface IStaff {
  id: number;
  salutation: string;
  name: string;
  email: string;
  mobileNo: string;
  phoneNo: string;
  typeOfUser: string;
  roleIds: number[];
  gender: string;
  dateOfBirth: string;
  employmentType: string;
  address: string;
  languagesSpoken: string[];
  teamName: string;
  company: string;
  verified: boolean;
  deleted: boolean;
}
