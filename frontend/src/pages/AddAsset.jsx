import React, { useEffect, useState } from 'react'
import InnerNav from '../components/InnerNav';

function AddAsset() {
    const [user, setUser] = useState(null);
    console.log(localStorage.getItem("user"));

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    const letters = user?.name?.slice(0, 2);
  return (
    <>
        <InnerNav name={user?.name}  letters={letters}/>
    </>

  )
}

export default AddAsset
