/* eslint-disable react/display-name */
import { forwardRef, memo } from "react";

import Box from "@mui/material/Box";
import { Theme, alpha, styled } from "@mui/material/styles";
import { BoxProps } from "@mui/system";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

// ----------------------------------------------------------------------

export const StyledRootScrollbar = styled("div")(() => ({
  flexGrow: 1,
  height: "100%",
  overflow: "hidden"
}));

export const StyledScrollbar = styled(SimpleBar)(
  ({ theme }: { theme: Theme }) => ({
    maxHeight: "100%",
    "& .simplebar-scrollbar": {
      "&:before": {
        backgroundColor: alpha(theme.palette.grey[600], 0.48)
      },
      "&.simplebar-visible:before": {
        opacity: 1
      }
    },
    "& .simplebar-mask": {
      zIndex: "inherit"
    }
  })
);

// ----------------------------------------------------------------------

interface ScrollbarProps extends BoxProps {}

const Scrollbar = forwardRef<HTMLDivElement, Omit<ScrollbarProps, "color">>(
  ({ children, sx, ...other }, ref) => {
    const userAgent =
      typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

    const mobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );

    if (mobile) {
      return (
        <Box ref={ref} sx={{ overflow: "auto", ...sx }} {...other}>
          {children}
        </Box>
      );
    }

    return (
      <StyledRootScrollbar>
        <StyledScrollbar
          scrollableNodeProps={{
            ref
          }}
          clickOnTrack={false}
          sx={sx}
          {...other}
        >
          {children}
        </StyledScrollbar>
      </StyledRootScrollbar>
    );
  }
);

export default memo(Scrollbar);
