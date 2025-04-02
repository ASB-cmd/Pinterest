import "./CreatePage.css";
import IkImage from "../../components/image/image";
import useAuthStore from "../../utils/authStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Editor from "../../components/editor/Ediitor";
import useEditorStore from "../../utils/editorStore";
import apiRequest from "../../utils/apiRequest";

const CreatePage = () => {
  const { currentUser } = useAuthStore();
  const navigate = useNavigate();
  const formref = useRef();
  const { textOptions, canvasOptions } = useEditorStore();

  const [file, setfile] = useState(null);
  const [previewImg, setpreviewImg] = useState({
    url: "",
    width: 0,
    height: 0,
  });
  const [isediting, setisEditing] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [navigate, currentUser]);

  useEffect(() => {
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setpreviewImg({
          url: URL.createObjectURL(file),
          width: img.width,
          height: img.height,
        });
      };
    }
  }, [file]);

  const handleSubmit = async () => {
    if (isediting) {
      setisEditing(false);
    } else {
      const formData = new FormData(formref.current);
      formData.append("media", file);
      formData.append("textOptions", JSON.stringify(textOptions));
      formData.append("canvasOptions", JSON.stringify(canvasOptions));

      try {
        const res = await apiRequest.post("/pins", formData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        });
        navigate(`/pin/${res.data._id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="homepage">
      <div className="createTop">
        <h1>{isediting ? "Design your Pin" : "Create Pin"}</h1>
        <button onClick={handleSubmit}>{isediting ? "Done" : "Publish"}</button>
      </div>
      {isediting ? (
        <Editor previewImg={previewImg} />
      ) : (
        <div className="createBottom">
          {previewImg.url ? (
            <div className="preview">
              <img src={previewImg.url} alt="" />
              <div className="editIcon" onClick={() => setisEditing(true)}>
                <IkImage path="/general/edit.svg" alt="" />
              </div>
            </div>
          ) : (
            <>
              <label htmlFor="file" className="upload">
                <div className="uploadTitle">
                  <IkImage path="/general/upload.svg" />
                  <span>Choose a File</span>
                </div>
                <div className="uploadInfo">
                  We recommend using high quality .jpg files less thank 20 files
                  less than 20MB
                </div>
              </label>
              <input
                type="file"
                id="file"
                hidden
                onChange={(e) => setfile(e.target.files[0])}
              />
            </>
          )}
          <form className="createForm" ref={formref}>
            <div className="createFormItem">
              <label htmlFor="">Title</label>
              <input
                type="text"
                placeholder="Add a title"
                name="title"
                id="title"
              />
            </div>
            <div className="createFormItem">
              <label htmlFor="description">Discription</label>
              <textarea
                rows={6}
                type="text"
                placeholder="Add a detail description"
                name="description"
                id="description"
              />
            </div>
            <div className="createFormItem">
              <label htmlFor="link">Link</label>
              <input
                type="text"
                placeholder="Add a link"
                name="link"
                id="link"
              />
            </div>
            <div className="createFormItem">
              <label htmlFor="board">Board</label>
              <select name="board" id="board">
                <option value="">Choose a board</option>
                <option value="">Board 1</option>
                <option value="">Board 2</option>
                <option value="">Board 3</option>
              </select>
            </div>
            <div className="createFormItem">
              <label htmlFor="tags">Tagged topics</label>
              <input type="text" placeholder="Add tags" name="tags" id="tags" />
              <small>Don't worry people wont see your tags</small>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreatePage;
