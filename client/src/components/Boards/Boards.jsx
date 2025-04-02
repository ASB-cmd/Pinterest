import Image from "../image/image";
import "../Boards/Boards.css";
import apiRequest from "../../utils/apiRequest";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Boards = ({ userId }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["boards", userId],
    queryFn: () => apiRequest.get(`/boards/${userId}`).then((res) => res.data),
  });

  if (isPending) return "Loading..";

  if (error) return "An error has occured: " + error.message;

  console.log(data);
  return (
    <div className="collections">
      {/* Collections */}
      {data?.map((board) => (
        <Link
          to={`/search?boardId=${board._id}`}
          className="collection"
          key={board._id}
        >
          <Image src={board.firstPin.media} />
          <div className="collecrionInfo">
            <h1>{board.title}</h1>
            <span>
              {board.pinCount} Pins . {board.createdAt}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Boards;
