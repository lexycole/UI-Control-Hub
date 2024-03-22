import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../../../services/authservice";
import { getInternalPost, saveInternalPost } from "../../../services/internalposts";
  
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "100%",
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));
  
  const PostComment = ({ open, handleClose, editMessage, parentId, isEdit, createdAt, updateCommentsState }) => {
    const [narrative, setNarrative] = useState("");
    const { id } = useParams();
    const classes = useStyles();
  
    const handleContentChange = (e) => setNarrative(e.target.value);
  
    useEffect(() => {
      setNarrative(editMessage);
    }, [editMessage]);
  
    const submitHandler = async () => {
      const user = getProfile();

      try {
        if (parentId && !isEdit) {
          const submitInfo = {
            user: user._id,
            parentId,
            topicId: id,
            createdAt,
            narrative,
            status: "active",
          };

          // for reply create
          const {data} = await saveInternalPost(submitInfo);
          const {data: createdReply} = await getInternalPost(data._id);
          
          updateCommentsState({action: "create", payload: createdReply });

        } else if (parentId && isEdit) {
          const submitInfo = {
            _id: parentId,
            narrative,
          };

          // for edit comment
          const {data} = await saveInternalPost(submitInfo);
          const {data: editedComment} = await getInternalPost(data._id);
          
          updateCommentsState({action: "edit", payload: editedComment});
        } else {
          
          const submitInfo = {
            user: user._id,
            topicId: id,
            createdAt,
            narrative,
            status: "active",
          };
  
          // new parent comment create
          const {data} = await saveInternalPost(submitInfo);
          const {data: createdComment} = await getInternalPost(data._id);

          updateCommentsState({action: "create", payload: createdComment });
        }
        handleClose();
        setNarrative("");
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        style={{ width: "100%" }}
      >
        <DialogTitle>Create a comment</DialogTitle>
        <DialogContent>
          <form className={classes.root}>
            <Box display="flex" width={"100%"}>
              <TextField
                name="content"
                value={narrative}
                onChange={handleContentChange}
                multiline
                rows={4}
                label="Message"
                placeholder="Type your message here"
              />
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitHandler}>Post</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default PostComment;
  