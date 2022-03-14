import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Typography, Paper, Select, MenuItem, InputLabel, FormControl,
} from '@material-ui/core';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { QuantityPicker } from 'react-qty-picker';

import useStyles from './styles';
import { createPost } from '../../actions/posts';
import Footer from '../Footer';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', description: '', link: '', vdlink: '', category: '', goal: 0, selectedFile: '', deadLine: new Date() });
  const post = useSelector((state) => (currentId ? state.posts.find((description) => description._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', description: '', link: '', vdlink: '', category: '', goal: 0, selectedFile: '', deadLine: new Date() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid(postData)) {
      alert("Invalid Input")
      return;
    }
    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In
        </Typography>
      </Paper>
    );
  }

  const isFormValid = (postData) => {
    if (!isControlValid(postData.title) || !isControlValid(postData.description) || !isControlValid(postData.link) || !isControlValid(postData.vdlink) || !isControlValid(postData.category) || !isControlValid(postData.selectedFile)) {
      return false;
    }

    if (postData.goal <= 0) {
      return false;
    }

    return true;
  }

  const isControlValid = (value) => {
    return value != undefined && value.trim() != "";
  }


  return (
    <>
      <br></br>
      <br></br>
      <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Bring your creative project to life'}</Typography>
          <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <TextField name="description" variant="outlined" label="Description" fullWidth multiline rows={4} value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
          <TextField name="link" variant="outlined" label="Link" fullWidth value={postData.link} onChange={(e) => setPostData({ ...postData, link: e.target.value })} />
          <TextField name="vdlink" variant="outlined" label="Youtube Link" fullWidth value={postData.vdlink} onChange={(e) => setPostData({ ...postData, vdlink: e.target.value })} />
          <FormControl className={`${classes.formControl}`} fullWidth variant="outlined">
            <InputLabel htmlFor="category-select-label">  Category</InputLabel>
            <Select name="category" labelId="category-select-label" fullWidth value={postData.category} label="Category" onChange={(e) => setPostData({ ...postData, category: e.target.value })}>
              <MenuItem value={"General"}>General</MenuItem>
              <MenuItem value={"Games"}>Games</MenuItem>
              <MenuItem value={"Fashion"}>Fashion</MenuItem>
              <MenuItem value={"Tech"}>Tech</MenuItem>
              <MenuItem value={"Health"}>Health</MenuItem>
              <MenuItem value={"Sport"}>Sport</MenuItem>
            </Select>
            <DateTimePickerComponent variant="outlined" placeholder="Choose a Date and time" min={new Date()} format="dd-MMM-yy HH:mm" fullWidth label="Deadline" onChange={(e) => setPostData({ ...postData, deadLine: e.value })} />
          </FormControl>
          <label className={classes.labelGoal}>Goal:
            <QuantityPicker smooth min={0} onChange={(value) => setPostData({ ...postData, goal: value })} />
          </label>
          <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
          <Button className={classes.buttonClear} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>

      </Paper>
      <Footer />
    </>
  );
};

export default Form;