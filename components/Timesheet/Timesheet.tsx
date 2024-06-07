import { Shift } from "@/interface/shift.interface";
import { Box } from "@mui/system";
import moment from "moment";
import { useMemo, useState } from "react";
import TimeSheetTable from "./TimeSheetTable";
import Toolbar from "./Toolbar";
import { useQuery } from "@tanstack/react-query";
import { getAllShifts } from "@/api/functions/shift.api";

export default function Timesheet({ shifts }: { shifts: Shift[] }) {
  const [date, setDate] = useState(moment());
  const week = useMemo(
    () => [moment(date).startOf("isoWeek"), moment(date).endOf("isoWeek")],
    [date]
  );
  const [type, setType] = useState("weekly");
  const [view, setView] = useState("staff");

  const { data } = useQuery({
    queryKey: ["all_shifts", week[0], week[1], type, date],
    queryFn: () =>
      getAllShifts(
        type === "weekly"
          ? {
              startDate: week[0].format("X"),
              endDate: week[1].format("X")
            }
          : {
              startDate: date.startOf("day").format("X"),
              endDate: date.endOf("day").format("X")
            }
      ),
    initialData: shifts
  });

  // const shiftsByCarer = useMemo(() => {
  //   const _shifts: {
  //     [key: number]: Shift[];
  //   } = {};
  //   shifts.forEach((_shift) => {
  //     _shifts[_shift.employee.id] = [
  //       ...(_shifts[_shift.employee.id] || []),
  //       _shift
  //     ];
  //   });
  //   return _shifts;
  // }, shifts);

  return (
    <Box>
      <Toolbar
        week={week}
        setDate={setDate}
        date={date}
        type={type}
        setType={setType}
        view={view}
        setView={setView}
      />
      <TimeSheetTable
        day={type === "daily" ? date : week[0]}
        type={type}
        shifts={data}
        view={view}
      />
    </Box>
  );
}
