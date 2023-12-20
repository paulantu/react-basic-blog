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



    
    


}

const services = new Services();



export default services;