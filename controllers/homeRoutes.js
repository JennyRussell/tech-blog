const router = require("express").Router();
const { BlogPost, User } = require("../models");
// const withAuth = require("../utils/auth");


//homepage
router.get("/", async (req, res) => {

  try {
    const allBlogs = await BlogPost.findAll({ include: User});
    const posts = allBlogs.map((postInfo) => postInfo.get({ plain: true }));
    const userId = await User.findAll();
    console.log(req.user)
  

    res.render("homepage", {
      posts,       
      id: req.user,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get login
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

//register user
router.post("/register", async (req, res) => {
  try {
    const databaseUser = await User.create({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(databaseUser);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// login user
router.post("/login", async (req, res) => {
  try {

    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res
        .status(400)
        .json({ message: "Please enter the correct email." });
      return;
    }
    const correctPass = await user.checkPassword(req.body.password);

    if (!correctPass) {
      res
        .status(400)
        .json({ message: "Please enter the correct password." });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: user, message: "Login successful." });
        
      console.log(res);  
      return;
    });
  } catch (err) {
    console.log("error");
    console.log(err);
    res.status(500).json(err);
  }
});

// logout user
router.post("/logout", (req, res) => {
  console.log(req.session.loggedIn);
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    console.log(res);
    res.status(404).end();
  }
});

module.exports = router;