import commentModel from "../models/comment.model.js"
import postModel from "../models/post.model.js"
import userModel from "../models/user.model.js"

export const uploadPostController = async (req, res)=>{
    try {
        const {textContent, imageContent } = req.body
        const userId = req.userId

        const user = await userModel.findOne({_id: userId})

        const newPost = postModel ({
          userAvatar: user.avatar,
          userName: user.name , 
          userId,
          textContent, 
          imageContent
        })

        await newPost.save()

        return res.json({
            message: "your post has been sucessfully uploaded!",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export const getPostsController = async (req, res) => {
  try {
    const posts = await postModel.find().sort({ createdAt: -1 });
    const userId = req.userId;

    const ratedPosts = posts
      .map(post => {
        const userRating = post.stars?.find((s) =>
        s?.userId?.toString?.() === userId.toString()
        );
        if (userRating) {
          return {
            postId: post._id,
            stars: userRating.stars
          };
        }
        return null;
      })
      .filter(post => post !== null);

    return res.json({ 
      message: "posts",
      posts,
      ratedPosts,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true
    });
  }
};

export const ratePost = async (req, res) => {
  try {
    const { postId, stars } = req.body;
    const userId = req.userId;

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found", success: false });
    }

    const existingRatingIndex = post.stars.findIndex(s => s.userId.toString() === userId.toString());

    if (existingRatingIndex !== -1) {
      // Atualiza a avaliação existente
      post.stars[existingRatingIndex].stars = stars;
    } else {
      // Adiciona nova avaliação
      post.stars.push({ userId, stars });
    }

    await post.save();

    return res.status(200).json({
      message: "Rated successfully",
      post,
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true
    });
  }
};

export const uploadComment = async (req,res)=>{
  try {
    const userId = req.userId
    const {postId, textContent} = req.body

    const user = await userModel.findOne({_id : userId})

    const newComment = commentModel({
      postId,
      userAvatar: user.avatar,
      userName: user.name,
      userId,
      textContent
    })

    await newComment.save()

    return res.status(200).json({
      success: true
    })

  } catch (error) {
    return res.json({
      message: error.message || error,
      error: true
    })
  }
}

export const fetchComments = async (req,res)=>{
  try {
    const {postId} = req.body

    const comments = await commentModel.find({ postId : postId }).sort({crearedAt: -1})

    return res.status(200).json({
      comments,
      success: true
    })
  } catch (error) {
    return res.json({
      message: error.message || error,
      error: true
    })
  }
}

export const fetchMostLiked = async (req, res) => {
  try {
    const posts = await postModel.find();

    const rankedPosts = posts
      .map(post => {
        const totalStars = post.stars.reduce((sum, star) => sum + star.stars, 0);
        return { ...post.toObject(), totalStars };
      })
      .filter(post => post.totalStars > 0)
      .sort((a, b) => b.totalStars - a.totalStars);


    const userId = req.userId;

    const ratedPosts = rankedPosts
      .map(rankedPosts => {
        const userRating = rankedPosts.stars.find(
          s => s.userId.toString() === userId.toString()
        );
        if (userRating) {
          return {
            postId: rankedPosts._id,
            stars: userRating.stars
          };
        }
        return null;
      })
      .filter(rankedPosts => rankedPosts !== null);
    return res.json({
      posts: rankedPosts,
      ratedPosts,
      success: true
    });

  } catch (error) {
    return res.json({
      message: error.message || error,
      error: true
    });
  }
};



  