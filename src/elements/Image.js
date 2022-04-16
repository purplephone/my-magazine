import styled from "styled-components";

const Image = ({ shape, src, size }) => {
  //   const { shape, src, size } = props;

  const styles = {
    src: src,
    size: size,
  };

  if (shape === "circle") {
    return <ImageCircle {...styles}></ImageCircle>;
  }

  if (shape === "rectangle") {
    return (
      <AspectOutter>
        <AspectInner {...styles} />
      </AspectOutter>
    );
  }

  return <></>;
};

Image.defaultProps = {
    shape:"circle",
    src:"https://mblogthumb-phinf.pstatic.net/MjAyMTAzMjlfMTg0/MDAxNjE3MDIxODU4MzIx.jRX9zgbSwS7rFSZlnvThnvAn0DUwsy_CYvZJtRQV57kg.QXB3bRcMm-NsjUOAoW2NwiuxnC_ihrSYjctjaD_w4Wog.JPEG.nohns76/SE-c0d1e18b-8f96-4b54-aab4-2bd8fb81e067.jpg?type=w800",
    size: 36,
}

const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
  border: 1px solid #ccc;
`;
export default Image;