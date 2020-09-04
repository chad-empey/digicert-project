import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "../../components/useGlobalState";
import router from "next/router";
import dynamic from "next/dynamic";

const TextField = dynamic(import("@material-ui/core/TextField"));
const Button = dynamic(import("@material-ui/core/Button"));

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexWrap: "wrap",
    maxWidth: 700,
    "& > div": {
      margin: "12px",
    },
  },
  button: {
    maxWidth: 300,
    margin: "12px",
  },
});

const Create = ({ id }) => {
  const [state, dispatch] = useStateValue();
  const currentBook =
    state.books.filter((book) => String(book.id) === id)?.[0] || {};

  const classes = useStyles();
  const [book, setBook] = useState({
    id,
    ...currentBook,
  });

  const handleSave = () => {
    fetch(`/api/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then(() => {
        dispatch({ type: "UPDATE-BOOK", value: book });
        router.push("/");
      })
      .catch(() => {
        router.push("/");
      });
  };

  return (
    <div className={classes.container}>
      <TextField
        onChange={(e) => setBook({ ...book, image: e.target.value })}
        value={book.image}
        variant="outlined"
        label="Enter Image URL"
      />
      <TextField
        onChange={(e) => setBook({ ...book, title: e.target.value })}
        value={book.title}
        variant="outlined"
        label="Enter Book Title"
      />
      <TextField
        onChange={(e) => setBook({ ...book, author: e.target.value })}
        value={book.author}
        variant="outlined"
        label="Enter Author"
      />
      <TextField
        onChange={(e) => setBook({ ...book, description: e.target.value })}
        value={book.description}
        variant="outlined"
        label="Enter Description"
        multiline
      />
      <Button
        onClick={handleSave}
        color="primary"
        className={classes.button}
        variant="contained"
      >
        Save
      </Button>
    </div>
  );
};

Create.getInitialProps = async ({ query }) => {
  return {
    id: query.id,
  };
};

export default Create;
