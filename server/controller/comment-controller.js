import Comment from "../model/comment.js";

export const newcomment = async (req, res) => {
  try {
    let comment = req.body;

    let newComment = new Comment(comment);

    await newComment.save();

    return res.status(200).json({ msg: "Comment Saved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server error" });
  }
};

export const getallcomment = async(req,res)=>{
    try {
        console.log(req.body)
        let comment = await Comment.find({postId: req.params.id});

        console.log(comment)

        return res.status(200).json(comment);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: "Interval Server error"})
    }
}


export const updatecomment = async (req, res)=>{
  try {
      const comment = await Comment.findById(req.params.id)
      if(!comment){
        return res.status(404).jsno({msg: "Comment not found"})
      }
      await Comment.findByIdAndUpdate(req.params.id,{$set: req.body})

      return res.status(200).json({msg: "Comment updated successfully"})
  } catch (error) {
    console.error(error);
    res.status(500).json({msg: "Internal Server error"})
  }
}

export const deletecomment = async(req, res)=>{
  try {

      let comment = await Comment.findOneAndDelete({ _id: req.params.id})
      if(!comment){
          return res.status(404).json({msag: "Comment not found"})
      }
 

      return res.status(200).json({msg: "Comment deleted successfully"})
      
  } catch (error) {
      console.error(error)
      res.status(500).json({msg: "Internal Server error"})
  }
}