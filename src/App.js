// import logo from './logo.svg';
import "./App.css";

import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import "bootstrap/scss/bootstrap.scss";
import "./assets/scss/paper-kit.scss?v=1.3.0";
import "./assets/demo/demo.css?v=1.3.0";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/VideoPart/Navbar";
import Footer from "./components/Footer/Footer";
import Register from "./components/RegisterAndLogin/register";
import Login from "./components/RegisterAndLogin/login";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import usersReducer from "./utils/users-reducer";
import ProtectedRoute from "./utils/ProtectedRoute";
import profileReducer from "./utils/profile-reducer";
import planReducer from "./utils/plan-reducer";
import progressReducer from "./utils/progress-reducer";
import ExerciseDetail from "./pages/ExerciseDetail";
import VideoDetail from "components/VideoPart/VideoDetail";
import ChannelDetail from "components/VideoPart/ChannelDetail";
import SearchFeed from "components/VideoPart/SearchFeed";
import AdminManage from "components/AdminManage";

const store = configureStore({
  reducer: {
    users: usersReducer,
    profile: profileReducer,
    plans: planReducer,
    progress: progressReducer,
  },
});
function App() {
  return (
    <Provider store={store}>
      <Box
        width="400px"
        sx={{ width: { xl: "1488px" } }}
        m="auto"
        className={"m-0 w-100"}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path='/video/:id' element={<VideoDetail />} />
          <Route path='/channel/:id' element={<ChannelDetail />} />
          <Route path='/search/:searchTerm' element={<SearchFeed />} />
          <Route path='/admin' element={<AdminManage />} />
        </Routes>
        <Footer />
      </Box>
    </Provider>
  );
}

export default App;
