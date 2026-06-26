const express = require('express');
const router=express.Router() ;
const auth=require("../middleware/authmiddleware") ;
const {createPost,getAllPosts,getPostById,updatePost,deletePost}=require("../controllers/postcontrollers") ;

router.post("/" ,auth,createPost) ;
router.get("/" ,getAllPosts)  ;
router.put("/:id" ,auth,updatePost) ;
router.delete("/:id" ,auth,deletePost) ;
module.exports=router ;
