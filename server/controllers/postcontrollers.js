
 
const Post = require("../models/Post");
const cloudinary = require("../cloudinary");
exports.createPost=async(req,res)=>{
    try {
        const { image, caption } = req.body;
        // Upload image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image, {
          folder: "posts",
        });
        console.log(uploadResponse.secure_url);
    
        // Save post with Cloudinary URL
        const newPost = await Post.create({
          image: uploadResponse.secure_url,
          caption,
          user: req.user.id, 
        });
        res.status(201).json({
          message: "Post created successfully!",
          post: newPost,
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

exports.getAllPosts=async(req,res)=>{
    try {
       const posts = await Post.find()
            .populate("user", "username email")
            .sort({ createdAt: -1 });

        res.json(posts); 
         
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updatePost=async(req,res)=>{
  try {
    const { caption } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { caption },
      { new: true },
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.deletePost=async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


