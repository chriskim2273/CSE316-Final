import { useContext, useState } from 'react'
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import { Box } from '@mui/material'
import ToolBar from './ToolBar'
import SongWindow from './SongWindow'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import GlobalStoreContext from '../store'
import PublishedScreen from './PublishedScreen'
import { PersonalScreen } from '.'

export default function PublishedScreenWrapper(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [searchText, setSearchText] = useState("");
    const [refresh, setRefresh] = useState(true);

    function performRefresh() {
        setRefresh(!refresh);
    }

    let songWindow = "";
    if (store.currentList != null) {
        songWindow = (<Box sx={{ width: '37%' }}>
            <SongWindow sx={{ height: "100%" }} />
        </Box>)
    }

    console.log("PublishedScreenWrapper auth.loggedIn: " + auth.loggedIn);
    if (auth.loggedIn)
        return <Box>
            <ToolBar setSearchText={setSearchText} />

            <Box sx={{ display: 'flex' }}>
                <Box sx={{ overflow: 'scroll', height: '83vh', width: '100%' }}>
                    <PersonalScreen searchText={searchText} refresh={performRefresh} />
                </Box>
                {songWindow}
            </Box>
        </Box>
    else
        return <Box>
            <SplashScreen />
        </Box>
}