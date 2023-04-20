import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupThunk } from "../utils/users-thunks";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegisterBtn = () => {
    if (
      username === "" ||
      password === "" ||
      userType === ""
    ) {
      setError("Error! Fields below must be filled!");
      return;
    }
    setError(null);
    console.log("userType is: ", userType);
    const newUser = { username, password, userType };
    dispatch(signupThunk(newUser)).then((res) => {
      console.log(res);
      if (res.error) {
        setError("Registration failed! Username already exists!");
      } else {
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (currentUser || username) {
      navigate("/profile");
    }
  }, [currentUser, navigate]);

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership
            </h6>
          </div>
          <div>
            <label for="select-user-type" className="label">
              Please Select Your User Type
            </label>
            <br />
            <select
              id="select-user-type"
              className="dropdown"
              onChange={(e, item) => {
                setUserType(item.value);
              }}
            >
              <option value="USER">User</option>
              <option value="BLOGGER">Blogger</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div className="form">
            <input
              type="username"
              placeholder="User Name"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </div>
          <button onClick={handleRegisterBtn}>Sign Up</button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 1.4rem;
        h1 {
          padding: 0 25rem;
        }
      }
      .label {
        font-size: 0.85rem;
        font-weight: bold;
      }
      .dropdown {
        height: 50px;
        width: 150%;
        font-size: 1.2rem;
        color: gray;
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
        }
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
      }
    }
  }
`;