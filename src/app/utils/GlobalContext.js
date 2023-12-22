"use client"
import { useContext, createContext, useState, useEffect } from "react";
import { client, account, databases, storage } from "./appwriteConfig";
import { ID } from "appwrite";
import { useRouter } from 'next/navigation';

export const AppContext = createContext(null)

function GlobalProvider({ children }) {

    const router = useRouter()

    const [user, setuser] = useState(null)
    const [presentuserid, setpresentuserid] = useState("")



    // user login in function

    const login = async (userinfo) => {
        try {
            let response = await account.createEmailSession(userinfo.email, userinfo.password)
            let accountdetails = await account.get()
            alert("successfully logged in")
            router.push("/dashboard")
        } catch (error) {
            alert("error")
        }
    }

    //user registration function

    const signup = async (userinfo) => {
        try {
            let signupres = await account.create(ID.unique(), userinfo.email, userinfo.password, userinfo.firstname)
            let usersession = await account.createEmailSession(userinfo.email, userinfo.password)
            let id = signupres.$id
            await createuserprofile(id, userinfo)
            alert("account created")
            router.push("/login")
        } catch (error) {
            alert("error")
        }
    }

    //logout function

    const logout = async () => {
        await account.deleteSession("current")
    }

    //create user data in database

    const createuserprofile = async (id, userinfo, bio = "", profileimage = "") => {
        try {
            let response = await databases.createDocument(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_USER_COLLECTION_ID, id, {
                name: userinfo.firstname,
                email: userinfo.email,
                bio: bio,
                profileimage: profileimage,
            })
        } catch (error) {
            alert("error")
            console.log(error);
        }
    }

    // function to get the deatils of logged in user

    const getuserinfo = async () => {
        try {
            const res = await account.get()
            return res
        } catch (error) {
            console.log(error);
        }
    }

    //get the user detail by id

    const getuserdetails = async (id) => {
        try {
            const user = await databases.getDocument(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_USER_COLLECTION_ID, id)
            setpresentuserid(user.$id)
            return user
        } catch (error) {
            console.log(error);
        }
    }

    // function to store profile image

    const storeprofilepic = async (file) => {
        try {
            const response = await storage.createFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, ID.unique(), file)
            console.log(response);
            return response.$id
        } catch (error) {
            alert(error)
        }
    }

    //function to update user information

    const updateUser = async (name, email, bio, profileimage, id) => {
        try {
            const response = await databases.updateDocument(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_USER_COLLECTION_ID, id, {
                name: name,
                email: email,
                bio: bio,
                profileimage: profileimage,
            })
        } catch (error) {
            alert(error)
        }
    }

    // function to view profile image

    const profilePreview = async (id) => {
        try {
            const result = await storage.getFilePreview(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, id);
            return result.href
        } catch (error) {
            alert("error")
        }
    }

    //function to store designs in design collection

    const createdesign = async (userinfo) => {
        try {
            const response = await databases.createDocument(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_APPWRITE_DESIGN_COLLECTION_ID, ID.unique(), {
                title: userinfo.title,
                desc: userinfo.desc,
                category: userinfo.category,
                image: userinfo.imageId,
                userid: userinfo.userId

            })
        } catch (error) {
            alert(error);
        }
    }

    const contextdata = {
        user,
        login,
        logout,
        signup,
        createuserprofile,
        getuserinfo,
        getuserdetails,
        storeprofilepic,
        updateUser,
        profilePreview,
        createdesign
    }



    return (
        <AppContext.Provider value={contextdata}>
            {children}
        </AppContext.Provider>
    )
}

export default GlobalProvider

export const useAppContext = () => {
    return useContext(AppContext)
}