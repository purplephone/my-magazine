import React from "react";
import Post from "../components/Post";
import Permit from "../shared/Permit";
import { Button } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) =>{
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list)

    React.useEffect(() => {
        if (post_list.length === 0){
            dispatch(postActions.getPostFB())
        }
    }, [])
    return(
        <React.Fragment>
            {post_list.map((li, i) => {
                return <Post key={i} {...li}/>
            })}
        <Permit>
          <Button is_float text="+" _onClick={() =>{props.history.push('/write')}}></Button>
        </Permit>
        </React.Fragment>
    )
}

export default PostList