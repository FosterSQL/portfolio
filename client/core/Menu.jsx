import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Avatar,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CodeIcon from "@mui/icons-material/Code";
import auth from "../lib/auth-helper";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const mainLinks = [
    { path: "/", label: "Home", icon: <HomeIcon /> },
    { path: "/about", label: "About", icon: <PersonIcon /> },
    { path: "/education", label: "Education", icon: <SchoolIcon /> },
    { path: "/projects", label: "Projects", icon: <WorkIcon /> },
    { path: "/contact", label: "Contact", icon: <ContactMailIcon /> },
  ];

  const adminLinks = [
    { path: "/users", label: "Users", icon: <PeopleIcon /> },
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawer = (
    <Box
      sx={{ width: 280, pt: 2 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ px: 3, py: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
          Diego González
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Software Developer
        </Typography>
      </Box>
      <Divider />
      <List>
        {mainLinks.map((link) => (
          <ListItem
            button
            component={Link}
            to={link.path}
            key={link.path}
            sx={{
              bgcolor: isActive(link.path) ? theme.palette.primary.light + "20" : "transparent",
              borderLeft: isActive(link.path) ? `4px solid ${theme.palette.primary.main}` : "4px solid transparent",
              "&:hover": {
                bgcolor: theme.palette.primary.light + "10",
              },
            }}
          >
            <ListItemIcon sx={{ color: isActive(link.path) ? theme.palette.primary.main : "inherit" }}>
              {link.icon}
            </ListItemIcon>
            <ListItemText
              primary={link.label}
              primaryTypographyProps={{
                fontWeight: isActive(link.path) ? 600 : 400,
              }}
            />
          </ListItem>
        ))}
      </List>
      {auth.isAuthenticated() && auth.isAuthenticated().user.isAdmin && (
        <>
          <Divider sx={{ my: 1 }} />
          <List>
            {adminLinks.map((link) => (
              <ListItem
                button
                component={Link}
                to={link.path}
                key={link.path}
                sx={{
                  bgcolor: isActive(link.path) ? theme.palette.primary.light + "20" : "transparent",
                  borderLeft: isActive(link.path) ? `4px solid ${theme.palette.primary.main}` : "4px solid transparent",
                }}
              >
                <ListItemIcon sx={{ color: isActive(link.path) ? theme.palette.primary.main : "inherit" }}>
                  {link.icon}
                </ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
        </>
      )}
      <Divider sx={{ my: 2 }} />
      <List>
        {!auth.isAuthenticated() ? (
          <>
            <ListItem button component={Link} to="/signup">
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Up" />
            </ListItem>
            <ListItem button component={Link} to="/signin">
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Sign In" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} to={`/user/${auth.isAuthenticated().user._id}`}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                auth.clearJWT(() => navigate("/"));
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "white",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2, color: theme.palette.primary.main }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <CodeIcon sx={{ fontSize: 32, color: theme.palette.primary.main, mr: 1 }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                textDecoration: "none",
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              Diego González Portfolio
            </Typography>
          </Box>

          {!isMobile && (
            <>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {mainLinks.map((link) => (
                  <Button
                    key={link.path}
                    component={Link}
                    to={link.path}
                    startIcon={link.icon}
                    sx={{
                      color: isActive(link.path) ? theme.palette.primary.main : theme.palette.text.primary,
                      fontWeight: isActive(link.path) ? 600 : 400,
                      px: 2,
                      "&:hover": {
                        bgcolor: theme.palette.primary.light + "10",
                      },
                      borderBottom: isActive(link.path) ? `3px solid ${theme.palette.primary.main}` : "3px solid transparent",
                      borderRadius: 0,
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
                {auth.isAuthenticated() && auth.isAuthenticated().user.isAdmin && adminLinks.map((link) => (
                  <Button
                    key={link.path}
                    component={Link}
                    to={link.path}
                    startIcon={link.icon}
                    sx={{
                      color: isActive(link.path) ? theme.palette.primary.main : theme.palette.text.primary,
                      fontWeight: isActive(link.path) ? 600 : 400,
                      px: 2,
                      "&:hover": {
                        bgcolor: theme.palette.primary.light + "10",
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Box>

              <Box sx={{ ml: 2, display: "flex", gap: 1 }}>
                {!auth.isAuthenticated() ? (
                  <>
                    <Button
                      component={Link}
                      to="/signin"
                      variant="outlined"
                      sx={{ borderRadius: 2 }}
                    >
                      Sign In
                    </Button>
                    <Button
                      component={Link}
                      to="/signup"
                      variant="contained"
                      sx={{ borderRadius: 2 }}
                    >
                      Sign Up
                    </Button>
                  </>
                ) : (
                  <>
                    <IconButton
                      component={Link}
                      to={`/user/${auth.isAuthenticated().user._id}`}
                      sx={{ color: theme.palette.primary.main }}
                    >
                      <Avatar sx={{ width: 36, height: 36, bgcolor: theme.palette.primary.main }}>
                        {auth.isAuthenticated().user.name?.[0]?.toUpperCase() || "U"}
                      </Avatar>
                    </IconButton>
                    <Button
                      variant="outlined"
                      startIcon={<LogoutIcon />}
                      onClick={() => {
                        auth.clearJWT(() => navigate("/"));
                      }}
                      sx={{ borderRadius: 2 }}
                    >
                      Sign Out
                    </Button>
                  </>
                )}
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>
    </>
  );
}