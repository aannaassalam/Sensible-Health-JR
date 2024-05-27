import AppWidgetSummaryCard from "@/components/cards/AppWidgetSummaryCard";
import { customSeriesFill } from "@/components/chart/chart";

import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import { Container, Grid, Typography } from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";

import dynamic from "next/dynamic";
import moment from "moment";
import { Box } from "@mui/system";
import { getAllShifts } from "@/api/functions/shift.api";

export const getServerSideProps = async () => {
  const data = await getAllShifts();

  return {
    props: {
      shifts: data
    }
  };
};

export default function Home({ shifts }) {
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
            style={{ flex: 1 }}
          />
        </Box>
      </Container>
    </DashboardLayout>
  );
}
