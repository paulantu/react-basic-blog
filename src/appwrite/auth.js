import config from "../config/config.js"
import { Client, Account, ID } from "appwrite"


export class AuthService {
    client = new Client();
    account;


    constructor(){
        this.client.setEndpoint(config.appWriteUrl)
                    .setProject(config.appWriteProjectId);
        this.account = new Account(this.client);

    }


    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                return this.userLogin({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }


    async userLogin({email, password}){
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error
        }
    }



    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }

        return null;
    }


    async logOut(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;