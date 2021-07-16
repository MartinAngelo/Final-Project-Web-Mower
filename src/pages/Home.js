import React, { useState, useEffect } from "react";
import moment from "moment";
import Navigation from "../pages/Navigation";
import clsx from "clsx";
import firebase from "../utils/firebase";
import { makeStyles } from "@material-ui/core/styles";



import logologo from '../pic/logologo.png'
import {
  TextField,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Button,
  InputAdornment,
  Divider,
  List,
  IconButton,
  CardActions,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/ThumbUpAlt";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ShareIcon from '@material-ui/icons/Share';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    direction: "column",
    height: "100vh",
    width: "100vm",
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    ...theme.mixins.toolbar,
    marginBottom: 2
  },
  divider: {
    marginTop: 1,
    marginBottom: 1
  },
  cardField: {
    marginLeft: 40,
    marginRight: 40
  },
  input: {
    display: "none"
  },
  textPosts: {
    paddingBottom: 10
  }
}));
export default function Home() {
  const db = firebase.firestore();

  const classes = useStyles();
  const [userPosts, setPosts] = useState({
    posts: null
  });


  const [post, setPost] = useState({
    postID: "",
    postContent: ""
  });

  const handleChange = (prop) => (e) => {
    setPost({ ...post, [prop]: e.target.value });
  };
  const createPost = (e) => {
    const currentUser = firebase.auth().currentUser;
    db.collection("posts")
      .add({
        userID: currentUser.uid,
        userName: profile.userName,
        displayName: profile.displayName,
        postContent: post.postContent,
        date_posted: new Date().toISOString(),


      })
      .then((doc) => {
        post.postID = doc.id;
      });
    post.postContent = "";
  };
  const [profile, getProfile] = useState({
    userName: "",
    displayName: "",
    displayPicture: false
  });




  useEffect(() => {
    let abortController = new AbortController();
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const getUser = db.collection("users").doc(currentUser.uid);

    const fetchData = () => {
      db.collection("posts")
        .orderBy("date_posted")
        .onSnapshot((snapshot) => {
          let posts = [];
          snapshot.forEach((doc) => {
            posts.unshift({ ...doc.data(), id: doc.id });
          });
          setPosts({ posts: posts });
        });
      getUser
        .get()
        .then((doc) => {
          if (doc.exists) {
            getProfile({
              userName: "" + doc.data().username,
              displayName: doc.data().firstName + " " + doc.data().lastName,
              displayPicture: doc.data().profilePic
            });
          }

        })
        .catch((err) => {
          console.log(err);
        });
      getUser.collection("likes").onSnapshot((snapshot) => {
        let likes = [];
        snapshot.forEach((doc) => {
          likes.unshift({ ...doc.data(), id: doc.id });
        });

      });
    };
    fetchData();

    return () => {
      setPosts({ posts: null });
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <Navigation />
      <main>
        <div
          className={clsx(classes.content, {
            [classes.contentShift]: true
          })}
        >
          <div className={classes.drawerHeader} />
          <Card variant="outlined" id="cardField">
            <CardContent>
              <TextField
                variant="standard"
                placeholder="What's on your mind?"
                className={classes.postTalk}
                fullWidth
                multiline
                inputProps={{
                  maxLength: 140
                }}
                onChange={handleChange("postContent")}
                value={post.postContent}
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Avatar
                        src={logologo}
                      />
                    </InputAdornment>
                  )
                }}
              />
            </CardContent>
            <Grid id="submitButton">
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                className={classes.input}
              />

              <Button
                id="submitBtn"
                variant="contained"
                color="primary"
                size="small"
                onClick={createPost}
                disableElevation
              >
                Post
              </Button>
            </Grid>
          </Card>
          <List>
            {userPosts.posts &&
              userPosts.posts.map((posts) => {
                return (
                  <Card
                    variant="outlined"
                    id="cardField"
                    elevation={1}
                    key={posts.id}
                  >
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Avatar src={logologo} />
                      </Grid>
                      <Grid item xs zeroMinWidth>
                        <div id="thisPost">
                          <Typography variant="body2">
                            {posts.displayName}
                          </Typography>
                          <Typography variant="body2">
                            {posts.userName}
                          </Typography>
                        </div>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2">
                          {moment(posts.date_posted).fromNow()}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item xs zeroMinWidth>
                        <Typography className={classes.textPosts}>
                          {posts.postContent}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider className={classes.divider} />


                    <CardActions>

                      <IconButton className={classes.button} >
                        <FavoriteIcon />
                        <ChatBubbleOutlineIcon />
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                    

                  </Card>
                );
              })}
          </List>
        </div>
      </main>
    </div>
  );
}
