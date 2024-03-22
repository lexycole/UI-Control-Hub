import React from "react";
import { FaRegSmile } from "react-icons/fa";
import { FiThumbsUp } from "react-icons/fi";
//import "../../../mm.css"
import ReplyIcon from "@material-ui/icons/Reply";
import { useHistory } from "react-router-dom";

import { Box } from "@material-ui/core";
import moment from "moment";

function ListingDetailsComments1({ commentlists, item }) {
  const history = useHistory();

  const opencomment1 = (topicId) => {
    history.push(`/forum/topic/newPost/${topicId}`);
    //console.log(id);
  };
  return (
    <>
      <ul className="comments-list padding-top-40px">
        <li>
          <div className="comment">
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box margin=".75rem">
                <img
                  className="avatar__img"
                  src={commentlists?.user?.imageSrc}
                />
              </Box>
              <Box>
                <div className="comment__userName">
                  {commentlists?.user?.contactName?.first +
                    " " +
                    commentlists?.user?.contactName?.last}
                </div>
              </Box>
            </Box>{" "}
            <div className="comment-body">
              <div className="meta-data">
                <span className="comment__author">{commentlists.title}</span>
                <span className="comment__date">
                  {moment(commentlists?.createdOn)
                    .format("LLLL")
                    .split(" ")[0] +
                    " " +
                    moment(commentlists?.createdOn)
                      .format("LLLL")
                      .split(" ")[1] +
                    " " +
                    moment(commentlists?.createdOn)
                      .format("LLLL")
                      .split(" ")[2] +
                    " " +
                    moment(commentlists?.createdOn)
                      .format("LLLL")
                      .split(" ")[3]}
                </span>
                <div className="rating-rating">
                  {/*item.stars.map((star, index) => {
                                                    return <span key={index} className="la la-star">{star}</span>
                                                })*/}
                </div>
              </div>
              <p className="comment-content">{commentlists.narrative}</p>
              <div className="comment-reply d-flex justify-content-between align-items-center">
                <div
                  onClick={() => opencomment1(commentlists._id)}
                  className="theme-btn comment__btn"
                >
                  <i className="la d-inline-block">
                    <ReplyIcon />
                  </i>{" "}
                  reply
                </div>
                <p className="feedback-box">
                  Was this review?
                  <button type="button" className="theme-btn">
                    <i className="la d-inline-block">
                      <FiThumbsUp />
                    </i>{" "}
                    Helpful
                  </button>
                  <button type="button" className="theme-btn">
                    <i className="la d-inline-block">
                      <FaRegSmile />
                    </i>{" "}
                    Funny
                  </button>
                </p>
              </div>
            </div>
          </div>

          {item
            ? item.map((item2, index2) => {
                return (
                  <ul className="comments-reply" key={index2}>
                    <li>
                      <div className="comment">
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Box margin=".75rem">
                            <img
                              className="avatar__img"
                              src={commentlists?.user?.imageSrc}
                            />
                          </Box>
                          <Box>
                            <div className="comment__userName">
                              {commentlists?.user?.contactName?.first +
                                " " +
                                commentlists?.user?.contactName?.last}
                            </div>
                          </Box>
                        </Box>{" "}
                        <div className="comment-body">
                          <div className="meta-data">
                            <span className="comment__author">
                              {item2.title}
                            </span>
                            <span className="comment__date">
                              {moment(item2?.createdOn)
                                .format("LLLL")
                                .split(" ")[0] +
                                " " +
                                moment(item2?.createdOn)
                                  .format("LLLL")
                                  .split(" ")[1] +
                                " " +
                                moment(item2?.createdOn)
                                  .format("LLLL")
                                  .split(" ")[2] +
                                " " +
                                moment(item2?.createdOn)
                                  .format("LLLL")
                                  .split(" ")[3]}
                            </span>
                          </div>
                          <p className="comment-content">{item2.narrative}</p>
                          <div className="comment-reply d-flex justify-content-between align-item2s-center">
                            <div className="theme-btn comment__btn">
                              <i className="la d-inline-block">
                                <ReplyIcon />
                              </i>{" "}
                              reply
                            </div>
                            <p className="feedback-box">
                              Was this review?
                              <button type="button" className="theme-btn">
                                <i className="la d-inline-block">
                                  <FiThumbsUp />
                                </i>{" "}
                                Helpful
                              </button>
                              <button type="button" className="theme-btn">
                                <i className="la d-inline-block">
                                  <FaRegSmile />
                                </i>{" "}
                                Funny
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                );
              })
            : ""}
        </li>
      </ul>
    </>
  );
}

export default ListingDetailsComments1;
