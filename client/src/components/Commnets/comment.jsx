import Image from "../image/image";

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <Image path={comment.user.img || "/general/noAvatar.png"} alt="" />
      <div className="commnetContent">
        <span className="commnetUsername"> {comment.user.displayName}</span>
        <p className="commentText">{comment.description}</p>
        <span className="commentTime">{comment.createdAt}</span>
      </div>
    </div>
  );
};

export default Comment;
