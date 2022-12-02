import { useContext, useState } from 'react'
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import { Box } from '@mui/material'
import ToolBar from './ToolBar'
import SongWindow from './SongWindow'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    const [searchText, setSearchText] = useState("");

    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    if (auth.loggedIn)
        return <Box>
            <ToolBar setSearchText={setSearchText} />

            <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '63%' }}>
                    <HomeScreen searchText={searchText} />
                </Box>
                <Box sx={{ width: '37%' }}>
                    <SongWindow sx={{ height: "100%" }} />
                </Box>
            </Box>
        </Box>
    else
        return <Box>

            <ToolBar />
            <SplashScreen />
        </Box>
}