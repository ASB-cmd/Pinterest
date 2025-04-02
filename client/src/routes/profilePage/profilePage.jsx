import "./profilePage.css";
import Image from "../../components/image/image";
import { useState } from "react";
import Gallery from "../../components/gallerry/gallery";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Boards from "../../components/Boards/Boards";
import apiRequest from "../../utils/apiRequest";
import FollowButton from "./FollowButton";

const ProfilePage = () => {
  const [type, setype] = useState("saved");

  const { username } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => apiRequest.get(`/users/${username}`).then((res) => res.data),
  });

  if (isPending) return "Loading..";

  if (error) return "An error has occured: " + error.message;

  if (!data) return "use not found";

  return (
    <div className="ProfilePage">
      <Image
        className="profileImg"
        w={100}
        h={100}
        path={data.img || "/general/noAvatar.png"}
        alt=""
      />
      <h1 className="profileName">{data.displayName}</h1>
      <span className="profileUsername"> @{data.username}</span>
      <div className="followCounts">
        {" "}
        {data.followerCount} Followers . {data.followingCount} followings
      </div>
      <div className="profileInteractions">
        <Image path="/general/share.svg" />
        <div className="profileButtons">
          <button>Message</button>
          <FollowButton
            isFollowing={data.isFollowing}
            username={data.username}
          />
        </div>
        <Image path="/general/more.svg" />
      </div>
      <div className="profileOptions">
        <span
          onClick={() => setype("created")}
          className={type === "created" ? "active" : ""}
        >
          Created
        </span>
        <span
          onClick={() => setype("saved")}
          className={type === "saved" ? "active" : ""}
        >
          Saved
        </span>
      </div>
      {type === "created" ? (
        <Gallery userId={data._id} />
      ) : (
        <Boards userId={data._id} />
      )}
    </div>
  );
};

export default ProfilePage;
