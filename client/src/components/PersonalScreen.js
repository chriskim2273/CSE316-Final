import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box'
import PublishedCard from './PublishedCard';
import AuthContext from '../auth';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const PublishedScreen = (props) => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [expanded, setExpanded] = useState(false);
    const { searchText, performRefresh } = props;

    useEffect(() => {
        store.loadPublishedIdNamePairs(auth.user.email);
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
                            return (<PublishedCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                                is_expanded={expanded}
                                setExpanded={setExpanded}
                            />)
                        }
                    })

                }
            </List>;
    }
    return (
        <div id="playlist-selector">
            <Box sx={{ bgcolor: "background.paper" }} id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </Box>
        </div>)
}

export default PublishedScreen;