import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import ProgressBar from '../ProgressBar';
import FormDialog from '../FormDialog';

import { getPost } from '../../actions/posts';
import useStyles from './styles';
import { Link } from '@mui/material';

const Post = () => {
  const { post, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>

          <div><br></br>
            <span className={classes.tag}> {post.category} </span>
            <br></br>
          </div>
          <Typography variant="h6">
            Created by:
            {post.name}
          </Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>{post.description}</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <ProgressBar
            className={classes.details}
            key={post.id}
            bgcolor={"#47bcd4"}
            completed={Math.round((post.pledgeCount / post.goal) * 100)}
          />
          <Typography variant="body1" align='center'><strong>{post.pledgeCount} $ Raised From {post.goal} $ Main Goal</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <center>
            <Link href={post.link} fontSize={"3em"}>Project's Link</Link>
          </center>
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>

      <iframe width="100%" height="500" src={`https://www.youtube.com/embed/${post.vdlink}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <br></br> <br></br>
      <FormDialog p={post._id} />
    </Paper>
  );
};

export default Post;
