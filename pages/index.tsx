import AppWidgetSummaryCard from "@/components/cards/AppWidgetSummaryCard";
import { customSeriesFill } from "@/components/chart/chart";

import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import { Container, Grid, Typography } from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";

import dynamic from "next/dynamic";
import moment from "moment";
import { Box } from "@mui/system";
import { getAllShifts } from "@/api/functions/shift.api";
import { GetServerSidePropsContext } from "next";
import { Shift } from "@/interface/shift.api";

export const getServerSideProps = async ({
  req
}: GetServerSidePropsContext) => {
  const cookie = req.cookies;
  const data = await getAllShifts(cookie?.token);

  return {
    props: {
      shifts: data
    }
  };
};

export default function Home({ shifts }: { shifts: Shift[] }) {
  const localizer = momentLocalizer(moment);
  console.log(shifts);
  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box
          sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
          <Calendar
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            events={shifts.map((_shift) => ({
              start: moment(_shift.startDate)
                .add(_shift.startTime[0], "hours")
                .add(_shift.startTime[1], "minutes")
                .toDate(),
              end: moment(_shift.shiftEndDate)
                .add(_shift.endTime[0], "hours")
                .add(_shift.endTime[1], "minutes")
                .toDate(),
              title: _shift.employee.displayName
            }))}
            style={{ flex: 1 }}
          />
        </Box>
      </Container>
    </DashboardLayout>
  );
}
