import cloudinary from "cloudinary"







const cloud  = cloudinary.v2;

cloud.config({
    cloud_name: 'doyifognr',
    api_key: '558719477873916',
    api_secret: 'v8ZvCjyKR-CgQwVd9D8qEpBygxw'
})

interface cloudinaryResult {
    valid : boolean,
    url?: string,
    err? :any
}






export async function uploadImage(buffer : Buffer  ) : Promise<cloudinaryResult> {

    return new Promise((res , rej)=>{
        const result = cloud.uploader.upload_stream(
            {folder : "ecom_products"},
            (err , result)=> {
                if(err) rej({valid : false , error : err})
                else res({url : result?.secure_url , valid : true})
            }
        )
        result.end(buffer);
    })
}

export async function uploadImages(bufferArray : Buffer[])   {
    const result = await  Promise.all(bufferArray.map(async(item) => {
        
        return uploadImage(item)
        
    }))

    return result;
    
}