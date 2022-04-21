import React from "react";
import { Grid, Image, Text } from "../elements";

const PostLayout = ({layout,preview, content}) => {
        if (layout==="bottom"){ 
        return(<React.Fragment>
          <Grid>

            <Text
                width="100%"
              >
                {content}
              </Text>

            <Image
              shape="rectangle"
              src={preview ? preview : "http://via.placeholder.com/400x300"}
            />
          </Grid>
        </React.Fragment>)
        }

        if (layout==="top"){ 
            return(<React.Fragment>
          <Grid>

            <Image
              shape="rectangle"
              src={preview ? preview : "http://via.placeholder.com/400x300"}
            />
            <Text
                width="100%"
              >
                {content}
              </Text>
          </Grid>

        </React.Fragment>)
        }

        if (layout==="left"){ 
            return(<React.Fragment>
          <Grid>
            <Grid isFlex>
              <Image
                shape="rectangle"
                divide
                src={preview ? preview : "http://via.placeholder.com/400x300"}
              />
              <Text
                width="50%"
              >
                {content}
              </Text>
            </Grid>
            
          </Grid>
        </React.Fragment>)
        }

        if (layout==="right"){ 
            return(<React.Fragment>
          <Grid>
            <Grid isFlex>
              <Text
                width="50%"
              >
                {content}
              </Text>
              <Image
                shape="rectangle"
                divide
                src={preview ? preview : "http://via.placeholder.com/400x300"}
              />
            </Grid>
            
          </Grid>
        </React.Fragment>)
        }
        return null
}

export default PostLayout