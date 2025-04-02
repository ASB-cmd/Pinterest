import "./app.css";
import TopBar from "./components/topbar/topbar";
import Gallery from "./components/gallerry/gallery";
import LeftBar from "./components/leftBar/leftbar";

const App = () => {
  return (
    <div className="app">
      <LeftBar />
      <div className="content">
        <TopBar />
        <Gallery />
      </div>
    </div>
  );
};

export default App;
