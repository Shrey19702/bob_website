import { useEffect, useState } from "react";

const ViewContacts = () => {
    const [contact, setContact] = useState([]);


    const getContact = async () => {
        const data = await fetch(`${process.env.BASE_URL}api/contact/getContact`, {
            method: 'GET'
        });
        const info = await data.json();
        setContact(info.body);
        console.log(info.body);
    }
    const deleteContact = async (name) => {
        const data = await fetch(`${process.env.BASE_URL}api/contact/deleteContact`, {
            method: 'DELETE',
            body: JSON.stringify({
                name: name
            })

        });
    }

    useEffect(() => {
        // getContact();
    })

    return (
        <div className=" flex flex-col">
            {
                contact.map((x, idx) => (
                    <div key={idx} className="flex justify-center">
                        <div className="rounded-lg shadow-lg bg-white max-w-sm">
                            <div className="p-6">
                                <h1>{x.name}</h1>
                                <h5 className="text-gray-900 text-xl font-medium mb-2">{x.email}</h5>
                                <h5 className="text-gray-900 text-xl font-medium mb-2">{x.tel}</h5>
                                <p className="text-gray-700 text-base mb-4">
                                    {x.text}
                                </p>
                                <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => {
                                    deleteContact(x.name)
                                }}>🗑️</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ViewContacts;