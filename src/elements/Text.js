import styled from "styled-components";

const Text = ({ bold, color, size, margin, children, _onClick, width }) => {
  // const { bold, color, size, children } = props;

  const styles = { bold: bold, color: color, size: size, margin: margin , width:width };

  return (
    <P {...styles} onClick={_onClick}>
      {children}
    </P>
  );
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#222831",
  size: "14px",
  margin: false,
  _onClick: () => {},
};

const P = styled.p`
  box-sizing: border-box;
  word-break: break-word;
  white-space:pre-line;
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? 600 : 400)};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.width? `width: ${props.width}; text-align:center;`: "")}
`;

export default Text;
