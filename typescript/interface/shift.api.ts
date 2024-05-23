import { Dayjs } from "dayjs";

export interface Task {
  taskId?: number;
  task: string;
  isTaskMandatory: boolean;
}

export interface ShiftBody {
  startDate: Dayjs;
  isShiftEndsNextDay: boolean;
  startTime: Dayjs;
  endTime: Dayjs;
  breakTimeInMins: number | null;
  shiftEndDate?: Dayjs;
  isRepeated: boolean;
  address: string;
  apartmentNumber: string;
  shiftType: string;
  recurrance: string;
  repeatNoOfDays: number | string;
  repeatNoOfWeeks: number | string;
  occursOnDays: string[];
  repeatNoOfMonths: number | string;
  occursOnDayOfMonth: number | string;
  endDate: Dayjs;
  isDropOffAddress: boolean;
  dropOffAddress: string;
  dropOffApartmentNumber: string;
  tasks: Task[];
  instruction: string;
  clientId: number | string | null;
  employeeId?: number | string | null;
  employeeIds?: number[];
}

export interface ShiftType {
  id?: number;
  startDate: string;
  isShiftEndsNextDay: boolean;
  startTime: string;
  endTime: string;
  breakTimeInMins: number;
  shiftEndDate: string;
  isRepeated: boolean;
  address: string;
  apartmentNumber: string;
  shiftType: string;
  recurrance: string;
  repeatNoOfDays: number | string;
  repeatNoOfWeeks: number | string;
  occursOnDays: string[];
  repeatNoOfMonths: number | string;
  occursOnDayOfMonth: number | string;
  endDate: string;
  isDropOffAddress: boolean;
  dropOffAddress: string;
  dropOffApartmentNumber: string;
  tasks: Task[];
  instruction: string;
  clientId: number;
  employeeIds: number[];
}
