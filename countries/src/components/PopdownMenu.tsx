import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const PopdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={"a"} href={"/"} onClick={handleMenuClose}>
            <Typography textAlign="center">{"🏁 Flaggquiz"}</Typography>
          </MenuItem>
          <MenuItem component={"a"} href={"/daily"} onClick={handleMenuClose}>
            <Typography textAlign="center">{"📆 Daglig"}</Typography>
          </MenuItem>
          <MenuItem component={"a"} href={"/write"} onClick={handleMenuClose}>
            <Typography textAlign="center">{"✍ Skrivläge"}</Typography>
          </MenuItem>
          <MenuItem component={"a"} href={"/countries"} onClick={handleMenuClose}>
            <Typography textAlign="center">{"🌍 Länder & regioner"}</Typography>
          </MenuItem>
          <MenuItem component={"a"} href={"/about"} onClick={handleMenuClose}>
            <Typography textAlign="center">{"🧾 Om flaggquiz"}</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default PopdownMenu;
