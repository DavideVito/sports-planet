import {
  useFirestore,
  useFirestoreDocDataOnce,
  useUser,
  AuthCheck,
  useFirestoreCollectionData,
} from "reactfire";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { pushToArray } from "../components/FirebaseStuff";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Post from "../components/Post/Post";
import AddPost from "../components/Post/AddPost";
import "./home.css";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardActionArea from "@material-ui/core/CardActionArea";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import StarIcon from "@material-ui/icons/Star";
import AddIcon from "@material-ui/icons/Add";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import NavigationIcon from "@material-ui/icons/Navigation";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import SimpleModal from "../components/modal";
import logo from "../Images/logo.png";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import mettiLike from "../components/Post/Post";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

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

const ShowPost_followed = () => {
  const { data: user } = useUser();

  const [post, setPost] = useState(null);
  const [userData, setUserdata] = useState(null);

  const firestore = useFirestore();

  const getUserData = async () => {
    const ref = firestore.collection("Giocatori").doc(user.uid);
    const doc = await ref.get();

    const dati = doc.data();
    setUserdata(dati);
  };

  const getPostDellePersoneCheSegui = async (utente) => {
    const utentiSeguiti = utente.utentiSeguiti;
    let oggi = new Date();
    let ieri = new Date(new Date().setDate(oggi.getDate() - 3));

    if (!utentiSeguiti) {
      return;
    }

    const promises = utentiSeguiti.map(async (utente) => {
      return await firestore
        .collection("Giocatori")
        .doc(utente)
        .collection("Posts")
        .where("dataPostato", ">", ieri)
        .where("dataPostato", "<=", oggi)
        .orderBy("dataPostato", "desc")
        .orderBy("like", "desc")
        .limit(30)
        .get();
    });

    const documenti = await Promise.all(promises);

    let lista = [];

    documenti.forEach((documento) => {
      let a = documento.docs.map((d) => {
        return { id: d.id, ...d.data() };
      });

      lista = [...a, ...lista];
    });

    setPost(lista);
  };

  useEffect(() => {
    if (!userData) {
      getUserData();
      return;
    }
    if (post) return;

    const funzioneAsincrona = async () => {
      getPostDellePersoneCheSegui(userData);
    };

    funzioneAsincrona();
  }, [userData]);

  return (
    <div class="heading-buttons">
      {post ? (
        <div>
          {post.map((p) => {
            return <Post key={p.id} post={p} user={user} />;
          })}
        </div>
      ) : (
        <div>
          <br /> <h2>Non ci sono post</h2>
        </div>
      )}
    </div>
  );
};

const ShowPost_General = () => {
  const { data: user } = useUser();

  const firestore = useFirestore();

  const query = firestore.collectionGroup("Posts").limit(10);

  const posts = useFirestoreCollectionData(query);

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

  if (posts.status === "loading") return "Loading";

  return (
    <div className={classes.root}>
      <Grid container>
        {posts?.data?.map((post) => {
          return <Post post={post} user={user}></Post>;
        })}
      </Grid>
    </div>
  );
};

const ScrollableTabsButtonForce = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Scopri" icon={<AllInboxIcon />} {...a11yProps(0)} />
          <Tab label="Fan" icon={<StarIcon />} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel class="secondary-tabs" value={value} index={0}>
        <ShowPost_General />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h2>Qui troverai tutti i post degli utenti seguiti</h2>
        <span>
          Clicca l'icona <StarIcon></StarIcon> per aggiungere un utente ai
          preferiti ricevendo notifiche e visualizzando tutti i suoi post
        </span>

        <ShowPost_followed />
      </TabPanel>
    </div>
  );
};

const useStyles_buttons_post = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Home = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [valueChild, setValueChild] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes_button_post = useStyles_buttons_post();

  const handleChangeChild = (event, newValueChild) => {
    setValueChild(newValueChild);
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const firestore = useFirestore();

  const [showAddPost, setShowAddPost] = useState(false);
  const { data: user } = useUser();

  const [giocatoriTrovati, setGiocatoriTrovati] = useState([]);

  const cerca = async () => {
    const cercaInput = document.getElementById("cerca");
    const cercaText = cercaInput.value;

    const strlength = cercaText.length;
    const strFrontCode = cercaText.slice(0, strlength - 1);
    const strEndCode = cercaText.slice(strlength - 1, cercaText.length);

    const startcode = cercaText;
    const endcode =
      strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

    const ref = firestore
      .collection("Giocatori")
      .where("displayName", ">=", startcode)
      .where("displayName", "<", endcode);
    let data = await ref.get();

    data = data.docs;

    let giocatoriTrovatiTemp = data.map((giocatore) => giocatore.data());

    setGiocatoriTrovati(giocatoriTrovatiTemp);
  };

  const cercaCalcio = () => {
    cercaPerSport("Calcio");
  };
  const cercaBasket = () => {
    cercaPerSport("Basket");
  };
  const cercaPallavolo = () => {
    cercaPerSport("Pallavolo");
  };

  const cercaPerSport = async (sport) => {
    const ref = firestore.collection("Giocatori").where("sport", "==", sport);

    let data = await ref.get();

    data = data.docs;

    let giocatoriTrovatiTemp = data.map((giocatore) => giocatore.data());

    setGiocatoriTrovati(giocatoriTrovatiTemp);
  };

  const segui = (giocatore) => {
    firestore
      .collection("Giocatori")
      .doc(user.uid)
      .update({ utentiSeguiti: pushToArray(giocatore) });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ display: "flex" }}>
        <img
          className="d-none d-sm-none d-md-block"
          style={{ width: "80px", height: "70px", position: "absolute" }}
          src={logo}
          alt="logo"
        />
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab
            icon={<HomeIcon />}
            label=" Home"
            href="/home"
            {...a11yProps(0)}
          />
          <LinkTab
            icon={<SearchIcon />}
            label="Cerca"
            href="/cerca"
            {...a11yProps(1)}
          />
          <LinkTab
            icon={<AddIcon />}
            label="Posta"
            href="/posta"
            {...a11yProps(2)}
          />
          <LinkTab
            icon={<AccountCircleIcon />}
            label="Profilo"
            href="/profilo"
            {...a11yProps(3)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div class="fixed-bottom">
          <div className={classes_button_post.root}>
            <Fab
              href="/me"
              color="secondary"
              aria-label="edit"
              variant="extended"
            >
              <AccountCircleIcon style={{ marginRight: "5px" }} />
              Profilo
            </Fab>
            <Fab color="primary" aria-label="edit" variant="extended">
              <EditIcon style={{ marginRight: "5px" }} />
              <SimpleModal></SimpleModal>
            </Fab>
            <Fab color="primary" aria-label="edit" onClick={scrollTop}>
              <UpIcon />
            </Fab>
            <Fab color="secondary" aria-label="Help" href="/help">
              <strong>?</strong>
            </Fab>
          </div>
        </div>
        <ScrollableTabsButtonForce></ScrollableTabsButtonForce>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-12 col-sm-12">
              <Card>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://a-static.besthdwallpaper.com/uefa-champions-league-2019-2020-official-ball-wallpaper-33649_L.jpg"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Calcio
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Cerca tra Giocatori, allenatori, squadre e molto altro
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" onClick={cercaCalcio}>
                    Mostra risultati
                  </Button>
                </CardActions>
              </Card>
            </div>
            <div class="col-lg-4 col-md-12 col-sm-12">
              <Card>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Basket
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Cerca tra Giocatori, allenatori, squadre e molto altro
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" onClick={cercaBasket}>
                    Mostra risultati
                  </Button>
                </CardActions>
              </Card>
            </div>
            <div class="col-lg-4 col-md-12 col-sm-12">
              <Card>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="http://trumpwallpapers.com/wp-content/uploads/Volleyball-Wallpaper-03-5184x3456-1-scaled.jpg"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Pallavolo
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Cerca tra Giocatori, allenatori, squadre e molto altro
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" onClick={cercaPallavolo}>
                    Mostra risultati
                  </Button>
                </CardActions>
              </Card>
            </div>
          </div>
          <div class="input-group">
            <input
              id="cerca"
              type="search"
              class="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <button
              type="button"
              class="btn btn-outline-primary"
              onClick={cerca}
            >
              search
            </button>
          </div>
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Squadra</th>
                  <th scope="col">Nazionalit??</th>
                  <th scope="col">Segui</th>
                </tr>
              </thead>
              {giocatoriTrovati.map((giocatore) => {
                return (
                  <tbody>
                    <tr>
                      <th scope="row"></th>
                      <td>
                        <a href={`/user/${giocatore.uid}`}>
                          {giocatore.displayName}
                        </a>
                      </td>
                      <td>{giocatore.squadra}</td>
                      <td>{giocatore.nazionalita}</td>
                      <td>
                        <button
                          onClick={() => {
                            segui(giocatore.uid);
                          }}
                        >
                          <StarIcon />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className={classes_button_post.root}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => (window.location.href = "/chats")}
          >
            Vai alle chat
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={(e) => {
              setShowAddPost(!showAddPost);
            }}
          >
            {!showAddPost ? <div>Aggiungi un post</div> : <div>Chiudi</div>}
          </Button>

          {showAddPost && <AddPost user={user} />}
          <Fab color="primary" aria-label="edit" variant="extended">
            <EditIcon style={{ marginRight: "5px" }} />
            <SimpleModal></SimpleModal>
          </Fab>
          <Fab href="/me" variant="extended">
            <NavigationIcon className={classes_button_post.extendedIcon} />
            Vai ai tuoi post
          </Fab>
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div className="centered-div">
          <Fab href="/me" variant="extended">
            <AccountCircleIcon className={classes_button_post.extendedIcon} />
            Clicca qui per visitare il tuo profilo personale
          </Fab>
        </div>
      </TabPanel>
    </div>
  );
};

export default Home;
