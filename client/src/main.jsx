import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Homepage from "./routes/homepage/homepage";
// import CreatePage from "./routes/CreatePage/CreatePage";
// import PostPage from "./routes/Postpage/PostPage";
// import AuthPage from "./routes/authPage/authPage";
// import SearchPage from "./routes/searchPage/searchPage";
// import ProfilePage from "./routes/profilePage/profilePage";
import MainLayouts from "./routes/layouts/mainLayouts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Homepage = React.lazy(() => import("./routes/homepage/homepage"));
const CreatePage = React.lazy(() => import("./routes/CreatePage/CreatePage"));
const PostPage = React.lazy(() => import("./routes/Postpage/PostPage"));
const ProfilePage = React.lazy(() =>
  import("./routes/profilePage/profilePage")
);
const SearchPage = React.lazy(() => import("./routes/searchPage/searchPage"));
const AuthPage = React.lazy(() => import("./routes/authPage/authPage"));
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayouts />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/pin/:id" element={<PostPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/:username" element={<ProfilePage />} />
          </Route>
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
