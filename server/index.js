require("dotenv").config();
const express = require("express");
const next = require("next");
const cors = require("cors");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redisClient = require("./services/redis");
const bodyParser = require("body-parser");
const compression = require("compression");

const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const api = require("./routers/api");

const handleSession = (req, res, next) => {
  if (!req.session.books) {
    req.session.books = [
      {
        id: "5661adcd0e6cb17a694403bb",
        title: "Harry Potter and the Sorcerer's Stone",
        image: "https://prodimage.images-bn.com/pimages/9780590353427_p0_v2_s550x406.jpg",
        author: "J. K. Rowling",
        description:
          "Harry Potter has never been the star of a Quidditch team, scoring points while riding a broom far above the ground. He knows no spells, has never helped to hatch a dragon, and has never worn a cloak of invisibility.\n\nAll he knows is a miserable life with the Dursleys, his horrible aunt and uncle, and their abominable son, Dudley - a great big swollen spoiled bully. Harry's room is a tiny closet at the foot of the stairs, and he hasn't had a birthday party in eleven years.\n\nBut all that is about to change when a mysterious letter arrives by owl messenger: a letter with an invitation to an incredible place that Harry - and anyone who reads about him - will find unforgettable.\n\nFor it's there that he finds not only friends, aerial sports, and magic in everything from classes to meals, but a great destiny that's been waiting for him... if Harry can survive the encounter.",
      },
      {
        id: 1,
        title: "Atwood",
        description:
          "When the van door slammed on Offred's future at the end of The Handmaid's Tale, readers had no way of telling what lay ahead for her--freedom, prison or death.",
        author: "Margaret Atwood",
        image: "/atwood.jpg",
      },
      {
        id: 2,
        title: "Normal People",
        description:
          "At school Connell and Marianne pretend not to know each other. He’s popular and well-adjusted, star of the school soccer team while she is lonely, proud, and intensely private. ",
        author: "Sally Rooney",
        image: "/normal_people.jpg",
      },
      {
        id: 3,
        title: "Where the Forest Meets the Stars",
        description:
          "After the loss of her mother and her own battle with breast cancer, Joanna Teale returns to her graduate research on nesting birds in rural Illinois, determined to prove that her recent hardships have not broken her.",
        author: "Glendy Vanderah",
        image: "/forest_stars.jpg",
      },
    ];
  }

  next();
};

const sessionParser = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 * 30,
  },
});

// eslint-disable-next-line
app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(cors());
  server.use(sessionParser);
  server.use(handleSession);
  server.use(
    compression({
      level: 6,
    })
  );

  server.use("/api", api);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
