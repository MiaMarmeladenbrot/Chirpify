import { useContext, useState } from "react";
import { backendUrl } from "../../api/api";
import IconDelete from "../IconDelete/IconDelete";
import IconEdit from "../IconEdit/IconEdit";
import "./Comment.css";
import { userContext } from "../../context/Context";

const Comment = ({
  singleComment,
  setErrorMessage,
  rerenderCounter,
  setRerenderCounter,
}) => {
  const [message, setMessage] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);
  const { user: loggedInUser } = useContext(userContext);

  return (
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

      {singleComment?.userId?._id === loggedInUser._id ? (
        <div className="comment-menu">
          <IconDelete
            singleComment={singleComment}
            setErrorMessage={setErrorMessage}
          />
          <IconEdit
            singleComment={singleComment}
            message={message}
            setMessage={setMessage}
            setErrorMessage={setErrorMessage}
            toggleEdit={toggleEdit}
            setToggleEdit={setToggleEdit}
            rerenderCounter={rerenderCounter}
            setRerenderCounter={setRerenderCounter}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Comment;
