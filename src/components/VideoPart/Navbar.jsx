import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../../utils/constants";
import SearchBar from "./SearchBar";
import "./index.css";
import { useLocation, useNavigate } from "react-router";
import { logout } from "../../utils/users-reducer";
import { useDispatch } from "react-redux";


const Navbar = () => {
  const username = localStorage.getItem("username");
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutBtnHandler = () => {
    localStorage.clear();
    dispatch(logout());
    window.location.reload();
    navigate("/login");
  };


  return(
  <Stack
    direction="row"
    alignItems="center"
    p={2}
    sx={{
      position: "sticky",
      background: "white",
      top: 0,
      justifyContent: "space-between",
    }}
  >
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img src={logo} alt="logo" height={45} />
    </Link>
    <SearchBar />


    {username === null ? (
      <Link
        style={{
          textDecoration: "none",
          color: "#b0b8bd",
          fontSize: "18px",
          textAlign: "end",
          justifyContent: "end",
          marginLeft: "400px"
        }}
        className={
          path === "/register" ? "fw-bold header-item active" : "fw-bold header-item"
        }
        to="/register"
      >
          <button className="login_button">
            Register
          </button>
      </Link>
    ) : (
      ""
    )}
    {username === null ? (
      <Link
        style={{
          textDecoration: "none",
          color: "#b0b8bd",
          fontSize: "18px",
          margin: "30px"
        }}
        className={path === "/login" ? "fw-bold header-item active justify-content-end" : "fw-bold header-item justify-content-end"}
        to="/login"
      >
          <button className="login_button">
            Log In
          </button>
      </Link>
    ) : (
      ""
    )}
    {username !== null ? (
      <Link
        style={{
          textDecoration: "none",
          color: "#b0b8bd",
          fontSize: "18px",
          marginLeft: "400px"
        }}
        className={
          path === "/logout" ? "fw-bold header-item active" : "fw-bold header-item"
        }
        onClick={logOutBtnHandler}
      >
          <button className="login_button">
            Log Out
          </button>
      </Link>
    ) : (
      ""
    )}
    {username !== null ? (
      <Link
        style={{
          textDecoration: "none",
          color: "#b0b8bd",
          fontSize: "18px",
          margin: "30px"
        }}
        className={
          path === "/profile" ? "fw-bold header-item active" : "fw-bold header-item"
        }
        to="/profile"
      >
        Profile
      </Link>
    ) : (
      ""
    )}

  </Stack>)
};

export default Navbar;
