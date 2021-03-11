import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const Item = styled.div`
  position: absolute;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%;
`;

export const Empty = styled.div`
  position: absolute;
  margin-top: 150px;
  display: flex;
  text-align: center;
  justify-content: center;
  width: 100%;
  font-size: 30px;
  font-weight: 600;
  color: #ddd;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 1);
`;
