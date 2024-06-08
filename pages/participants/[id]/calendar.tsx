import { getAllShiftsForClient } from "@/api/functions/shift.api";
import CalendarComponent from "@/components/calendarComponent/calendarComponent";
import CalendarToolbar from "@/components/calendarComponent/calendarToolbar";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function Calendar() {
  const [date, setDate] = useState(moment());
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: [
      "get_shifts_for_client",
      date.startOf("month").format("X"),
      date.endOf("month").format("X")
    ],
    queryFn: () =>
      getAllShiftsForClient({
        id: id as string,
        startDate: date.startOf("month").format("X"),
        endDate: date.endOf("month").format("X")
      })
  });

  return (
    <DashboardLayout isLoading={isLoading}>
      <CalendarToolbar date={date} setDate={setDate} />
      <CalendarComponent date={date} shifts={data} />
    </DashboardLayout>
  );
}
