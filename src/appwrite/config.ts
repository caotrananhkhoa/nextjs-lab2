import conf from "@/conf/config";
import { Client, Account, ID } from "appwrite";

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

const appwriteClient = new Client().setEndpoint(process.env.APPWRITE_URL!).setProject(process.env.APPWRITE_PROJECTID!);

export const account = new Account(appwriteClient);

export class AppwriteService {
  // Create a new record of user inside appwrite
  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error: any) {
      console.log(error)
      throw error;
    }
  }

  async login({ email, password }: LoginUserAccount) {
    try {
      return await account.createEmailSession(email, password);
    } catch (error: any) {
      console.log(error)
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      // true if user is not null
      return Boolean(user);
    } catch (error) {}
    return false;
  }

  async getCurrentUser() {
    try {
      return account.get();
    } catch (error: any) {
      console.log("getCurrentUser() error: ", error);
    }
    return null;
  }

  async logout() {
    try {
      return await account.deleteSession("current")
    } catch (error: any) {
      console.log("logout() error: ", error)
    }
  }
}

const appwriteService = new AppwriteService()

export default appwriteService
