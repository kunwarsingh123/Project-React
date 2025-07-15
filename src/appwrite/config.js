import conf from "../conf/conf";

import { Client,ID,Databases,Storage,Query } from "appwrite";

export class Service {

    client=new Client()
    databases;
    bucket;

    constructor(){
        this.client
         .setEndpoint(conf.appwriteurl) // Your API Endpoint
          .setProject(conf.appwriteprojectid);

          this.databases=new Databases(this.client)
          this.bucket=new Storage(this.client)


    }


    async createPost({title,slug,content,featuredImage,status,userId})
    {
        try {
             return await this.databases.createDocument(
                 conf.appwritedatabasesid,
                 conf.appwritecollectionid,
                 slug,
                 {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                 }
              )

              
            
        } catch (error) {
console.log("error in createpost",error);
throw error;            
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
try {

    const update=await this.databases.updateDocument(
        conf.appwritedatabasesid,
        conf.appwritecollectionid,
        slug,
        {
            title,
            content,
            featuredImage,
            status,
        }

        

    )

    if(update)
    {
        console.log("post is updated")
        return update
    }
    else{
        console.log("post is mot updated")
        return null;
    }

    
} catch (error) {
    console.log("update is not working")
    throw error
    
}
        

   

    }

    async deletePost(slug)
    {
        try {

            const del =await this.databases.deleteDocument(
                conf.appwritedatabasesid,
                conf.appwritecollectionid,slug

            )
            if(del)
            {
                console.log("deleted ppost")
                return true

            }
            else{
                console.log("Not deleted");
                return false;
            }
            
        } catch (error) {
            console.log("deletepost function is not working")
            throw error
            
        }
    }

    async  getPost(slug){
        try {
const getdocs=await this.databases.getDocument(
    conf.appwritedatabasesid,
    conf.appwritecollectionid,
    slug
)
if(getdocs)
{
    console.log("getdocs is working")
    return getdocs;
}
else{
    console.log("it is not workking")
    return false;
}

            
        } catch (error) {
            console.log("getdocument is not working ");
            return false;
            
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try {

            const allposts = await this.databases.listDocuments(
                conf.appwritedatabasesid,
                conf.appwritecollectionid,
               queries,
               
            )

            if(allposts)
            {
               console.log("allposts is creation");
               return allposts;
            }
            else{
                console.log("allposts is not working");
                return false;
            }

            
        } catch (error) {
            console.log("getall posts is not work")
            return false
            
        }


    }


// file upload service // storage service


// async uploadFile(file){
//     try {

//         const upload=await this.bucket.createFile(
//             conf.appwritebucketid,
//             ID.unique(),
//             file
//         )

//         if(upload)
//         {
//             console.log("upload is file")
//             return upload
//         }
//         else{
//             console.log("upload file is not")
//             return null;
//         }
        
//     } catch (error) {
//         console.log("update file is not working",error)
//         return false;
        
//     }
// }

async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwritebucketid,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

async deleteFile(fileid){
    try {
    const deletefiless=await this.bucket.deleteFile(
        conf.appwritebucketid,
        fileid
    )
    if(deletefiless)
    {
        console.log("delete file is success")
        return true;
    }
    else{
        console.log("file is not delte")
        return false;
    }
        
    } catch (error) {
        console.log("file is not deleted",error);
        return false;
        
    }

}


 getFilePreview(fileid)
{
    return this.bucket.getFilePreview(
        conf.appwritebucketid,
        fileid

    )

   
}

getFileView(fileId) {
  return this.bucket.getFileView(conf.appwritebucketid, fileId);
}






}



const service=new Service()
export default service