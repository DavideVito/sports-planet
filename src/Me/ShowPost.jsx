import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const ShowPost = () => {
  const classes = useStyles();

  const { data: user } = useUser();
  const firestore = useFirestore();

  const query = firestore
    .collection("Giocatori")
    .doc(user.uid)
    .collection("Posts")
    .limit(9);

  const { data: posts } = useFirestoreCollectionData(query);

  return (
    <div className={classes.root}>
      <Grid container>
        {posts?.map((post) => (
          <>
            <Grid item key={post.NO_ID_FIELD} xs={6}>
              <Card className={classes.root} className={classes.paper}>
                <iframe style={{width: "100%", height: "100%", minWidth: "700px", minHeight: "666px"}} src={post.link} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {post.didascalia}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Typography size="small" color="primary">
                    Likes {post.like}
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          </>
        ))}
      </Grid>
    </div>
  );
};

export default ShowPost;
