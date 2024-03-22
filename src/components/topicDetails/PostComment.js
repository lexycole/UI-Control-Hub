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
import { getProfile } from "../../services/authservice";
import { saveInternalPost } from "../../services/internalposts";

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

const PostComment = ({ open, handleClose, editMessage, parentId, isEdit }) => {
  const [narrative, setNarrative] = useState("");
  const { id } = useParams();
  const classes = useStyles();

  const handleContentChange = (e) => setNarrative(e.target.value);

  useEffect(() => {
    setNarrative(editMessage);
  }, [editMessage]);

  const submitHandler = async () => {
    const user = getProfile();
    let submitInfo;

    if (parentId && !isEdit) {
      submitInfo = {
        user: user._id,
        parentId,
        topicId: id,
        createdAt: "Ticket",
        narrative,
        status: "active",
      };
    } else if (parentId && isEdit) {
      submitInfo = {
        _id: parentId,
        user: user._id,
        parentId,
        topicId: id,
        createdAt: "Ticket",
        narrative,
      };
    } else {
      submitInfo = {
        user: user._id,
        topicId: id,
        createdAt: "Ticket",
        narrative,
        status: "active",
      };
    }
    try {
      await saveInternalPost(submitInfo);
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
