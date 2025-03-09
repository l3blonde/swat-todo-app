// src/components/NavBar.tsx
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Logo from "../assets/logo";

export default function NavBar() {
    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                <Logo size={32} />
                <Typography variant="h6" component="div" sx={{ ml: 2, flexGrow: 1 }}>
                    SWAT
                </Typography>
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                    <Typography variant="subtitle2" component="div">
                        Sit Wait Act Think
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
}