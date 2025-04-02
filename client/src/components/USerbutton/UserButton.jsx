import { useState } from "react";
import "./userbutton.css";
import Image from "../image/image";
import apiRequest from "../../utils/apiRequest";
import { useNavigate } from "react-router";
import useAuthStore from "../../utils/authStore";
import { Link } from "react-router-dom";

const UserButton = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // const currentUser = true;

  const { currentUser, removeCurrentUser } = useAuthStore();
  console.log(currentUser);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/users/auth/logout", {});
      removeCurrentUser();
      navigate("/auth");
    } catch (err) {
      console.log(err);
    }
  };

  return currentUser ? (
    <div className="userButton">
      <Image path={currentUser.img || "/general/noAvatar.png"} alt="" />
      <div onClick={() => setOpen((prev) => !prev)}>
        <Image path="/general/arrow.svg" alt="" className="arrow" />
      </div>
      {open && (
        <div className="userOptions">
          <Link to={`/profile/${currentUser.username}`} className="userOption">
            Profile
          </Link>
          <div className="userOption"> Settings</div>
          <div className="userOption" onClick={handleLogout}>
            LogOut
          </div>
        </div>
      )}
    </div>
  ) : (
    <Link to="/auth" className="loginLink">
      login/signup
    </Link>
  );
};

export default UserButton;
