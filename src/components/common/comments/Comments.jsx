import React, { useState } from "react";
// import sectiondata from "../store/store";
//import "../../../mm.css"
import { Panel, PanelBody, PanelHeader } from "../../panel/panel.jsx";
import Comment from "./Comment.jsx";
import PostComment from "./PostComment.jsx";

const Comments = ({updateCommentsState, createdAt, rootComments, allComments }) => {
  const [isOpenCommentModal, setIsOpenCommentModal] = useState(false);
  const [editMessage, setEditMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [parentId, setParentId] = useState("");

  const getReplies = (commentId) =>
    allComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  // modal open handler
  const handleOpen = () => {
    setIsOpenCommentModal(true);
  };

  // modal close handler
  const handleClose = () => {
    setIsEdit(false);
    setEditMessage("");
    setParentId("");
    // updateCommentsState(parentId);
    setIsOpenCommentModal(false);
  };

  return (
    <div>
      <PostComment
        open={isOpenCommentModal}
        handleClose={handleClose}
        editMessage={editMessage}
        parentId={parentId}
        isEdit={isEdit}
        createdAt={createdAt}
        updateCommentsState={updateCommentsState}
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
      <Panel>
        <PanelHeader>{allComments.length} Comments</PanelHeader>
        <PanelBody>
            <div style={{ marginTop: "4em", color: "black" }}>
                <div className="comments-wrap">
                {rootComments.map((rootComment) => (
                    <Comment
                        key={rootComment._id}
                        comment={rootComment}
                        replies={getReplies(rootComment._id)}
                        allComments={allComments}
                        handleOpen={handleOpen}
                        setEditMessage={setEditMessage}
                        setParentId={setParentId}
                        setIsEdit={setIsEdit}
                        updateCommentsState={updateCommentsState}
                    />
                ))}
                </div>
            </div>
        </PanelBody>
      </Panel>
    </div>
  );
};

export default Comments;
