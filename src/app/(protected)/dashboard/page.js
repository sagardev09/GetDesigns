"use client"
import React, { useState, useEffect } from 'react'
import DesignComponent from '@/app/_components/DesignComponent'
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/app/utils/GlobalContext'
import Spinner from '@/app/_components/Spinner'


const Dashboard = () => {


    const [active, setactive] = useState("New Designs")
    const router = useRouter()
    const { fetchDesigns, getuserinfo, fecthUsers } = useAppContext()
    const [loading, setLoading] = useState(false);
    const [finalRecords, setFinalRecords] = useState([]);
    const [userRecords, setUserRecords] = useState({});

    useEffect(() => {
        fetchAllDesigns();
    }, []);

    const fetchAllDesigns = async () => {
        setLoading(true);

        const records = await fetchDesigns();
        const finalRecords1 = records?.documents ?? [];
        console.log(finalRecords1, "records");

        let userIds = new Set();

        finalRecords1.forEach((item) => {
            let userId = item?.userid;
            userIds.add(userId);
        });
        userIds = [...userIds];
        console.log(userIds);
        if (userIds.length > 0) {
            createUserRecordsObject(userIds);
        }
        setFinalRecords(finalRecords1);
        setLoading(false);
    };

    const getUserDesigns = async () => {
        setLoading(true);

        let user = await getuserinfo();
        let userId = user.$id;
        console.log(userId);

        const records = await fetchDesigns(userId);
        console.log(records);
        const finalRecords1 = records?.documents ?? [];
        console.log(finalRecords1);
        let userIds = new Set();

        finalRecords1.forEach((item) => {
            let userId = item?.userid;
            userIds.add(userId);
        });
        userIds = [...userIds];
        console.log(userIds);

        if (userIds.length > 0) {
            createUserRecordsObject(userIds);
        }

        setFinalRecords(finalRecords1);
        setLoading(false);
    };

    const createUserRecordsObject = async (userIds) => {
        const records = await fecthUsers(userIds);
        console.log(records);

        let obj = {};

        records?.documents.forEach((item) => (obj[item.$id] = item));
        console.log(obj);
        setUserRecords(obj);
    };

    return (
        <div className='flex w-full flex-col px-8 min-h-screen bg-[#1B2430]'>
            <div className='flex w-full justify-between px-4 sm:px-6 lg:px-8 mt-10'>
                <div className='flex space-x-10'>
                    <span onClick={() => { setactive("New Designs"), fetchAllDesigns() }} className={(active === "New Designs" ? "border-b-[2px] border-[#FF4C29] pb-3 text-white cursor-pointer" : "pb-3 text-white cursor-pointer")}>New Designs</span>
                    <span onClick={() => {
                        setactive("Your Designs"),
                            getUserDesigns()
                    }} className={(active === "Your Designs" ? "border-b-[2px] border-[#FF4C29] pb-3 text-white cursor-pointer" : "pb-3 text-white cursor-pointer")}>Your Designs</span>
                </div>
                <div>
                    <button className='bg-[#FF4C29] px-6 py-3 text-white font-semibold rounded-md' onClick={() => router.push("/add-new-design")}>Create design</button>
                </div>
            </div>
            <div className='my-10'>
                {loading ? <Spinner /> : <DesignComponent finalRecords={finalRecords} userRecords={userRecords} />}
            </div>
        </div>
    )
}

export default Dashboard