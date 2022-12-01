import './App.css';
import { React, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Item from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import { Tab } from '@mui/material'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import FastForwardIcon from '@mui/icons-material/FastForward';
import StopIcon from '@mui/icons-material/Stop';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import {
    SongWindow,
    YoutubePlayer,
    ToolBar,
    AppBanner,
    HomeWrapper,
    LoginScreen,
    RegisterScreen,
    Statusbar,
    WorkspaceScreen
} from './components'
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/
const App = () => {
    return (

        <BrowserRouter>

            <AuthContextProvider>
                <GlobalStoreContextProvider>
                    <AppBanner />

                    <ToolBar />
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ width: 900, height: 700 }}>
                            <Switch>
                                <Route path="/" exact component={HomeWrapper} />
                                <Route path="/login/" exact component={LoginScreen} />
                                <Route path="/register/" exact component={RegisterScreen} />
                                <Route path="/playlist/:id" exact component={WorkspaceScreen} />
                            </Switch>
                        </Box>
                        <Box sx={{ width: 500, height: 700 }}>
                            <SongWindow />
                        </Box>
                    </Box>
                    <Statusbar />
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter >
    )
}

export default App