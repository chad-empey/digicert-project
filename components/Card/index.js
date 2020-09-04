import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import router from "next/router";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";

const Dialog = dynamic(import("../Dialog"));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: 450,
    height: 225,
    [theme.breakpoints.down("sm")]: {
      width: 325,
      height: 300,
    },
    position: "relative",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  actions: {
    position: "absolute",
    bottom: "2px",
    left: "2px",
  },
  topContent: {
    position: "absolute",
    top: "2px",
  },
}));

const MediaCard = ({ id, title, description, author, image }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link href={`/create/${id}`}>
          <CardContent className={classes.topContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography gutterBottom variant="body2" component="p">
              {author}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description.length > 75 ? description.slice(0, 75) + "..." : description}
            </Typography>
          </CardContent>
        </Link>
        <CardActions className={classes.actions}>
          <Button variant="contained" onClick={() => router.push(`/create/${id}`)} size="small" color="primary">
            Edit
          </Button>
          <Button variant="outlined" size="small" color="secondary" onClick={() => setOpen(true)}>
            Delete
          </Button>
        </CardActions>
      </CardActionArea>
      {image && <CardMedia component="img" className={classes.cover} image={image} title={title} />}
      <Dialog id={id} open={open} setOpen={setOpen} />
    </Card>
  );
};

MediaCard.propTypes = {
  id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.string,
  image: PropTypes.string,
};

export default MediaCard;
