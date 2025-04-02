import { useNavigate } from "react-router";
import Image from "../image/image";
import UserButton from "../USerbutton/UserButton";
import "./topbar.css";

const TopBar = () => {
  const navigate = useNavigate();
  const handlesubmit = (e) => {
    e.preventDefault();
    navigate(`/search?search=${e.target[0].value}`);
  };

  return (
    <div className="topbar">
      <form onSubmit={handlesubmit} className="search">
        <Image path="/general/search.svg" alt="" />
        <input type="text" placeholder="search" />
      </form>
      <UserButton />
    </div>
  );
};

export default TopBar;
