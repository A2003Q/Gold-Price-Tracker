import React from 'react'
import Logo from '../components/Logo';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function InnerNav({name , letters}) {

    const navigate = useNavigate();

    const handleLogout = async () => {

        const token = localStorage.getItem("token");

        try {
            await fetch("http://127.0.0.1:8000/api/logout", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            // 🧹 حذف البيانات من المتصفح
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            // 🔔 Alert
            Swal.fire({
                icon: 'success',
                title: 'Logged out ',
                timer: 1500,
                showConfirmButton: false
            });

            // 🔄 تحويل لصفحة login
            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
        <nav className='bg-primary/80 backdrop-blur-sm fixed h-17 w-full z-50'>
            <div className='app-container h-16 flex justify-between items-center'>
                <Logo/>
                <div className='flex justify-between gap-2 md:gap-9'>
                    <div className='h-10 bg-primary md:bg-section rounded-lg w-auto gap-3 pr-3 text-white font-light flex items-center justify-between' >
                        <span className='h-full bg-accent w-full md:w-auto rounded-lg uppercase text-section flex items-center p-2'>{letters}</span>
                        <span className='hidden md:block capitalize'>{name}</span>
                    </div>

                    {/* 🔥 هون الربط */}
                    <button
                        onClick={handleLogout}
                        className='text-secondary/70 font-extralight cursor-pointer hover:text-secondary transition'>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
                    </button>

                </div>
            </div>
        </nav>
        </>
    )
}

export default InnerNav;
