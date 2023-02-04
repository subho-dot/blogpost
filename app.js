// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://Subhodip23:Subhodip%4010@firstcluster0.n974yek.mongodb.net/blogsdb?retryWrites=true&w=majority");
console.log("connected to the server");

// let posts =[];

const blogschema = new mongoose.Schema({
  name: String,
  text: String
});
const blogs = mongoose.model("blog", blogschema);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res) => {
    // res.render("home", {
    //   homeStartingContent: homeStartingContent, arr:posts
    // });

    blogs.find({}, function (err, posts) {
      res.render("home", {
        homeStartingContent: homeStartingContent,
  
       arr: posts
      });
    });
    
});

app.get("/about", (req,res) => {
  res.render("about", {
      aboutContent: aboutContent
  });
});

app.get("/contact", (req,res) => {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", (req,res) => {
  res.render("compose");
  
});
app.post("/compose",(req,res) =>{
  // console.log(req.body.postbody);
  
    const postTitle = req.body.title;
    const postBody = req.body.postbody;

    const blog = new blogs({
      name: postTitle,
      text: postBody
    });
    blog.save().then(() => {
      console.log('Post added to DB.');
      res.redirect("/");
    });
  // posts.push(blog);
  
  
  // res.redirect("/");
  
});

app.get('/posts/:postId', (req, res) => {
    // console.log(posts);
    // let pname = req.params.postName;
    // let ptitle = 
    blogs.findOne({_id: req.params.postId}, (err,post) => {
      res.render("post",{
        postHeading:post.name,
        postContent:post.text
      });
    });
    // posts.forEach(function(i){

    //   if(lodash.lowerCase(req.params.postName) === lodash.lowerCase(i.postTitle)){
    //     res.render("post",{
    //       postHeading: i.postTitle,
    //       postContent: i.postBody
    //     });
    //   }
    //   else{
    //     console.log("not a match");
    //   }
    // });
    
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
