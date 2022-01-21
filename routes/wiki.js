const router = require("express").Router()
const Sequelize = require('sequelize');
const { db, Page, User } = require("../models")
const { addPage, main, wikiPage } = require("../views")

router.get("/", async function (req, res, next) {
  let pages = await Page.findAll();
  res.send(main(pages));
});

router.post("/", async function(req, res, next) {
  const {name,email,title,content,status} = req.body
  try{
   const page = await Page.create({
    title: title,
    content: content,
    status: status
   });
   const user = await User.create({
     name: name,
     email: email
   });
   res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get("/add", function(req, res, next){
  res.send(addPage());
})

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    res.json(wikiPage(page));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
