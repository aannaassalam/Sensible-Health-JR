import { Shift } from "@/interface/shift.api";
import { Box } from "@mui/system";
import moment from "moment";
import { useMemo, useState } from "react";
import TimeSheetTable from "./TimeSheetTable";
import Toolbar from "./Toolbar";

export default function Timesheet({ shifts }: { shifts: Shift[] }) {
  const [date, setDate] = useState(moment());
  const week = useMemo(
    () => [moment(date).startOf("isoWeek"), moment(date).endOf("isoWeek")],
    [date]
  );
  const [type, setType] = useState("weekly");

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
      />
      <TimeSheetTable day={week[0]} type={type} shifts={shifts} />
    </Box>
  );
}
