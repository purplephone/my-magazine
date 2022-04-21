import React, { useEffect, useState } from "react";

import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "../elements";
import { history } from "../redux/configureStore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { IconButton } from "@material-ui/core";

const Like = ({ postId, isLike }) => {
  // post, user id 알기위해 useState로 가져오기
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  // const likeList = useSelector((state) => state.like.list);

  // 체크 안한 상태
  const [checkLike, setCheckLike] = useState(isLike? true: false);

  // 하트누르면 post안에 먹혀서 post detail 페이지로 갔다가 뒤로가기누르면
  // required로 감 ...  아니면 한 번 더 누르거나..
  const updateLike = () => {
    if (!isLogin) {
      window.alert("로그인시 하트를 누를 수 있습니다❤️");
      return history.replace("/login");
    }
  };
  const handleLike = () => {
    if (!checkLike){
      dispatch(postActions.postLikeFB(postId,1))
    } else{
      dispatch(postActions.postLikeFB(postId,-1))
    }
    setCheckLike(!checkLike)
  }
  return (
    <Text _onClick={updateLike}>
      <IconButton
        aria-label="add to favorites"
        color={checkLike ? "secondary" : "default"}
        onClick={handleLike}
      >
        <FavoriteIcon fontSize="large" />
      </IconButton>
    </Text>
  );
};

export default Like;