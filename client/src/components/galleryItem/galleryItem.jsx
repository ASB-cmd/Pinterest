import { Link } from "react-router-dom";
import "./galleryItem.css";
import Image from "../image/image";

const GalleryItem = ({ item }) => {
  const optimizedheight = (372 * item.height) / item.width;
  return (
    <div
      className="galleryItem"
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      {/* <img src={item.media} alt="" /> */}
      <Image path={item.media} alt="" w={372} h={optimizedheight} />
      <Link to={`/pin/${item._id}`} className="overlay" />
      <button className="saveButton">Save</button>
      <div className="overlayIcons">
        <button>
          <Image path="/general/share.svg" alt="" />
        </button>
        <button>
          <Image path="/general/more.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default GalleryItem;
