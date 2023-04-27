import React, { useEffect, useState } from 'react'
import { db } from "../../firebase-config";
import { getDocs, collection, doc, updateDoc, addDoc } from "@firebase/firestore";
import format from "date-fns/format";
function Todaystasks() {
    const TasksCollectionref = collection(db, "todaystaks");
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(TasksCollectionref);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getUsers();
    }, []);
    const [subject, setsubject] = useState("");
    const [message, setmessage] = useState("");
    const currentDate = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const dateString = currentDate.toLocaleDateString("en-US", options);
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(dateString);
        await addDoc(TasksCollectionref, {
            postdate: dateString,
            usersubject: subject,
            status: "0",

        });
        setTimeout(function () {
            location.reload();
        }, 1000);
    };
    const handleState = async (user, e) => {
        e.preventDefault();
        const userDoc = doc(db, "todaystaks", user.id);
        const newFields = { status: "1" };
        await updateDoc(userDoc, newFields);
        setTimeout(() => {
            window.location.reload();
        }, 1000)
    }
    const [optionstatus, setoptionstatus] = useState('0');
    return (
        <div>
            <div class="announcement-body max-w-screen-md mx-auto p-5">
                <div class="text-center mb-16">
                    <h3 class="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                        TO<span class="text-indigo-600">DO</span>
                    </h3>
                </div>
                <form class="w-full" onSubmit={(event) => handleSubmit(event)}>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                Add Task
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="text" placeholder="task" onChange={(e) => setsubject(e.target.value)} />
                        </div>
                    </div>

                    <div class="flex flex-wrap -mx-3 mb-6">
                        <button class="mx-auto shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded" type="submit">
                            Add
                        </button>
                    </div>
                </form>

            </div>
            <div style={{ margin: '0 auto' }} className='py-4'><h1 style={{ textAlign: 'center' }}>Previous Tasks</h1></div>
            <div class="verificationselect py-8" style={{ margin: '0 auto' }}>
                <select onChange={(e) => setoptionstatus(e.target.value)} class="verificationselect">
                    <option value="0">{dateString} Tasks  </option>
                    <option value="1">Completed Tasks</option>
                </select>
            </div>
            <div className='py-8'>
                {
                    users.map((user) => {
                        return (
                            user.postdate === dateString && user.status === "0" && optionstatus==="0" ? (<div className=" mb-4 rounded-xl overflow-hidden shadow-xl border  flex mx-4 w-30%" key={user.id}>
                                <div class="sm:flex sm:justify-between sm:gap-4 sm:w-50%">
                                    <div className="p-4   text-gray-900 ">
                                        <p>{user.postdate}</p>
                                        <p class="mt-1 text-sm font-medium text-gray-400">{user.usersubject}</p>
                                        <p>
                                            <button class="inline-block px-4 py-2 text-gray-400 font-semibold border-2 border-gray-500 rounded-md hover:bg-gray-700 hover:text-white hover:border-gray-700 focus:outline-none focus:ring focus:ring-gray-100 m-4" onClick={(e) => handleState(user, e)}>
                                                Completed
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>) : (console.log(''))
                        );
                    })
                }
            </div>
            <div className='py-8'>
            {
                users.map((user) => {
                    return (
                        user.postdate === dateString && user.status === "1" && optionstatus==="1" ? (<div className=" mb-4 rounded-xl overflow-hidden shadow-xl border  flex mx-4 w-30%" key={user.id}>
                            <div class="sm:flex sm:justify-between sm:gap-4 sm:w-50%">
                                <div className="p-4   text-gray-900 ">
                                    <p>{user.postdate}</p>
                                    <p class="mt-1 text-sm font-medium text-gray-400">{user.usersubject}</p>
                                    <p className='text-green-600'>
                                      completed
                                    </p>
                                </div>
                            </div>
                        </div>) : (console.log(''))
                    );
                })
            }
        </div>
        </div>
    )
}

export default Todaystasks