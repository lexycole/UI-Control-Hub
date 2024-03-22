import React from "react"
import ListingDetailsComments from "./ListingDetailsComments";
import BlogCommentFields from "./BlogCommentFields";
// import sectiondata from "../store/store";
import { CommentData } from "./CommentData"
//import "../../../mm.css"
import ListingDetailsComments1 from "./ListingDetailsComments1";

const Comment = ({props,posts}) =>{


    
    return(
        <div
      className="mybgGradient"
      >
        <div style={{ marginTop: "4em", color: "black"}}>
            <div className="comments-wrap">
                            
                <h2 className="widget-title">
                    {posts.length+' '}Comments
                </h2>
                
                <div className="title-shape"></div>

                <ListingDetailsComments1 
                    commentlists={props} item={posts} />

            </div>

           
              

        </div>
        </div>
    )
}

export default Comment