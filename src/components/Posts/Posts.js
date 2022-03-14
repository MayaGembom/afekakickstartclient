
import React from 'react';
import { Grid, CircularProgress, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';


const Posts = ({ setCurrentId }) => {

  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  const currentDate = new Date();

  return (

    !posts.length ? <CircularProgress /> : (
      <>
        <h2>Now Funding</h2>
        <Divider style={{ margin: '20px 0' }} />
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {posts.map((post) => (
            (post?.pledgeCount < post?.goal) && (new Date(post?.deadLine) > currentDate) && (
              <Grid key={post._id} item xs={12} sm={10} md={4} lg={3}>
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            )
          ))}
        </Grid>
        <h2>Expired</h2>
        <Divider style={{ margin: '20px 0' }} />
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {posts.map((post) => (
            (post?.pledgeCount < post?.goal) && (new Date(post?.deadLine) < currentDate) && (
              <Grid key={post._id} item xs={12} sm={10} md={4} lg={3}>
                <div style={{ opacity: 0.5, pointerEvents: "none" }}
                  disabled>
                  <Post post={post} setCurrentId={setCurrentId} />
                </div>
              </Grid>
            )
          ))}
        </Grid>
        <h2>Successfully Funded</h2>
        <Divider style={{ margin: '20px 0' }} />
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {posts.map((post) => (
            (post?.pledgeCount >= post?.goal) && (
              <Grid key={post._id} item xs={12} sm={10} md={4} lg={3}>
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            )
          ))}
        </Grid>
      </>
    )


  );
};
export default Posts;