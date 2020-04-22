import React, { useState, useEffect } from "react";
import Firebase from "../firebase";
import {
  Paper,
  Avatar,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const Dashboard = ({ history, classes }) => {
  const [username, setUsername] = useState("");
  const [quote, setQuote] = useState("");
  useEffect(() => {
    Firebase.getQuote().then(setQuote);
    setUsername(Firebase.getDisplayName());
  }, []);

  const logout = async () => {
    await Firebase.signOut();
    history.replace("/");
  };

  if (Firebase.getCurrentUser() == null) {
    history.replace("/login");
    return <></>;
  }

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUserOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Hello {username}
        </Typography>
        <Typography component="h1" variant="h5">
          Your quote: {quote ? `"${quote}"` : <CircularProgress size={20} />}
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          onClick={logout}
          className={classes.submit}
        >
          Logout
        </Button>
      </Paper>
    </main>
  );
};

export default withRouter(withStyles(styles)(Dashboard));
