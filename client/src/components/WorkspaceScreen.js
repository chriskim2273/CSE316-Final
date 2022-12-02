import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import ToolBar from './ToolBar.js'
import SongWindow from './SongWindow.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    return (
        <Box id="list-selector-list">

            <ToolBar />
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '63%', height: '100%' }}>
                    <List
                        id="playlist-cards"
                        sx={{ overflow: 'scroll', height: '100%', width: '100%', bgcolor: '#8000F00F' }}
                    >
                        {
                            store.currentList.songs.map((song, index) => (
                                <SongCard
                                    id={'playlist-song-' + (index)}
                                    key={'playlist-song-' + (index)}
                                    index={index}
                                    song={song}
                                />
                            ))
                        }
                    </List>
                </Box>
                <Box sx={{ width: '37%', height: '100%' }}>
                    <SongWindow />
                </Box>
            </Box>
        </Box>
    )
}

export default WorkspaceScreen;