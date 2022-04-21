import React from "react";
import { Grid, Image, Text } from "../elements";
import { history } from "../redux/configureStore";

const Card = ({ imageUrl, userName, postID }) => {
  return (
    <Grid
      _onClick={() => {
        history.push(`/post/${postID}`);
      }}
      padding="16px"
      isFlex
      bg="#ffffff"
      margin="8px 0px"
    >
      <Grid width="auto" margin="0px 8px 0px 0px">
        <Image size={85} shape="square" src={imageUrl} />
      </Grid>
      <Grid>
        <Text>
          <b>{userName}</b>님이 게시글에 댓글을 남겼습니다 :)
        </Text>
      </Grid>
    </Grid>
  );
};

Card.defaultProps = {
  imageUrl: "",
  userName: "",
  postID: null,
};

export default Card;
