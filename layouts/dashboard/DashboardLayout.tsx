import { useState } from "react";

import Box from "@mui/material/Box";

import Header from "./header/header";
import Main from "./main";
import Sidebar from "./sidebar/Sidebar";
import Loader from "@/ui/Loader/Loder";

// ----------------------------------------------------------------------

export default function DashboardLayout({
  children,
  isLoading = false
}: {
  children: React.ReactNode;
  isLoading?: boolean;
}) {
  const [openNav, setOpenNav] = useState(false);

  // useUser()

  if (isLoading) return <Loader />;

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />
      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" }
        }}
      >
        <Sidebar openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
}
