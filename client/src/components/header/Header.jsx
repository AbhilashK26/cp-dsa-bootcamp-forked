import {
    IconButton,
    Menu,
    MenuItem,
    AppBar,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
    Button,
    ButtonGroup,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Codeiiest from "../../assets/codeiiest.png";
import "./Header.css"

import { Link, NavLink } from "react-router-dom";

const Menubutton = () => {
    const [anchorElm, setAnchorElm] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setAnchorElm(null);
        setOpen(false);
    };
    const handleClick = (e) => {
        setAnchorElm(e.currentTarget);
        setOpen(true);
    };

    return (
        <Toolbar sx={{ marginLeft: "auto" }}>
            <IconButton onClick={handleClick}>
                <MenuIcon sx = {{color: "white"}} />
            </IconButton>
            <Menu anchorEl={anchorElm} open={open} onClose={handleClose}>
                <NavLink style={{ textDecoration: "none" }} to="/leaderboard">
                    <MenuItem sx = {{textDecoration: "none", color: "black"}} onClick={handleClose}>
                        Leaderboard
                    </MenuItem>
                </NavLink>
                <NavLink style={{ textDecoration: "none" }} to="/contest">
                    <MenuItem sx = {{textDecoration: "none", color: "black"}} onClick={handleClose}>
                        Contest
                    </MenuItem>
                </NavLink>
                <NavLink style={{ textDecoration: "none" }} to="/resources">
                    <MenuItem sx = {{textDecoration: "none", color: "black"}} onClick={handleClose}>
                        Resources{" "}
                    </MenuItem>
                </NavLink>
            </Menu>
        </Toolbar>
    );
};

const HeaderTabs = () => {
    return (
        <ButtonGroup sx={{ textDecoration: "none" }} >
            <NavLink className="navlink" to="/leaderboard">
                <Button
                    sx={{
                        border: "0",
                        color: "white",
                        fontWeight: 600,
                        textDecoration: "none",
                        
                    }}
                    color="inherit"
                >
                    Leaderboard
                </Button>
            </NavLink>
            <NavLink className="navlink" to="/contest">
                <Button
                    sx={{
                        border: 0,
                        color: "white",
                        backgroundColor: "inherit",
                        fontWeight: 600,
                        textDecoration: "none",
                        
                    }}
                    color="inherit"
                >
                    Contest
                </Button>
            </NavLink>
            <NavLink className="navlink" to="/resources">
                <Button
                    sx={{
                        border: 0,
                        color: "white",
                        backgroundColor: "none",
                        fontWeight: 600,
                        
                        textDecoration: "none"

                    }}
                    color="inherit"
                >
                    Resources
                </Button>
            </NavLink>
        </ButtonGroup>
    );
};

const Header = () => {
    const theme = useTheme();
    const mobileView = useMediaQuery(theme.breakpoints.down(800));
    return (
        <>
            <AppBar sx={{
                height: "60px",
                backgroundColor: "#242424" }}>
                <Toolbar sx={{ display: "flex", alignItems: "center", textDecoration: "none", color: "white" }}>
                    <Link to = "/">
                    <img src={Codeiiest} alt="appIcon" style={{ width: "2.5rem", marginRight: "0.8rem" }} /></Link>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: "1.3rem",
                            flexGrow: 1,
                            color: "white",
                            fontFamily: "poppins",
                            fontWeight: 600,
                        }}
                    >
                        {mobileView ? "Bootcamp" : "CP/DSA Bootcamp"}
                    </Typography>
                    {mobileView ? <Menubutton /> : <HeaderTabs />}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;
