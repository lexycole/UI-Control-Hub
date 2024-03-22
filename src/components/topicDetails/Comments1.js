import React, { useState } from "react";
// import sectiondata from "../store/store";
//import "../../../mm.css"
import ListingDetailsComments1 from "./ListingDetailsComments";
import PostComment from "./PostComment";

const Comment1 = ({ commentlists, updateCommentsState }) => {
  const [isOpenCommentModal, setIsOpenCommentModal] = useState(false);
  const [editMessage, setEditMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [parentId, setParentId] = useState("");

  // modal open handler
  const handleOpen = () => {
    setIsOpenCommentModal(true);
  };

  // modal close handler
  const handleClose = () => {
    setIsEdit(false);
    setEditMessage("");
    setParentId("");
    updateCommentsState(parentId);
    setIsOpenCommentModal(false);
  };

  return (
    <div className="">
      <PostComment
        open={isOpenCommentModal}
        handleClose={handleClose}
        editMessage={editMessage}
        parentId={parentId}
        isEdit={isEdit}
      />
      <button
        style={{
          padding: "5px 10px ",
          color: "black",
          fontWeight: "bold",
          border: "none",
          marginTop: "10px",
          marginBottom: "15px",
        }}
        onClick={handleOpen}
      >
        post a comment
      </button>
      <div style={{ marginTop: "4em", color: "black" }}>
        <div className="comments-wrap">
          <ListingDetailsComments1
            commentlists={commentlists}
            handleOpen={handleOpen}
            setEditMessage={setEditMessage}
            setParentId={setParentId}
            setIsEdit={setIsEdit}
            updateCommentsState={updateCommentsState}
          />
        </div>
      </div>
    </div>
  );
};

export default Comment1;
