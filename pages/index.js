import React, { useEffect } from "react";
import { useStateValue } from "../components/useGlobalState";
import { makeStyles } from "@material-ui/core/styles";
import dynamic from "next/dynamic";

const Card = dynamic(import("../components/Card"));

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > div": {
      margin: "12px",
    },
  },
});

const Home = () => {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    fetch("/api/books", {
      method: "GET",
    })
      .then((resp) => (resp.ok ? resp.json() : new Error()))
      .then((resp) => {
        return dispatch({ type: "INIT-BOOKS", value: resp });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.container}>
      {state.books.map((book, index) => {
        return <Card key={`${book.id}-${index}`} {...book} />;
      })}
    </div>
  );
};

export default Home;
