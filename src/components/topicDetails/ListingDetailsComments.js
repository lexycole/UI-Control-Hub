import ReplyIcon from "@material-ui/icons/Reply";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../mm.css";

import { Box } from "@material-ui/core";
import moment from "moment";

//import { Panel, PanelHeader, PanelBody } from './../../../components/panel/panel.jsx';
import { Panel, PanelBody, PanelHeader } from "./../panel/panel.jsx";

import AttachmentIcon from "@material-ui/icons/Attachment";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import LockIcon from "@material-ui/icons/Lock";
import PanToolIcon from "@material-ui/icons/PanTool";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteInternalPost,
  getInternalPost,
  getInternalPostTopic,
} from "../../services/internalposts";

function ListingDetailsComments1({
  commentlists,
  handleOpen,
  setEditMessage,
  setParentId,
  setIsEdit,
  updateCommentsState,
}) {
  const history = useHistory();
  const taskId = history.location.pathname.split("/")[4];
  const [allPosts, setAllPosts] = useState([]);
  const [nestedComments, setNestedComments] = useState([]);
  const stateRef = useRef();

  stateRef.current = nestedComments;

  useEffect(() => {
    const getCommentsNumber = async () => {
      const comments = await getInternalPostTopic(taskId);
      setAllPosts(comments.data);
    };
    return getCommentsNumber();
  }, []);

  const deleteReply = async (id) => {
    await getNestedComments(id);
    stateRef.current.map(async (e) => await deleteInternalPost(e._id));
    await deleteInternalPost(id);
    updateCommentsState();
    toast.success("Comment Deleted!");
  };

  const getNestedComments = async (id) => {
    try {
      const comments = await getInternalPostTopic(taskId);
      for (let j = 0; j < comments.data.length; j++) {
        await getAllReplies(comments.data[j], id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getKids = async (id) => {
    try {
      const comments = await getInternalPostTopic(taskId);
      for (let j = 0; j < comments.data.length; j++) {
        await getAllReplies(comments.data[j], id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllReplies = async (comment, id) => {
    let reply = {};
    if (comment.parentId) {
      reply = comment;
      while (reply.parentId) {
        reply = await getInternalPost(reply.parentId);
        reply = reply.data;
        if (reply._id === id) {
          setNestedComments((prev) => [...prev, comment]);
        }
      }
    }
  };

  const getFulldate = (date) => {
    return (
      <span>
        {moment(date).format("LLLL").split(" ")[0] +
          " " +
          moment(date).format("LLLL").split(" ")[1] +
          " " +
          moment(date).format("LLLL").split(" ")[2] +
          " " +
          moment(date).format("LLLL").split(" ")[3]}
      </span>
    );
  };

  return (
    <>
      <div className="col-xl-12">
        <ToastContainer />

        <Panel>
          <PanelHeader>{allPosts?.length} Comments</PanelHeader>
          <PanelBody>
            {commentlists.map((item) => (
              <div className="media media-sm">
                <Box
                  to="/ui/media-object"
                  className="media-left"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <img
                    src={item?.user?.imageSrc}
                    alt=""
                    className="avatar__image"
                  />
                  <div className="comment__userName">
                    {item?.user?.contactName?.first +
                      " " +
                      item?.user?.contactName?.last}
                  </div>
                </Box>
                <div className="media-body">
                  <h4 className="media-heading">{item.title}</h4>
                  {getFulldate(item.createdOn)}
                  <p className="comment-content mt-2">{item?.narrative}</p>

                  <div className="comment-reply d-flex align-items-center mb-3">
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
                            setParentId(item?._id);
                          }}
                        />
                        Reply
                      </span>
                      <span style={{ marginRight: ".5rem", cursor: "pointer" }}>
                        <EditIcon
                          onClick={() => {
                            setEditMessage(item?.narrative);
                            setIsEdit(true);
                            setParentId(item?._id);
                            handleOpen();
                          }}
                        />
                      </span>

                      <span style={{ marginRight: ".5rem" }}>
                        <PanToolIcon />
                      </span>
                      <span style={{ marginRight: ".5rem", cursor: "pointer" }}>
                        <DeleteIcon
                          onClick={async () => await deleteReply(item._id)}
                        />
                      </span>
                      <span style={{ marginRight: ".5rem" }}>
                        <LockIcon />
                      </span>
                    </Box>
                  </div>
                  {item.comments
                    ? item.comments.map((item2, index2) => {
                        return (
                          <ul className="comments-reply" key={index2}>
                            <li>
                              <div className="media media-sm comment">
                                <Box
                                  display="flex"
                                  flexDirection="column"
                                  alignItems="center"
                                >
                                  <Box backgroundColor="red" margin=".75rem">
                                    <img
                                      className="avatar__image"
                                      src={item2?.user?.imageSrc}
                                    />
                                  </Box>
                                  <Box>
                                    <div className="comment__userName">
                                      {item2?.user?.contactName?.first +
                                        " " +
                                        item2?.user?.contactName?.last}
                                    </div>
                                  </Box>
                                </Box>
                                <div className="comment-body">
                                  {getFulldate(item2.createdOn)}
                                  <p className="comment-content">
                                    {item2.narrative}
                                  </p>
                                  <div className="comment-reply d-flex align-item2s-center">
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
                                            setParentId(item2?._id);
                                          }}
                                        />
                                        Reply
                                      </span>
                                      <span
                                        style={{
                                          marginRight: ".5rem",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <EditIcon
                                          onClick={() => {
                                            setEditMessage(item2?.narrative);
                                            setIsEdit(true);
                                            setParentId(item2?._id);
                                            handleOpen();
                                          }}
                                        />
                                      </span>

                                      <span style={{ marginRight: ".5rem" }}>
                                        <PanToolIcon />
                                      </span>
                                      <span
                                        style={{
                                          marginRight: ".5rem",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <DeleteIcon
                                          onClick={() => deleteReply(item2._id)}
                                        />
                                      </span>
                                      <span style={{ marginRight: ".5rem" }}>
                                        <LockIcon />
                                      </span>
                                    </Box>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        );
                      })
                    : ""}
                </div>
              </div>
            ))}
          </PanelBody>
        </Panel>
      </div>
    </>
  );
}

export default ListingDetailsComments1;
