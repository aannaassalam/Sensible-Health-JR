import { useState } from "react";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Label from "@/ui/label/label";
import Iconify from "@/components/Iconify/Iconify";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------

export default function StaffTableRow({
  id,
  name,
  gender,
  role,
  email,
  mobileNo,
  address,
  employmentType,
  selected,
  handleClick
}: {
  id: number;
  name: string;
  gender: string;
  role: string;
  email: string;
  mobileNo: string;
  address: string;
  employmentType: string;
  selected: boolean;
  handleClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const router = useRouter();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = (
    event: React.MouseEvent<HTMLElement>,
    path?: string
  ) => {
    if (path) {
      router.push(path);
    }
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={name} src={avatarUrl} /> */}
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{gender}</TableCell>

        <TableCell>{role}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{mobileNo}</TableCell>
        <TableCell>{address}</TableCell>
        <TableCell>{employmentType}</TableCell>

        {/* <TableCell align="center">{isVerified ? "Yes" : "No"}</TableCell>

        <TableCell>
          <Label color={(status === "banned" && "error") || "success"}>
            {status}
          </Label>
        </TableCell> */}

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { width: 140 }
        }}
      >
        <MenuItem onClick={(e) => handleCloseMenu(e, `/staff/${id}/view`)}>
          <Iconify icon="eva:file-text-outline" sx={{ mr: 2 }} />
          View
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
