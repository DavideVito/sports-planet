import { useFirestore, useFirestoreCollectionData } from "reactfire";
import React, { useState, useEffect } from "react";
import {
  incrementa,
  pushToArray,
  removeFromArray,
  serverTimestamp,
} from "../FirebaseStuff";
import Commento from "./Commento";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Modal from "@material-ui/core/Modal";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import StarIcon from "@material-ui/icons/Star";
import "./Post.css";
import { v4 as uuid } from "uuid";
import { TextField } from "@material-ui/core";

function getModalStyle() {
  return {
    top: "50%",
    width: "50%",
    margin: "auto",
    backgroundColor: "white",
    position: "relative",
    padding: "100px",
  };
}
const Post = ({ post, user }) => {
  const firestore = useFirestore();
  const [like, setLike] = useState(post.like ?? 0);
  const [isLiked, setIsLiked] = useState(false);
  const [mostraCommenti, setMostraCommenti] = useState(false);

  const [showAddCommento, setAddCommento] = useState(false);
  const [testo, setTesto] = useState("");

  const share = async () => {
    const shareData = {
      title: post.titolo,
      text: post.sottotitolo,
      url: post.link,
    };
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let ris = post.likedBy.includes(user.uid);

    setIsLiked(ris);
  }, [post]);

  const postRef = firestore
    .collection("Giocatori")
    .doc(post.owner.uid)
    .collection("Posts")
    .doc(post.id);

  const commentiRef = postRef.collection("Commenti").limit(10);

  const commentData = useFirestoreCollectionData(commentiRef);

  const mettiLike = () => {
    if (isLiked) {
      return;
    }
    postRef.set(
      {
        like: incrementa(1),
        likedBy: pushToArray(user.uid),
      },
      { merge: true }
    );
    setLike(like + 1);
    setIsLiked(true);
  };

  const togliLike = () => {
    if (!isLiked) {
      return;
    }
    post.likedBy = post.likedBy.filter((item) => {
      return item !== user.uid;
    });

    postRef.set(
      {
        like: incrementa(-1),
        likedBy: removeFromArray(user.uid),
      },
      { merge: true }
    );
    setLike(like - 1);
    setIsLiked(false);
  };

  const addCommento = (e) => {
    e.preventDefault();
    const nome = uuid();
    if (!testo) return alert("Scrivi un commento.");
    const data = {
      id: nome,
      data: serverTimestamp(),
      testo,
      owner: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
    };
    postRef
      .collection("Commenti")
      .doc(nome)
      .set(data)
      .then(() => {
        setTesto("");
      });
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
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
  }));
  const classes = "";

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

  const segui = () => {
    firestore
      .collection("Giocatori")
      .doc(user.uid)
      .update({ utentiSeguiti: pushToArray(post.owner.uid) });
  };

  return (
    <Grid item key={post.id} xs={12}>
      <div className="card_wrapper">
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                <img src={post.owner.photoURL} />
              </Avatar>
            }
            action={
              <IconButton aria-label="settings" onClick={segui}>
                <StarIcon />
              </IconButton>
            }
            title={
              <div>
                <h2>{post.owner.displayName}</h2>
                <h3>{post.titolo}</h3>
                <h5>{post.dataPostato.toDate().toLocaleDateString() || ""}</h5>
              </div>
            }
          />
          <CardMedia>
            <iframe
              style={{
                width: "100%",
                height: "100%",
              }}
              className="iframe"
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
            <div>
              {like}
              {isLiked ? (
                <button
                  className="button like"
                  style={{ padding: "10px", marginLeft: "10px" }}
                  onClick={togliLike}
                >
                  Togli Like
                </button>
              ) : (
                <button
                  className="button like"
                  style={{ padding: "10px", marginLeft: "10px" }}
                  onClick={mettiLike}
                >
                  <FavoriteIcon></FavoriteIcon> Metti Like
                </button>
              )}
            </div>
            <IconButton aria-label="share">
              <div>
                <ShareIcon onClick={share}></ShareIcon>
                <Modal
                  style={{ background: "none" }}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <div style={modalStyle} className={classes.paper}>
                    <h2 id="simple-modal-title">
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
            <CardContent>
              <strong>{post.sottotitolo}</strong>
              <br />
              <br />
              <button
                className={"button"}
                style={{ padding: "10px", width: "100%" }}
                onClick={() => {
                  setMostraCommenti(!mostraCommenti);
                }}
              >
                {!mostraCommenti ? "Mostra Commenti" : "Chiudi"}
              </button>
              <br />
              <br />
              {mostraCommenti && (
                <>
                  <div>
                    {commentData.data && (
                      <strong>
                        <p>Commenti</p>
                      </strong>
                    )}
                    <div>
                      {commentData.data?.map((commento) => {
                        return (
                          <Commento
                            testo={commento.testo}
                            owner={commento.owner}
                            data={commento.data}
                            key={commento.id}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <button
                      className={"button"}
                      style={{ padding: "10px" }}
                      onClick={() => {
                        setAddCommento(!showAddCommento);
                      }}
                    >
                      {!showAddCommento ? "Aggiungi un commento" : "Chiudi"}
                    </button>
                    <br />
                    <br />
                    {showAddCommento && (
                      <form onSubmit={addCommento}>
                        <strong>Aggiungi commento</strong> <br />
                        <TextField
                          style={{
                            width: "300px",
                            height: "",
                            marginBottom: "5px",
                          }}
                          type="text"
                          placeholder="Commento"
                          value={testo}
                          onChange={(e) => setTesto(e.target.value)}
                        />
                        <br />
                        <button
                          className={"button"}
                          type="submit"
                          style={{ padding: "10px" }}
                        >
                          Aggiungi
                        </button>
                      </form>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </Grid>
  );
};

export default Post;
