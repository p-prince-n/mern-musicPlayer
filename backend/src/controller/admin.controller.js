import Song from "../models/song.model.js";
import Album from "../models/album.model.js"
import cloudinary from "../lib/cloudinay.js";


const uploadToCloudinary= async(file)=>{
    try{
        const result=await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: 'auto',

        })
        return result.secure_url;

    }catch(e){
        console.log('error in cloudinary : ', e.message);
        throw new Error(`Error while uploading to cloudinary : `, e.message)
    }

}

export const createSong=async(req, res, next)=>{
    try{
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(400).json({message : 'Please upload all files.'});
        }
        const {title, artist, albumId, duration}=req.body;
        const audioFile=req.files.audioFile;
        const imageFile=req.files.imageFile;
        const audioUrl= await uploadToCloudinary(audioFile)
        const imageUrl= await uploadToCloudinary(imageFile)
        const song= new Song({
            title,
            artist,
            albumId : albumId || null,
            duration,
            audioUrl,
            imageUrl
        });
        await song.save();
        if(albumId){
            await Album.findByIdAndUpdate(albumId, {
                $push : {songs: song._id},
            })
        }
        res.status(200).json(song)

    }catch(e){
        console.log(e.message);
        
        next(e)
    }
}

export const deleteSong=async()=>{
    try{
        const {id}=req.params;
        const song=await Song.findById(id);
        if(!song){
            return res.status(404).json({message: 'song not found'});
        }
        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId, {
                $pull : {songs : song._id},
            })
        }
        await Song.findByIdAndDelete(id);
        res.status(200).json({message: 'song deleted successfully. '})

    }catch(e){
        console.log('error while deleteing the song', e.message);
        
        next(e)

    }
}

export const  createAlbum=async(req, res, next)=>{
    try{
        const {title, artist, releaseYear}=req.body;
        const {imageFile}=req.files;
        const imageUrl=await uploadToCloudinary(imageFile);
        const album=new Album({
            title,
            artist,
            imageUrl,
            releaseYear
        });
        await album.save();
        res.status(200).json(album);

    }catch(e){
        console.log('error while creating the album', e.message);
        
        next(e)

    }
}

export const  deleteAlbum=async(req, res, next)=>{
    try{
        const {id}=req.params;
        const album=await Album.findById(id);
        if(!album){
            res.status(500).json({message: 'Album not found'})
        }
        await Song.deleteMany({albumId: id});
        await Album.findByIdAndDelete(id);
        res.status(200).json({message: 'Album deleted Successfully.'})

    }catch(e){
        console.log('error while deleteing the album', e.message);
        
        next(e)

    }
}

export const  checkAdmin= async(req, res, next)=>{
    try{
 res.status(200).json({admin: true})
    }catch(e){
        console.log('error while deleteing the album', e.message);
        
        next(e)

    }
}