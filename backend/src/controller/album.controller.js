import Album from "../models/album.model.js"

export const getAllAlbums=async(req, res, next)=>{
    try{
        const albums=await Album.find();
        res.status(200).json(albums);

    }catch(e){
        next(e)

    }
}

export const getAlbumById=async(req, res, next)=>{
    try{
        const {albumId}=req.params;
        const album=await Album.fintById(albumId).populate("songs");
        if(!album){
            return res.status(404).json({message : 'Album not found'})
        }
        res.status(200).json(album);

    }catch(e){
        next(e)
    }
}

