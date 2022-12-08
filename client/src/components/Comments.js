import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box'
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Button, Chip, Divider, Grid, ListItem, TextField, Typography } from '@mui/material';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const Comments = (props) => {
    const { store } = useContext(GlobalStoreContext);
    const [commentText, setCommentText] = useState("");
    const { refresher } = props;
    let listCard = "";
    if (store.currentList) {
        if (store.currentList.comments != null) {
            listCard =
                <List sx={{ width: '100%', bgcolor: 'background.paper', mb: "20px" }}>
                    {
                        store.currentList.comments.map((comment) => {
                            function returnPublishDate() {
                                if (comment.date != null) {
                                    let dStr = new Date(comment.date).toDateString();
                                    return dStr;
                                }
                            }
                            return (<ListItem>
                                <Grid>
                                    <Box sx={{ width: '100%', bgcolor: 'primary.light' }}><Typography
                                    >

                                        {comment.text}
                                    </Typography></Box>

                                    <Typography>
                                        {"By: " + comment.author}
                                    </Typography>
                                    <Typography>
                                        {"Posted: " + returnPublishDate()}
                                    </Typography>
                                </Grid>
                            </ListItem>
                            )
                        })
                    }
                </List>;
        }
    }
    return (
        <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center">
            <Box sx={{ bgcolor: "background.paper", width: '100%' }}>
                {
                    listCard
                }
            </Box>
            <Box
                sx={{ display: 'flex' }}>
                <TextField
                    label="Post Comment"
                    variant="filled"
                    sx={{ width: '100%' }}
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}>
                </TextField>
                <Button
                    onClick={(event) => {
                        store.addComment(commentText)
                        setCommentText("");
                        refresher();
                    }}
                    variant="outlined"><PostAddIcon /></Button>
            </Box>
        </Grid>)
}

export default Comments;