// appwrite ki service jab bhi karni ye authentication kaam aayegi



import conf from "../conf/conf.js";

import { Client, Account, ID } from "appwrite";


export class AuthService{
 client=new Client();
 account;

 // if service change karni h h to constructor change karo halka saa 
 constructor(){
    this.client
         .setEndpoint(conf.appwriteurl) // Your API Endpoint
          .setProject(conf.appwriteprojectid);
          this.account=new Account(this.client)
    }

    async createAccount({email,password,name}){
        try{
     const userAccount=  await this.account.create( ID.unique(),email,password,name)
     if(userAccount)
     {
        console.log(userAccount)
        // if userAccount create then to login bhi karwa dete h
        return  this.login({email,password})
     }
     else{
        console.log("userAccount not created")
        return userAccount;
     }
             
        }
        catch(error)
        {
            console.log("Accountservice")
            throw error
        }

    }


    async login({email,password})
    {
        try{
      const login=     await this.account.createEmailPasswordSession(email,password);
      if(login)
      {
        console.log("login")
        return login;
      }
else{
    console.log("not login");
    return null;
}
        }
        catch(error)
        {
            console.log("not login ")
           throw error;
        }
    }


    async getCurrentUser(){
        try {
            
        return await this.account.get()
          

        } catch (error) {
            console.log("current session",error);
            throw error;
            
        }

        return null;
    }


    async logout(){

      try {
      return   await this.account.deleteSessions()
        
      } catch (error) {
        console.log("delete logout not functionoing");
        throw error;
        
      }
    }






}




const authservice=new AuthService


export default authservice;