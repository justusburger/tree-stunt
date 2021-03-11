import styled from "styled-components";

export const Card = styled.div`
  box-shadow: 0 -10px 5px -10px rgba(0, 0, 0, 0.2),
    0 17px 15px -15px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  background: #fff;
  overflow: hidden;
`;

export const Avatar = styled.div`
  padding-top: 120%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

export const Name = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 2.5;
`;

export const ContentRegion = styled.div`
  padding: 8px 16px 16px 16px;
`;

export const Bio = styled.div`
  font-size: 10px;
`;

export const AgeLabel = styled.div`
  display: inline-block;
  font-weight: normal;
`;
