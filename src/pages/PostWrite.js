import React from "react";
import {Grid, Text, Button, Image, Input} from "../elements";
import Upload from "../shared/Upload";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const PostWrite = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  if(!is_login){
    props.history.replace('/login')
  }
  const contents = React.useRef(null)
  const dispatch = useDispatch()
  const addPost = () => {
    dispatch(postActions.addPostFB(contents.current.value));
  }

    return (
      <React.Fragment>
        <Grid padding="16px">
          <Text margin="0px" size="36px" bold>
            게시글 작성
          </Text>
          <Upload/>
        </Grid>

        <Grid>
          <Grid padding="16px">
            <Text margin="0px" size="24px" bold>
              미리보기
            </Text>
          </Grid>

          <Image shape="rectangle" src={preview}/>
        </Grid>

        <Grid padding="16px">
          <Input reff={contents} label="게시글 내용" placeholder="게시글 작성" multiLine />
        </Grid>

        <Grid padding="16px">
          <Button text="게시글 작성" _onClick={addPost}></Button>
        </Grid>
      </React.Fragment>
    );
}

export default PostWrite;