import React from "react";
import "./stylesheets/App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WithoutNav from "./components/WithoutNav";
import WithNav from "./components/WithNav";
import Feeds from "./pages/Feeds";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Profile from "./pages/Profile";
import LikedPosts from "./pages/LikedPosts";
import Connections from "./pages/Connections";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <div className="App">
      <SkeletonTheme baseColor=" #d0cdcc " highlightColor="#ece6e5">
        <Provider store={store}>
          <Router>
            <Routes>
              <Route element={<WithoutNav />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
              <Route element={<WithNav />}>
                <Route
                  path="/feeds"
                  element={<ProtectedRoutes component={Feeds} />}
                />
                <Route
                  path="/profile"
                  element={<ProtectedRoutes component={Profile} />}
                />
                <Route
                  path="/liked-posts"
                  element={<ProtectedRoutes component={LikedPosts} />}
                />
                <Route
                  path="/connections"
                  element={<ProtectedRoutes component={Connections} />}
                />
              </Route>
            </Routes>
          </Router>
        </Provider>
      </SkeletonTheme>
    </div>
  );
}

export default App;
