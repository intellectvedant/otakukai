
import Post from '../model/post.js'

export const createpost = async(req,res)=>{
    try {

        const post = req.body

        const newPost = new Post(post)

        await newPost.save();

        return res.status(200).json({msg: 'Posted Successfully!'})
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Internal Server error'})
    }


}

export const getallposts =async(req,res)=>{

    let category = req.query.category
    let posts;
    try {
        if (category){
            posts = await Post.find({categories: category})
        }else {
            posts = await Post.find({})
        }

        return res.status(200).json(posts)
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Internal Server error'})
    }
}

export const getpost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        return res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Invalid Server error'})
    }
}


export const updatepost = async(req, res) =>{
    try {

        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({msg: "Post not found"})
        }

        await Post.findByIdAndUpdate(req.params.id, {$set: req.body})

        return res.status(200).json({msg: "Post Updated Successfully"})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: "Internal Server error"})
    }
}

export const deletepost = async(req, res)=>{
    try {

        let post = await Post.findOneAndDelete({ _id: req.params.id})
        if(!post){
            return res.status(404).json({msag: "Post not found"})
        }
   

        return res.status(200).json({msg: "Post deleted successfully"})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({msg: "Internal Server error"})
    }
}