import React from "react";
import { Box, Typography, styled } from "@mui/material";
import bg1 from "../../images/bg1.jpg";

const Image = styled(Box)`
  height: 50vh;
  position: relative;
  width: 100%;
  align-items: center;
  flex-direction: column;
  &::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    background: url(${bg1}) no-repeat center center/cover;
    opacity: 0.75;
    z-index: -1;
  }
`;

const Banner = () => {
  return (
    <Image>
    </Image>
  );
};

export default Banner;
