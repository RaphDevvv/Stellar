import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import generateToken from "../utils/generateToken.js";
import postModel from "../models/post.model.js";

export const register = async (req, res) => {
    const { name, email, password } = req.body

    const exists = await userModel.findOne({ email });

    if (exists) {
        return res.status(400).json({
            message: "User already exists",
            error: true
        });
    }

    if (!email || !name || !password) {
        return res.status(400).json({
            message: "Fill all inputs",
            error: true
        })
    }

    if (name.length > 26) {
    return res.status(400).json({
        message: "Your name can't be longer than 26 characters",
        error: true
    });
}

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = userModel({
        name: name,
        email: email,
        password: hashedPassword
    })

    const saveUser = await newUser.save()

    const user = await userModel.findOne({ email })

    const token = await generateToken(user._id)

    res.cookie('token', token, cookiesOption)

    return res.status(200).json({
        message: "user registered",
        success: true
    })

}
const cookiesOption = {
    httpOnly: true,
    secure: true,
    sameSite: "None"
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "provide email and password",
                error: true,
                success: false
            })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "email not registered",
                error: true,
                success: false
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(400).json({
                message: "wrong password, please try again",
                error: true,
                success: false
            })
        }

        const token = await generateToken(user._id)

        res.cookie('token', token, cookiesOption)

        return res.json({
            message: "login efetuado com succeso",
            error: false,
            success: true,
            data: {
                token
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export const logoutUser = async (req, res) => {
    try {
        const userid = req.userId

        res.clearCookie('token', cookiesOption);

        return res.json({
            message: "usuario deslogado com sucesso",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export const fetchUserDetails = async (req, res) => {
    try {
        const userId = req.userId

        if (!userId) {
            return res.status(401).json({
                message: "id do usuario não encontrado, não logado",
                error: true
            })
        }

        const details = await userModel.findById({ _id: userId }).select('-password')

        if (!details) {
            return res.status(404).json({
                message: "usuario não encontrado",
                error: true
            })
        }

        res.json({
            message: "detalhes do usuario",
            details,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export const uploadAvatar = async (req,res)=>{
    try {
        const userId = req.userId
        const { imageLink } = req.body

        if (!userId) {
            return res.status(401).json({
                message: "id do usuario não recebidos",
                error: true
            })
        }

        if (!imageLink) {
            return res.status(401).json({
                message: "link do imagem não recebidos",
                error: true
            })
        }

        const updateUser = await userModel.findByIdAndUpdate(userId,  { avatar: imageLink })

        return res.json({
            message: "image uploaded",
            success: true,
            avatar: imageLink
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error:true
        })
    }
}

export const fetchUserPosts = async (req, res) => {
  try {
    const userId = req.userId;

    const userPosts = await postModel.find({ userId: userId }).sort({ createdAt: -1 });

    const ratedPosts = userPosts
      .map((post) => {
        const userRating = post.stars?.find((s) =>
        s?.userId?.toString?.() === userId.toString()
        );
        if (userRating) {
          return {
            postId: post._id,
            stars: userRating.stars,
          };
        }
        return null;
      })
      .filter((post) => post !== null);

    return res.status(200).json({
      userPosts,
      ratedPosts,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const editUser = async(req,res)=>{
    try {
        const {name, email} = req.body
        const userId = req.userId

        if (name !== "") {
        await userModel.findOneAndUpdate({ _id: userId }, { name });
        }

        if (email !== "") {
        await userModel.findOneAndUpdate({ _id: userId }, { email });
        }

        return res.status(200).json({
            message: "information sucessfully changed",
            success:true
        })

    } catch (error) {
        return res.json({
            message: error.message || error,
            error:true
        })
    }
}

export const fetchUserAndPostsByName = async (req,res)=>{
    try {
        const {id} = req.body
        const userId = req.userId

        const user = await userModel.findOne({_id: id})
        
        const userPosts = await postModel.find({ userId: id }).sort({ createdAt: -1 });

        const ratedPosts = userPosts.map((post)=>{
            const userRating = post.stars?.find((s) =>
        s?.userId?.toString?.() === userId.toString()
        );

            if (userRating) {
                return {
                    postId: post._id,
                    stars: userRating.stars
                }
            }
            return null;
        }).filter((post) => post !== null);

        return res.status(200).json({
            user,
            userPosts,
            ratedPosts,
            success: true
        })

    } catch (error) {
        return res.json({
            message: error.message || error,
            error:true
        })
    }
}

export const followUser = async (req, res) => {
  try {
    const userId = req.userId;  // quem está logado
    const { id } = req.body;    // quem será seguido

    if (userId === id) {
      return res.status(400).json({
        message: "you can't follow yourself",
        error: true
      });
    }

    const toBeFollowed = await userModel.findOne({ _id: id });

    if (!toBeFollowed) {
      return res.status(404).json({
        message: "User not found",
        error: true
      });
    }

    const alreadyFollowing = toBeFollowed.followers.includes(userId);

    if (alreadyFollowing) {
      toBeFollowed.followers = toBeFollowed.followers.filter(
        (followerId) => followerId.toString() !== userId.toString()
      );
    } else {
      toBeFollowed.followers.push(userId);
    }

    await toBeFollowed.save();

    return res.status(200).json({
      success: true,
      following: !alreadyFollowing
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || String(error),
      error: true
    });
  }
};

