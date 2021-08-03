const router = require("express").Router();
const { User, BlogPost } = require("../../models");
const withAuth = require("../../utils/auth");

// routes that posts newly entered blog entry
router.post("/new", async (req, res) => {
  try {
    const newPostCreate = await Post.create({
      title: req.body.title,
      content: req.body.content,
    }).then((post) => {
      res.render("home", {
        post,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// route to show new blog post form
router.get('/new', async (req,res) => {
    try {

        res.render("new-post-form", {
            });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;