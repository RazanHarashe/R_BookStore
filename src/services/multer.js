import multer from "multer"
export const fileValidation = {
    image:['image/png','image/jpeg','image/webp'],
    pdf:['application/pdf']
}
function fileUpload(customValidation = []){
    const storage = multer.diskStorage({})
    function fileFilter (req,file,cb){ //cb (call back)
        if(customValidation.includes(file.mimetype)){
            cb(null,true);
        }else{
            cb("invalid format",false);
        }
    }
    const upload = multer({fileFilter:fileFilter,storage:storage});
    return upload;
}

export default fileUpload; 