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



    async createPost({title, description, excerpt, thumbnail, status, slug, user_id}){
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
                    user_id
                }
            )
        } catch (error) {
            throw error
        }
    }





    async updatePost(slug, {title, description, excerpt, thumbnail, status, user_id}){
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
            throw error
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
            throw error
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
            throw error
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


    async uploadFiles(file){
        try {
            return await this.storage.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error;
        }
    }


    async deleteFile(file_id){
        try {
            await this.storage.deleteFile(
                config.appWriteBucketId,
                file_id
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }


    getFilePreview(file_id){
        return this.storage.getFilePreview(
            config.appWriteBucketId,
            file_id,
        )
    }

}

const services = new Services();



export default services;