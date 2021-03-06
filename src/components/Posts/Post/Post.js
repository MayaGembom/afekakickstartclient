import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import ProgressBar from "../../ProgressBar";
import FormDialog from "../../FormDialog";
import { useHistory } from 'react-router-dom';

import { deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  const history = useHistory();

  const openPost = (e) => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
        <div className={classes.overlay}>
          <Typography className={classes.title} variant="h6">{post.title}</Typography>
          <Typography variant="body2"><bold>Expired: </bold>{moment(post.deadLine).fromNow()}</Typography>
        </div>

        <div className={classes.details}>
          <span className={classes.tag}> {post.category} </span>
        </div>

        <CardContent>
          <label>Creator: </label>
          <Typography className={classes.creator} gutterBottom variant="h6" component="h2">{post.name}</Typography>
          <label>Description: </label>
          <Typography variant="body1" color="textSecondary" component="h2">{post.description}</Typography>
          <label>Goal: </label>
          <Typography variant="body2" color="textSecondary" component="h2">{post.goal}$</Typography>
        </CardContent>
        <ProgressBar
          className={classes.details}
          key={post.id}
          bgcolor={"#47bcd4"}
          completed={Math.round((post.pledgeCount / post.goal) * 100)}
        />
      </ButtonBase>
      <FormDialog p={post._id} />

      <CardActions className={classes.cardActions}>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator || user?.result?._id === '622e4bc058dd7755f85a81c2') && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;