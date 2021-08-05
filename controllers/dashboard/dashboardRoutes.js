const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {

  console.log("akjshdaskjdhajhsdkasjhdkjhakjshdaskjdhajhsdkasjhdkjhakjshdaskjdhajhsdkasjhdkjhakjshdaskjdhajhsdkasjhdkjh");
  console.log(req);
  try {
    const postData = await BlogPost.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    console.log(user_id);

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('all-posts-admin', {
      layout: 'dashboard',
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
