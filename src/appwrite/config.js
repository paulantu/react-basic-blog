import config from "../config/config.js"
import { Client, ID, Databases, Storage, Query } from "appwrite"



export class Services{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client.setEndpoint(config.appWriteUrl)
                .setProject(config.appWriteProjectId);


        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }



    async createPost({title, description, excerpt, thumbnail, status, slug, userId}){
        try {
            return await this.databases.createDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    description,
                    excerpt,
                    thumbnail,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
            // throw error
        }
    }





    async updatePost(slug, {title, description, excerpt, thumbnail, status}){
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    description,
                    excerpt,
                    thumbnail,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
            // throw error
        }
    }




    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug
            )   
            return true         
        } catch (error) {
            // throw error
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }




    async getSinglePost(slug){
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug
            )
        } catch (error) {
            // throw error
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }
    




    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }







    // FileUpload Servicess


    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            // throw error;
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }


    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appWriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }


    getFilePreview(fileId){
        console.log(this.storage.fileId);
        return this.storage.getFilePreview(
            config.appWriteBucketId,
            fileId,
        )
    }

}

const services = new Services();



export default services;