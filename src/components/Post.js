import React from "react";
import { Grid, Image, Text } from "../elements";

const Post = (props) => {
  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex>
          <Image shape="circle" src={props.src}></Image>
          <Text bold>
              {props.userNickname}
          </Text>
          <Text bold>
              {props.created}
          </Text>
        </Grid>
        <Grid padding="16px">
            <Text >{props.content}</Text>
        </Grid>

        <Grid>
          <Image shape="rectangle" src={props.imageUrl}></Image>
        </Grid>
        
        <Grid is_flex>
            <Text bold>댓글 몇개</Text>
            <Text bold>❤ {props.likeCnt}</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Post;