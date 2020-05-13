import express from "express";

// Auth middleware
import auth from "../middleware/auth.middleware";

import Post from "../models/Post.model";

import CovidPost from "../models/CovidPost.model"

const likeRouter = express.Router();

function checkInArray(result, like){
    for(let i=0;i<result.likes.length;i++){
        if(like.ownerId == result.likes[i].ownerId){
            return true
            }
        }
    return false

}

// @route     Post api/like/
// @desc      Post a like under a post by text,owner,ownerId (Remeneber give postId)
// @access    Public
likeRouter.post("/", auth, async(req, res, next) => {
    const {owner, postId, ownerId} = req.body;
    const like = {owner:owner, ownerId: ownerId}
    try {
    await Post.findById(postId, async(err, result) =>{
        if(checkInArray(result, like)){
            return res.status(422).json({msg: "The owner is already exist"})
        }else{
            await Post.findByIdAndUpdate(postId, {
                $push: {
                    likes: like
                }
            }, {
                new: true
            }).exec((err, result) => {
                if (err) {
                    res.status(422).json({ error: err, msg: "Please provide correct postid"})
                } else {
          
                    res.json(result)
                }
            })
        }
    })
    }catch (error) {
        console.log(error);
      }
    
  })

// @route     Post api/like/delete
// @desc      Delete a like under a post by text,owner,ownerId. (Remeneber give postId)
// @access    Public
likeRouter.post("/delete", auth, async(req, res) => {
    const like = {
      owner: req.body.owner,
      ownerId:req.body.ownerId
    }
    try {
    await Post.findByIdAndUpdate(req.body.postId, {
        $pull: {
            likes: like
        }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err, msg: "Please provide correct postid"})
        } else {
            // console.log(result);
  
            res.json(result)
        }
    })
    }catch (error) {
    console.log(error);
  }
  })


// @route     Post api/comment/covid
// @desc      Post a comments under a post by text,owner,ownerId (Remeneber give postId)
// @access    Public
likeRouter.post("/covid", auth, async(req, res, next) => {
    const {owner, postId, ownerId} = req.body;
    const like = {owner:owner, ownerId: ownerId}
    try {
    await CovidPost.findById(postId, async(err, result) =>{
        if(checkInArray(result, like)){
            return res.status(422).json({msg: "The owner is already exist"})
        }else{
            await CovidPost.findByIdAndUpdate(postId, {
                $push: {
                    likes: like
                }
            }, {
                new: true
            }).exec((err, result) => {
                if (err) {
                    res.status(422).json({ error: err, msg: "Please provide correct postid"})
                } else {
          
                    res.json(result)
                }
            })
        }
    })
    }catch (error) {
        console.log(error);
      }
    
  })

// @route     Post api/like/covid/delete
// @desc      Delete a like under a post by text,owner,ownerId. (Remeneber give postId)
// @access    Public
likeRouter.post("/covid/delete", auth, async(req, res) => {
    const like = {
      owner: req.body.owner,
      ownerId:req.body.ownerId
    }
    try {
    await CovidPost.findByIdAndUpdate(req.body.postId, {
        $pull: {
            likes: like
        }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err, msg: "Please provide correct postid"})
        } else {
            // console.log(result);
            res.json(result)
        }
    })
    }catch (error) {
    console.log(error);
  }
  })
  

export default likeRouter;
