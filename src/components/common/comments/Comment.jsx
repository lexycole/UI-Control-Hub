import ReplyIcon from "@material-ui/icons/Reply";
import React from "react";
// import "../../mm.css";
import "../../../mm.css";

import { Box } from "@material-ui/core";
import moment from "moment";

//import { Panel, PanelHeader, PanelBody } from './../../../components/panel/panel.jsx';

import AttachmentIcon from "@material-ui/icons/Attachment";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import LockIcon from "@material-ui/icons/Lock";
import PanToolIcon from "@material-ui/icons/PanTool";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProfile } from "../../../services/authservice";
import {
  deleteInternalPost
} from "../../../services/internalposts";

function Comment({
  comment,
  handleOpen,
  setEditMessage,
  setParentId,
  setIsEdit,
  updateCommentsState,
  replies,
  allComments,
}) {

    // current user
    const user = getProfile();

    // get repliy function
    const getReplies = (commentId) => {
        const replies2 = allComments.filter(
          (backendComment) => backendComment.parentId === commentId
        );
      
        return replies2.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      };

  const deleteComment = async (id) => {
    updateCommentsState({action: "delete", payload: {_id: id} });
    await deleteInternalPost(id);
    deleteReply(id);
  };

  // delete reply function
  const deleteReply = async (id) =>{
    const getAllReplies = getReplies(id);

    if (getAllReplies.length > 0) {
      getAllReplies.forEach( async (reply) =>{
        updateCommentsState({action: "delete", payload: {_id: reply._id} });
        await deleteInternalPost(reply._id);

        deleteReply(reply._id);
      })
    }
  }


  const getFulldate = (date) => {
    return (
      <span>
        {moment(date).format("LLL")}
      </span>
    );
  };

  return (
    <>
      <div className="col-xl-12 p-0">
        <ToastContainer />
          <div className="media media-sm">
            <Box
                to="/ui/media-object"
                className="media-left"
                display="flex"
                flexDirection="column"
                alignItems="center"
                style={{width: "95px", textAlign: "center"}}
            >
                <img
                src={comment?.user?.imageSrc}
                alt=""
                className="avatar__image"
                />
                <div className="comment__userName">
                {comment?.user?.contactName?.first +
                    " " +
                    comment?.user?.contactName?.last}
                </div>
            </Box>
            <div className="media-body">
                <h4 className="media-heading">{comment.title}</h4>
                {getFulldate(comment.createdOn)}
                <p className="comment-content mt-2">{comment?.narrative}</p>

                <div className="d-flex align-items-center mb-3">
                <Box>
                    <span style={{ marginRight: ".5rem" }}>
                    <FormatQuoteIcon />
                    </span>
                    <span style={{ marginRight: ".5rem" }}>
                    <FavoriteBorderIcon />
                    </span>
                    <span style={{ marginRight: ".5rem" }}>
                    <AttachmentIcon />
                    </span>
                    <span style={{ marginRight: ".5rem" }}>
                    <BookmarkBorderIcon />
                    </span>
                    <span
                    style={{
                        marginRight: ".5rem",
                        cursor: "pointer",
                    }}
                    >
                    <ReplyIcon
                        onClick={() => {
                        handleOpen();
                        setParentId(comment?._id);
                        }}
                    />
                    </span>
                    {user._id === comment?.user._id && (
                      <span style={{ marginRight: ".5rem", cursor: "pointer" }}>
                      <EditIcon
                          onClick={() => {
                          setEditMessage(comment?.narrative);
                          setIsEdit(true);
                          setParentId(comment?._id);
                          handleOpen();
                          }}
                      />
                      </span>
                    )}

                    <span style={{ marginRight: ".5rem" }}>
                    <PanToolIcon />
                    </span>
                    {user._id === comment?.user._id && (
                      <span style={{ marginRight: ".5rem", cursor: "pointer" }}>
                      <DeleteIcon
                          onClick={async () => await deleteComment(comment._id)}
                      />
                      </span>
                    )}
                    <span style={{ marginRight: ".5rem" }}>
                    <LockIcon />
                    </span>
                </Box>
                </div>
                {replies.length > 0 && (
                    <div className="comment-reply">
                        {replies.map((reply) => (
                            <Comment
                                key={reply._id}
                                comment={reply}
                                replies={getReplies(reply._id).length ? getReplies(reply._id) : []}
                                handleOpen={handleOpen}
                                setEditMessage={setEditMessage}
                                setParentId={setParentId}
                                setIsEdit={setIsEdit}
                                updateCommentsState={updateCommentsState}
                                allComments={allComments}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
