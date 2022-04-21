import React from "react";
import styled from "styled-components";

const Grid = ({
  height,
  isFlex,
  width,
  padding,
  margin,
  bg,
  children,
  center,
  maxWidth,
  flex,
  position,
  _onClick,
}) => {
  const styles = {
    isFlex: isFlex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
    height: height,
    maxWidth: maxWidth,
    flex: flex,
    position: position,
  };

  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  children: null,
  isFlex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  flex: false,
  position: false,
  _onClick: () => {},
};

const GridBox = styled.div`
  ${(props) =>
    props.position ? `position: sticky; top: 0; z-index: 9999` : ""};
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  height: ${(props) => props.height};
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding}` : "")};
  ${(props) => (props.margin ? `margin: ${props.margin}` : "")};
  ${(props) => (props.bg ? `background-color: ${props.bg}` : "")};
  ${(props) =>
    props.isFlex
      ? `display: flex; align-items: center; justify-content: space-between;`
      : ""};
  ${(props) => (props.center ? `text-align: center;` : "")};
  flex: ${(props) => props.flex};
`;

export default Grid;
