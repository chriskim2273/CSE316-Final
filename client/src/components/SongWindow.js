
import { React, useState, useContext } from 'react'
import { GlobalStoreContext } from '../store'
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
import YoutubePlayer from './YoutubePlayer.js';
import Comments from './Comments';


export default function SongWindow() {
    const { store } = useContext(GlobalStoreContext);

    const [tab, setTab] = useState('1');
    const [youtubePlayer, setYoutubePlayer] = useState();
    const [updateComment, setUpdateComment] = useState(true);

    const refreshComments = () => {
        setUpdateComment(!updateComment);
    }

    const handleTabChange = (event, newTab) => {
        setTab(newTab);
    };

    const listName = () => {
        if (store.currentList != null) {
            return store.currentList.name;
        }
        else {
            return "";
        }
    }

    const playingSong = () => {
        if (store.currentSong != null) {
            return store.currentSong;
        }
        else {
            return { title: "", artist: "" };
        }
    }

    const playingSongIndex = () => {
        if (store.currentSongIndex != null && store.currentSongIndex != -1) {
            return store.currentSongIndex + 1;
        }
        else {
            return "";
        }
    }

    const commentsEnabled = () => {
        if (store.currentList != null) {

            console.log("CL: " + JSON.stringify(store.currentList));
            if (store.currentList.comments == null) {
                return true;
            }
        }
        return false;
    }
    return (
        <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                    <Tab label="Player" value="1" />
                    <Tab label="Comments" value="2" disabled={commentsEnabled()} />
                </TabList>
            </Box>
            <TabPanel value="1">
                <Box sx={{ display: 'grid' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <YoutubePlayer videos={store.currentList.songs} index={store.currentSongIndex} setPlayer={setYoutubePlayer} />
                    </Box>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'grid' }}>
                        <Typography variant="h5" component="h5">
                            Now Playing
                        </Typography>
                        <Typography variant="body2" component="body1">
                            Playlist: {listName()}
                        </Typography>
                        <Typography variant="body2" component="body1">
                            Song #: {playingSongIndex()}
                        </Typography>
                        <Typography variant="body2" component="body1">
                            Title: {playingSong().title}
                        </Typography>
                        <Typography variant="body2" component="body1">
                            Artist: {playingSong().artist}
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <AppBar position="static" sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Toolbar>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="Rewind"
                                        sx={{ mr: 0 }}
                                        onClick={(event) => {
                                            youtubePlayer.seekTo(youtubePlayer.getCurrentTime() - 10, true);
                                        }}
                                    >
                                        <FastRewindIcon />
                                    </IconButton>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="Stop"
                                        sx={{ mr: 0 }}
                                        onClick={(event) => {
                                            youtubePlayer.pauseVideo();
                                        }}
                                    >
                                        <StopIcon />
                                    </IconButton>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="Play"
                                        sx={{ mr: 0 }}
                                        onClick={(event) => {
                                            youtubePlayer.playVideo();
                                        }}
                                    >
                                        <PlayArrowIcon />
                                    </IconButton>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="FastForward"
                                        sx={{ mr: 0 }}
                                        onClick={(event) => {
                                            youtubePlayer.seekTo(youtubePlayer.getCurrentTime() + 10, true);
                                        }}
                                    >
                                        <FastForwardIcon />
                                    </IconButton>
                                </Toolbar>
                            </AppBar>
                        </Box>
                    </Box>
                </Box>
            </TabPanel>
            <TabPanel value="2"><Comments refresher={refreshComments} /></TabPanel>
        </TabContext>
    )
}

