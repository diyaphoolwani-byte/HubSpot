const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
// get home

router.get('',async (req,res)=>{

    const locals = {
            title: "NodeJs Blog",
            description: "Simple Blog created with NodeJs, Express & MongoDb."
          }
    try{
        const data = await Post.find();
        res.render('index', { locals, data});
    } catch (error)
    {
        console.log(error);
    }  
});


// get post
router.get('/post/:id', async (req, res) => {
  try {
    

    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });
    const locals = {
      title: data.title,
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    }
    res.render('post', { 
      locals,
      data,
      currentRoute: `/post/${slug}`
    });

    // res.render('post',{locals,data});
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST /
 * Post - searchTerm
*/
router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
      ]
    });

    res.render("search", {
      data,
      locals,
      // currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});


router.get('/about',(req,res)=>{
    res.render('about',{
      currentRoute:'/about'
    });
    
});




// function insertPostData () {
//     Post.insertMany([
//         {
//             title:"Html,Css & Javascript",
//             body:"Learning the basics of Html,Css & Javascript"
//         },
//         {
//             title:"NodeJs & ExpressJs",
//             body:"Learning the basics of NodeJs & ExpressJs"
//         },
//         {
//             title:"MongoDb",
//             body:"Learning the basics of MongoDb"
//         },
//         {
//             title:"NodeJs limiting  Network traffic",
//             body:"Learning how to limit network traffic"
//         },
//     ])
// }
// insertPostData();


module.exports = router;









