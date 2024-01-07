import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Link,
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
          <MenuItem onClick={handleMenuClose}>
            <Link href="/" color="inherit">
              Flaggquiz
            </Link>
          </MenuItem>
           <MenuItem onClick={handleMenuClose}>
            <Link href="/daily" color="inherit">
             Daglig 
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link href="/write" color="inherit">
              Flaggquiz (skrivläge)
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link href="/countries" color="inherit">
              Länder & regioner
            </Link>
          </MenuItem> 
          <MenuItem onClick={handleMenuClose}>
            <Link href="/about" color="inherit">
              Om flaggquiz
            </Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default PopdownMenu;
