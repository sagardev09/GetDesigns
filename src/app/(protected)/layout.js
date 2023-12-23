"use client"
import { useAppContext } from "../utils/GlobalContext";
import ProtectedNav from "./_components/ProtectedNav";
import { useState, useEffect } from "react";


export default function RootLayout({ children }) {

    const [user, setuser] = useState("")

    const { getuserinfo } = useAppContext()

    useEffect(() => {
        currentuser()
    }, [user])

    const currentuser = async () => {

        try {
            let user = await getuserinfo();
            const userid = user?.$id;
            setuser(userid)
        } catch (error) {
            console.error("Error fetching user data:", error);

        }
    };

    return (
        <html lang="en">
            <body>
                {user ? (
                    <div>
                        <ProtectedNav />
                        {children}
                    </div>
                ) : (
                    <div>
                        <p>please login first</p>
                    </div>
                )}
            </body>
        </html>
    )
}
