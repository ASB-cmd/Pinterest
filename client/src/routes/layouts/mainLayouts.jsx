import { Outlet } from "react-router";

import LeftBar from "../../components/leftBar/leftbar";
import TopBar from "../../components/topbar/topbar";
import "./mainLayouts.css";

const MainLayouts = () => {
  return (
    <div className="app">
      <LeftBar />
      <div className="content">
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayouts;
