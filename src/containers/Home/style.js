import styled, { keyframes } from "styled-components";
import MaterialContainer from "@material-ui/core/Container";

export const Container = styled(MaterialContainer)`
  position: relative;
  height: 100%;
  padding: 16px;
`;

export const Spacer = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ left }) => (left ? "flex-end" : "flex-start")};
  height: 100%;

  .MuiSvgIcon-root {
    font-size: 150px;
    color: #fff;
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

    @media (hover: hover) {
      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;

const ActiveCardIn = keyframes`
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
`;

export const ActiveCard = styled.div`
  padding: 16px 16px 24px 16px;

  animation: ${ActiveCardIn} 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;

export const ActiveCardRegion = styled.div`
  position: relative;
  z-index: 1000;
  margin: 45px -16px 0 -16px;
`;

export const StackOfActorCardsRegion = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
`;
