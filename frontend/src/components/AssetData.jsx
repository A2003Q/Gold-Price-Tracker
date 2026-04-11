import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function AssetData({ id, currency, pic, category, karat, weight, PurchasePrice, CurrentValue, profitOrLose, onDelete }) {
    const [showMenu, setShowMenu] = useState(false);
    const imageUrl = pic
        ? `http://127.0.0.1:8000/storage/${pic}`
        : "/default.png";

    const isProfit = profitOrLose >= 0;
    const navigate = useNavigate();

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f2bb39',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://127.0.0.1:8000/api/assets/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        Accept: 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    Swal.fire(
                        'Deleted!',
                        data.message,
                        'success'
                    );
                    if (onDelete) onDelete(id);
                })
                .catch(err => {
                    console.error(err);
                    Swal.fire(
                        'Error!',
                        'Failed to delete asset',
                        'error'
                    );
                });
            }
        });
    };

    return (
        <div className={` ${isProfit ? "hover:border-b-profit" : "hover:border-b-lose"}
            hover:border hover:border-b-accent hover:border-b-8 hover:-translate-y-3 transition flex flex-col w-full md:w-80 border border-secondary/40 rounded-xl`}>
            <div className='pic relative'>
                <img className='rounded-xl' src={imageUrl} alt="asset" />
                <span
                    onClick={() => setShowMenu(!showMenu)}
                    className='text-white text-xl cursor-pointer absolute top-2 right-2 rounded-full w-10 h-10 bg-white/20 hover:bg-white/50 transition flex items-center justify-center'
                >
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </span>
                {showMenu && (
                    <div className="absolute top-15 right-2 rounded-lg shadow-lg w-32 z-10">
                        <button
                                className="block text-white w-full text-left bg-section px-4 py-2 hover:bg-section/50 transition text-sm"
                                onClick={() => navigate(`/edit-asset/${id}`)}
                            >
                                Edit
                            </button>
                        <button
                            className="block text-white w-full text-left bg-section px-4 py-2 hover:bg-section/50 transition text-sm"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
            <div className='p-5'>
                <div className='flex items-center justify-between '>
                    <span className='text-white font-bold text-sm capitalize'>{category}</span>
                    <span className='bg-accent/30 text-accent px-3 py-1 rounded-2xl'>{karat}K</span>
                </div>
                <div className='text-secondary font-bold my-4'>
                    Weight : {weight} g
                </div>
                <div className='flex justify-between items-center'>
                    <span className='text-secondary text-sm font-bold'>Purchase Price</span>
                    <span className='text-white font-bold text-sm'>{currency} {PurchasePrice}</span>
                </div>
                <div className='flex justify-between items-center mt-2'>
                    <span className='text-secondary text-sm font-bold'>Current Value</span>
                    <span className='text-accent font-bold text-sm'>{currency} {CurrentValue}</span>
                </div>

                <hr className='text-secondary/30 my-5' />

                <div className='flex justify-between items-center mt-2'>
                    <span className='text-secondary text-sm font-bold'>Profit/Loss</span>
                    <span className={`font-bold ${isProfit ? "text-profit" : "text-lose"}`}>
                        {isProfit ? "+" : ""} {currency} {profitOrLose}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AssetData;
