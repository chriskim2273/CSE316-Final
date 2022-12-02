import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = (props) => {
    const { store } = useContext(GlobalStoreContext);
    const [expanded, setExpanded] = useState(false);
    const { searchText } = props;

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard =
            <List sx={{ width: '100%', bgcolor: 'background.paper', mb: "20px" }}>
                {
                    store.idNamePairs.map((pair) => {
                        if (pair.name.toLowerCase().includes(searchText.toLowerCase())) {
                            return (<ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                                is_expanded={expanded}
                                setExpanded={setExpanded}
                            />)
                        }
                    })

                }
                <Fab sx={{ transform: "translate(1150%, 10%)" }}
                    color="primary"
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
            </List>;
    }
    return (
        <div id="playlist-selector">

            <div id="list-selector-heading">
                <Fab sx={{ transform: "translate(-20%, 0%)" }}
                    color="primary"
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                Your Playlists
            </div>
            <Box sx={{ bgcolor: "background.paper" }} id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </Box>
        </div>)
}

export default HomeScreen;