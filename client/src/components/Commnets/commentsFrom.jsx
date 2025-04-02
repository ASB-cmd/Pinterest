import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import apiRequest from "../../utils/apiRequest.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const addComment = async (comment) => {
  const res = await apiRequest.post("/comments", comment);
  return res.data;
};

const CommnetsForm = ({ id }) => {
  const [open, setopen] = useState(false);
  const [desc, setdesc] = useState("");

  const handleEmojiClick = (emoji) => {
    console.log(emoji);
    setdesc((prev) => prev + " " + emoji.emoji);
    setopen(false);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      setdesc("");
      setopen(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({
      description: desc,
      pin: id,
    });
  };

  return (
    <form className="commentForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a comment"
        onChange={(e) => setdesc(e.target.value)}
        value={desc}
      />
      <div className="emoji">
        <div onClick={() => setopen((prev) => !prev)}>..</div>
        {open && (
          <div className="emojiPicker">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </form>
  );
};

export default CommnetsForm;
