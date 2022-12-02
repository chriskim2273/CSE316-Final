import { useContext, useState } from 'react';
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import Person2Icon from '@mui/icons-material/Person2';
import PeopleIcon from '@mui/icons-material/People';
import { TextField, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import Button from '@mui/material/Button';
import SortIcon from '@mui/icons-material/Sort';

export default function ToolBar(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const { setSearchText } = props;
    const isMenuOpen = Boolean(anchorEl);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex' }}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="Rewind"
                                sx={{ mr: 0 }}
                            >
                                <HomeIcon />
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="Stop"
                                sx={{ mr: 0 }}
                            >
                                <PeopleIcon />
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="Play"
                                sx={{ mr: 0 }}
                            >
                                <Person2Icon />
                            </IconButton>
                        </Box>

                        <TextField
                            label={<Typography><SearchIcon /> Search </Typography>}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onChange={(event) => setSearchText(event.target.value)}
                        />
                        <Box>
                            <Button
                                id="sort-by-button"
                                aria-controls={open ? 'demo-customized-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                variant="contained"
                                disableElevation
                                onClick={handleClick}
                                endIcon={<SortIcon />}
                            >
                                Sort By
                            </Button>
                            <Menu
                                id="demo-customized-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'demo-customized-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose} disableRipple>
                                    Name (A-Z)
                                </MenuItem>
                                <MenuItem onClick={handleClose} disableRipple>
                                    Publish Date (Newest)
                                </MenuItem>
                                <MenuItem onClick={handleClose} disableRipple>
                                    Listens (High-Low)
                                </MenuItem>
                                <MenuItem onClick={handleClose} disableRipple>
                                    Likes (High-Low)
                                </MenuItem>
                                <MenuItem onClick={handleClose} disableRipple>
                                    Dislikes (High-Low)
                                </MenuItem>
                            </Menu>
                        </Box>

                    </Grid>
                </Toolbar>
            </AppBar >
        </Box >
    );
}