import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Input,
} from '@material-ui/core';

export default function Home() {
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState('');
  const [editComment, setEditComment] = useState('');

  useEffect(() => {
    const ref = firebase.database().ref('comments');

    ref.on(
      'value',
      function (snapshot) {
        const commentsList = [];
        const comments = snapshot.val();
        for (const id in comments) {
          const data = {
            id,
            comment: comments[id].newComment,
          };
          commentsList.push(data);
        }
        setComments(commentsList);
      },
      function (error) {
        console.log('Error: ' + error.code);
      }
    );
  }, []);

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
              Blogs
            </Typography>
            {comments.length === 0 && (
              <Typography
                variant="h5"
                component="h5"
                gutterBottom
                style={{ marginTop: '100px' }}
              >
                There are no Blogs to display
              </Typography>
            )}
            {comments &&
              comments.map((data, index) => {
                const { id, comment } = data;

                return (
                  <Card
                    key={index}
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                    <CardContent>
                      {editItem === id ? (
                        <Input
                          fullWidth
                          multiline
                          rows={3}
                          value={editComment}
                          onChange={(e) => setEditComment(e.target.value)}
                          style={{ fontSize: '25px' }}
                        />
                      ) : (
                        <Typography
                          variant="h5"
                          component="h2"
                          style={{ marginBottom: '20px' }}
                        >
                          {comment}
                        </Typography>
                      )}

                      <CardActions>
                        <Button
                          style={{ color: '#718093' }}
                          size="small"
                          onClick={() => {
                            firebase
                              .database()
                              .ref('comments')
                              .child(id)
                              .remove();
                          }}
                        >
                          Remove
                        </Button>

                        {isEditing && editItem === id ? (
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              const commentRef = firebase
                                .database()
                                .ref('comments/' + id);
                              commentRef.set({
                                newComment: editComment,
                              });
                              setIsEditing(false);
                              setEditItem('');
                              setEditComment('');
                            }}
                          >
                            Save
                          </Button>
                        ) : (
                          <Button
                            style={{ color: '#718093' }}
                            size="small"
                            onClick={() => {
                              setIsEditing(true);
                              setEditItem(id);
                              setEditComment(comment);
                            }}
                          >
                            Edit
                          </Button>
                        )}
                      </CardActions>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </div>
  );
}
