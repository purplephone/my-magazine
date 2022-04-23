import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text, Button, Input } from "../elements";
import Upload from "../shared/Upload";
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";
import { useParams } from "react-router-dom";
import PostLayout from "../components/PostLayout";

const PostWrite = () => {
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.image.preview);
  const postList = useSelector((store) => store.post.list);
  const { postId } = useParams();

  const isEdit = postId ? true : false;
  const post = isEdit ? postList.find((p) => p.postId == postId) : null;
  const [layout,setLayout] = React.useState(isEdit? post.layout: "top")
  const [content,setContent] = React.useState(post ? post.content : "")
  
  const handleContent = (e) => {
    setContent(e.target.value)
  }

  useEffect(() => {
    if (isEdit && !post) {
      console.log("POST UNDEFINED");
      history.goBack();
      return;
    }

    if (isEdit) {
      dispatch(imageActions.setPreview(post.imageUrl));
    }
  }, [post, dispatch, isEdit]);

  const addPost = () => {
    if (!content) {
      alert("게시글 내용을 입력해주세요!");
      return;
    }

    dispatch(postActions.addPostFB(content, layout));
  };

  const editPost = () => {

    if (!content) {
      alert("게시글 내용을 입력해주세요!");
      return;
    }
    dispatch(postActions.editPostFB(postId, { content: content, layout:layout}));
  };

  const handleLayout = (lay) => {
    setLayout(lay)
  }

  // if (!isLogin) {
  //   return (
  //     <Grid
  //       bg="white"
  //       height="calc(100vh - 46px)"
  //       margin="100px 0"
  //       padding="16px"
  //       center
  //     >
  //       <Text size="32px" bold>
  //         PLEASE WAIT!
  //       </Text>
  //       <Text size="16px">You can write after login!</Text>
  //       <Button
  //         text="로그인 하러가기"
  //         _onClick={() => {
  //           history.replace("/login");
  //         }}
  //       ></Button>
  //     </Grid>
  //   );
  // }

  return (
    <React.Fragment>
      <Grid bg="white" height="100%" margin="20px 0">
      <Grid isFlex>
        <Button
          text="layout1"
          _onClick={() => {
            handleLayout("top")
          }}
        ></Button>
        <Button
          text="layout2"
          _onClick={() => {
            handleLayout("bottom")
          }}
        ></Button>
        <Button
          text="layout3"
          _onClick={() => {
            handleLayout("left")
          }}
        ></Button>
        <Button
          text="layout4"
          _onClick={() => {
            handleLayout("right")
          }}
        ></Button>
      </Grid>
        <Grid padding="16px">
          <Text margin="0px" size="32px" bold>
            {isEdit ? "게시글 수정" : "게시글 작성"}
          </Text>

          <Upload />
          
        </Grid>

        <PostLayout _onChange={handleContent} layout={layout} content={content} preview={preview}></PostLayout>

      <Grid padding="16px">
        <Input
          label="게시글 내용"
          placeholder="게시글 작성"
          value={content}
          _onChange={handleContent}
          multiLine
        />
      </Grid>

        <Grid padding="16px">
          {isEdit ? (
            <Button text="게시글 수정" _onClick={editPost}></Button>
          ) : (
            <Button text="게시글 작성" _onClick={addPost}></Button>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
