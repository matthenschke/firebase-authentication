import React, { useState } from "react";
import {
  Paper,
  Avatar,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import withStyles from "@material-ui/core/styles/withStyles";
import Firebase from "../firebase";

const styles = (theme) => ({
  main: {
    width: "auto",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),

    // media query that works for everything above
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px `,
  },
  form: {
    width: "100%",
    marginTop: `${theme.spacing(1)}px`,
  },

  field: {
    margin: `${theme.spacing(1)}px 0`,
  },

  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main,
  },

  submit: {
    marginTop: theme.spacing(3),
  },
});

const Register = (props) => {
  const { classes } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPW] = useState("");
  const [quote, setQuote] = useState("");
  // const [redirect, setRedirect] = useState(false);

  const onRegister = async (e) => {
    try {
      await Firebase.register(name, email, pw);
      await Firebase.addQuote(quote);
      props.history.replace("/dashboard");
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar} color="secondary">
          <LockIcon></LockIcon>
        </Avatar>
        <Typography component="h1" variant="h5">
          Register Account
        </Typography>
        <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
          <TextField
            id="name"
            label="Full Name"
            className={classes.field}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            id="email"
            label="Email Address"
            className={classes.field}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            id="password"
            type="password"
            label="Password"
            className={classes.field}
            onChange={(e) => setPW(e.target.value)}
            required
            fullWidth
          />
          <TextField
            id="quote"
            label="Your Favorite Quote"
            className={classes.field}
            onChange={(e) => setQuote(e.target.value)}
            required
            fullWidth
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onRegister}
          >
            Register
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            component={Link}
            to="/login"
            className={classes.submit}
          >
            Go Back to Login
          </Button>
        </form>
      </Paper>
    </main>
  );
};

export default withRouter(withStyles(styles)(Register));
