import uploadImageCloudinary from "../utils/uploadImages.js"


const uploadImagesController = async (req, res)=>{
    try {
        const file = req.file

        const imgLink = await uploadImageCloudinary(file)

        console.log(imgLink)

        if (!imgLink) {
            return res.status(500).json({
                error:true
            })
        }

        return res.json({
            message: "upload done",
            data: imgLink.url,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export default uploadImagesController