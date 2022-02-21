import React from "react";
import axios from "axios";
import styled from "styled-components";

const StyledBody = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&family=Poppins:wght@400;500;600&display=swap");
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  background: linear-gradient(120deg, #2980b9, #8e44ad);
  height: 100vh;
  overflow: hidden;
`;
const StyledCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: white;
  border-radius: 10px;
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.05);
`;
const StyledCenterH1 = styled.h1`
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid silver;
`;

const StyledCenterForm = styled.form`
  padding: 0 40px;
  box-sizing: border-box;
`;

const StyledCenterFormTextDiv = styled.div`
  position: relative;
  border-bottom: 2px solid #adadad;
  margin: 30px 0;
`;
const StyledCenterFormTextDivInput = styled.input`
  width: 100%;
  padding: 0 5px;
  height: 40px;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
  & :focus ~ label,
  :valid ~ label {
    top: -5px;
    color: #2691d9;
  }
  & :focus ~ span::before,
  :valid ~ span::before {
    width: 100%;
  }
`;
const StyledCenterFormTextDivLabel = styled.label`
  & {
    position: absolute;
    top: 50%;
    left: 5px;
    color: #adadad;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
    transition: 0.5s;
  }
`;
const StyledCenterFormTextDivSpan = styled.span`
  &::before {
    content: "";
    position: absolute;
    top: 40px;
    left: 0;
    width: 0%;
    height: 2px;
    background: #2691d9;
    transition: 0.5s;
  }
`;

const StyledCenterFormSubmit = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid;
  background: #2691d9;
  border-radius: 25px;
  font-size: 18px;
  color: #e9f4fb;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  &:hover {
    border-color: #2691d9;
    transition: 0.5s;
  }
`;
const StyledSignUpLink = styled.div`
  margin: 30px 0;
  text-align: center;
  font-size: 16px;
  color: #666666;
  & a {
    color: #2691d9;
    text-decoration: none;
  }
  & a:hover {
    text-decoration: underline;
  }
`;
function LoginForm() {
  return (
    <StyledBody>
      <StyledCenter>
        <StyledCenterH1>Login</StyledCenterH1>
        <StyledCenterForm method="post">
          <StyledCenterFormTextDiv>
            <StyledCenterFormTextDivInput type="text" required />
            <StyledCenterFormTextDivSpan></StyledCenterFormTextDivSpan>
            <StyledCenterFormTextDivLabel>Email</StyledCenterFormTextDivLabel>
          </StyledCenterFormTextDiv>
          <StyledCenterFormTextDiv>
            <StyledCenterFormTextDivInput type="password" required />
            <StyledCenterFormTextDivSpan></StyledCenterFormTextDivSpan>
            <StyledCenterFormTextDivLabel>
              Password
            </StyledCenterFormTextDivLabel>
          </StyledCenterFormTextDiv>
          <StyledCenterFormSubmit type="submit" value="Login" />
          <StyledSignUpLink><a href='/'>회원가입</a></StyledSignUpLink>
        </StyledCenterForm>
      </StyledCenter>
    </StyledBody>
  );
}

export default LoginForm;
