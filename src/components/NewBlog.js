import React, { useState } from 'react';
import { Input, Grid, Typography, Button } from '@material-ui/core';
import { useStyles } from '../styles';
import firebase from '../firebase';
import { useHistory } from 'react-router-dom';

export default function NewBlog() {
  const classes = useStyles();
  const history = useHistory();
  const [newComment, setNewComment] = useState('');

  return (
    <div>
      <Grid container style={{ height: '100vh' }}>
        <Grid item xs></Grid>
        <Grid item xs={8}>
          <div>
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              style={{ marginTop: '100px' }}
            >
              New Blog
            </Typography>
            <Input
              fullWidth
              multiline
              rows={3}
              style={{ fontSize: '25px' }}
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
              value={newComment}
            />
            {newComment && (
              <div className={classes.btnGroup}>
                <Button
                  style={{ marginRight: '10px' }}
                  onClick={() => setNewComment('')}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    const commentRef = firebase.database().ref('comments');
                    const body = {
                      newComment,
                    };
                    commentRef.push(body);
                    setNewComment('');
                    history.push('/');
                  }}
                >
                  Add
                </Button>
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </div>
  );
}
