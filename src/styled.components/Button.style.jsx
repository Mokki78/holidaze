import styled from "styled-components";

export const Button = styled.button`
  background-color: white;
  border: 0.5px solid black;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color linear 800ms;

  :hover {
    background-color: black;
    color: white;
    animation-name: fade;
    animation-duration: 1.5s;
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
