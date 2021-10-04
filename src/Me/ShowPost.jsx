import "firebase/storage";
import {
  useFirestore,
  useFirestoreCollectionData,
  useUser,
  useStorage,
} from "reactfire";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardMedia from "@material-ui/core/CardMedia";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import React from "react";
import { red } from "@material-ui/core/colors";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  paper: {
    position: "absolute",
    width: 500,
    background: "transparent",
    border: "2px solid #000",
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    backgroundColor: "white",
  };
}

const ShowPost = () => {
  const { data: user } = useUser();
  const firestore = useFirestore();
  const storage = useStorage();

  const eliminaVideo = (post) => {
    storage.ref(`video/${post.id}`).delete();
    firestore
      .collection("Giocatori")
      .doc(user.uid)
      .collection("Posts")
      .doc(post.id)
      .delete()
      .then(() => {
        console.log(`Video ${post.id} eliminato`);
      });
  };

  const query = firestore
    .collection("Giocatori")
    .doc(user.uid)
    .collection("Posts")
    .limit(9);

  const { data: posts } = useFirestoreCollectionData(query);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        {posts?.map((post) => (
          <>
            <Grid item key={post.id} xs={12}>
              <div className="card_wrapper">
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        <img src={user.photoURL} />
                      </Avatar>
                    }
                    action={
                      <IconButton
                        aria-label="settings"
                        onClick={() => {
                          eliminaVideo(post);
                        }}
                      >
                        <div>Elimina video</div>
                      </IconButton>
                    }
                    title={<h3>{post.titolo}</h3>}
                  />
                  <CardMedia>
                    <iframe
                      title={Math.random()}
                      style={{
                        width: "100%",
                        height: "100%",
                        minWidth: "700px",
                        minHeight: "666px",
                      }}
                      src={post.link}
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography
                      style={{ fontSize: "24px" }}
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {post.didascalia}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    {post.like}
                    <IconButton aria-label="share">
                      <div>
                        <ShareIcon onClick={handleOpen}></ShareIcon>
                        <Modal
                          style={{ background: "none" }}
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="simple-modal-title"
                          aria-describedby="simple-modal-description"
                        >
                          <div style={modalStyle} className={classes.paper}>
                            <h2 id="simple-modal-title">
                              {" "}
                              Condividi il video con questo link
                            </h2>
                            <p id="simple-modal-description">{post.link}</p>
                          </div>
                        </Modal>
                      </div>
                    </IconButton>
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>{post.sottotitolo}</CardContent>
                  </Collapse>
                </Card>
              </div>
            </Grid>
          </>
        ))}
      </Grid>
    </div>
  );
};

export default ShowPost;
