import { forwardRef } from "react";
import { Icon } from "@iconify/react";

import Box from "@mui/material/Box";
import { BoxProps } from "@mui/system";

// ----------------------------------------------------------------------

interface BigBoxProps extends BoxProps {
  icon: string;
}

const Iconify = forwardRef(
  ({ icon, width = 20, sx, ...other }: BigBoxProps, ref) => (
    <Box
      ref={ref}
      component={Icon}
      className="component-iconify"
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  )
);

Iconify.displayName = "Iconify";

export default Iconify;
