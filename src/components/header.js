import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Home from "../assets/images/favicon.png";
import "./header.css";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const Navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (menuItem) => {
    if (menuItem === "my_top_picks") {
      Navigate("/selecttopfood");
    } else if (menuItem === "my_taste_palette") {
      Navigate("/tastepalette");
    } else {
      console.log("LOGOUT NOT DONE");
    }
    setAnchorElUser(null);
  };

  const handleIconClick = () => {};

  return (
    <AppBar>
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <div className="wml-icon" onClick={handleIconClick}>
            <Avatar
              sx={{
                objectFit: "fill",
                width: 30,
                height: 30,
                padding: "4px",
              }}
              alt="Icon"
              src={Home}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              WML
            </Typography>
          </div>
          <Box sx={{ flexGrow: 1, textAlign: "right" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => handleCloseUserMenu("my_top_picks")}>
                My Top Picks
              </MenuItem>
              <MenuItem onClick={() => handleCloseUserMenu("my_taste_palette")}>
                My Taste Palette
              </MenuItem>
              <MenuItem onClick={() => handleCloseUserMenu("logout")}>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
