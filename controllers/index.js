const router = require("express").Router();
const blogRoutes = require("./blog/blogRoutes.js");
const userRoutes = require("./user");
const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboard/dashboardRoutes.js");

router.use("/user", userRoutes);
router.use("/blog", blogRoutes);
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;