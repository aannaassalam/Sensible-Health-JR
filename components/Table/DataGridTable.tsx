import Scrollbar from "@/ui/scrollbar";
import { Box } from "@mui/material";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { useRef } from "react";

export default function DataGridTable(props: DataGridProps) {
  const ref = useRef();

  return (
    <Scrollbar>
      <Box style={{ height: "65vh", width: "100%" }} ref={ref}>
        <DataGrid {...props} />
      </Box>
    </Scrollbar>
  );
}
