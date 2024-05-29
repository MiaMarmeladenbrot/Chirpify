import { useContext, useEffect, useState } from "react";
import "./TweetCommentFeed.css";
import { backendUrl } from "../../api/api";
import { accessTokenContext, userContext } from "../../context/Context";
import TweetAddComment from "../TweetAddComment/TweetAddComment";
import IconDelete from "../IconDelete/IconDelete";
import IconEdit from "../IconEdit/IconEdit";

const TweetCommentFeed = ({
  singleTweet,
  rerenderCounter,
  setRerenderCounter,
}) => {
  const { user: loggedInUser } = useContext(userContext);
  console.log(loggedInUser);
  const { accessToken } = useContext(accessTokenContext);
  const [comments, setComments] = useState(null);
  const [message, setMessage] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);
  const tweetId = singleTweet?._id;
  const user = singleTweet?.userId;

  useEffect(() => {
    const fetchAllCommentsOfTweet = async () => {
      const res = await fetch(`${backendUrl}/api/v1/comments/${tweetId}`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      if (!data.result) {
        return setErrorMessage(data.message);
      }
      setComments(data.result);
      setErrorMessage("");
    };
    fetchAllCommentsOfTweet();
  }, [rerenderCounter]);
  console.log(comments);

  // createdAt : "2024-05-28T14:00:11.453Z"
  // message : "genau so"
  // taggedUsers : []
  // tweetId : "6655cf014112a02029cf685c"
  // updatedAt : "2024-05-28T14:00:11.453Z"
  // userId :
  //    firstname : "Mia"
  //    lastname : "M"
  //    profileImg: "placeholder.jpg"
  //    username: "MiaMaRmElAdE"
  //    _id : "66505f381343ddd9afb36c7d"
  // __v : 0
  // _id: "6655e36bcf8970ce433d0970"

  return (
    <section className="comments">
      <article className="comments-with-input">
        {comments?.length !== 0 ? (
          <div className="tweet-comment-feed">
            {comments?.map((singleComment) => (
              <div key={singleComment._id} className="single-comment">
                <div className="comment-profile-area">
                  <img
                    src={`${backendUrl}/${singleComment?.userId?.profileImg}`}
                    alt={singleComment?.userId?.username}
                  />
                  <p>{singleComment?.userId?.firstname}</p>
                  <p>{singleComment?.userId?.lastname}</p>
                  <p>@{singleComment?.userId?.username}</p>
                </div>

                {singleComment?.userId?._id === loggedInUser._id ? (
                  <div className="comment-menu">
                    <IconDelete
                      singleTweet={singleTweet}
                      setErrorMessage={setErrorMessage}
                    />
                    <IconEdit
                      singleComment={singleComment}
                      message={message}
                      setMessage={setMessage}
                      setErrorMessage={setErrorMessage}
                      toggleEdit={toggleEdit}
                      setToggleEdit={setToggleEdit}
                    />
                  </div>
                ) : (
                  "fehler"
                )}

                {toggleEdit ? (
                  <textarea
                    name="edit-comment"
                    id="edit-comment"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  >
                    {message}
                  </textarea>
                ) : (
                  <p>{singleComment?.message}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="tweet-comment-feed">
            <p>No comments yet</p>
          </div>
        )}
        <TweetAddComment
          tweetId={tweetId}
          rerenderCounter={rerenderCounter}
          setRerenderCounter={setRerenderCounter}
        />
      </article>
    </section>
  );
};

export default TweetCommentFeed;
