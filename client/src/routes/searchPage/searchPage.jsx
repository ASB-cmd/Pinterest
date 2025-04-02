import { useSearchParams } from "react-router-dom";
import Gallery from "../../components/gallerry/gallery";
import "./searchPage.css";

const SearchPage = () => {
  let [searchparams] = useSearchParams();

  const search = searchparams.get("search");
  const boardId = searchparams.get("boardId");

  return <Gallery search={search} boardId={boardId} />;
};

export default SearchPage;
