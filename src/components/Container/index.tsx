import { StyledContainer } from "./styles";
import { ContainerProps } from "../types";
import React from 'react';


const Container = ({ border, children }: ContainerProps) => (
  <StyledContainer border={border}>{children}</StyledContainer>
);

export default Container;
