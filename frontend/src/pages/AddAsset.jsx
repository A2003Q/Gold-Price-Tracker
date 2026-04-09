import React, { useEffect, useState } from 'react'
import InnerNav from '../components/InnerNav';
import { Link } from 'react-router-dom';
import { useRef } from 'react';



function AddAsset() {

    //====== get user name ==========
    const [user, setUser] = useState(null);
    console.log(localStorage.getItem("user"));

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    const letters = user?.name?.slice(0, 2);

    //====== get user name ==========



    //====== reviw pic ==========

    const fileRef = useRef();

    const [preview, setPreview] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        }
    };

    //====== reviw pic ==========






    return (
    <>
        <InnerNav name={user?.name}  letters={letters}/>
        <section className='app-container pt-24'>
            <div >
                <button className='cursor-pointer bg-section/50 hover:bg-section/70 text-sm transition rounded-xl px-3 md:px-5 py-2 text-white font-extralight'>
                    <Link to="/dashboard"> <i class="fa-solid fa-arrow-left-long"></i> <span>Back to Dashboard</span></Link>
                </button>
            </div>
            <p className='text-2xl font-bold text-white mt-8'>Add New Asset</p>

            <div className='p-9 mt-5 mb-15 border w-9xl border-secondary/30 rounded-xl shaow  shadow-white/50 shadow-xl'>
                <form>
                    <div className='grid grid-cols-1 md:grid-cols-2  justify-between items-center gap-5'>
                        <div className='flex flex-col gap-3 '>
                            <label className='text-white' htmlFor="type">Type Asset</label>
                            <select name="type" id="type" className='bg-section text-white outline-none hover:bg-section/80 focus:border focus:border-accent/60 transition px-4 py-2 rounded-2xl'>
                                <option  value="">Select Type</option>
                                <option  value="jewelry">Jewelry</option>
                                <option  value="bars">Bars</option>
                                <option  value="coins">Coins</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <label className='text-white' htmlFor="karat">Karat</label>
                            <select name="karat" id="karat" className='bg-section text-white outline-none hover:bg-section/80 focus:border focus:border-accent/60 transition px-4 py-2 rounded-2xl'>
                                <option  value="">Select Karat</option>
                                <option  value="24">24</option>
                                <option  value="21">21</option>
                                <option  value="18">18</option>
                            </select>
                        </div>
                    </div>

                    <div className='hidden mt-5 grid grid-cols-1  justify-between items-center gap-5'>
                        <div className='flex flex-col gap-3'>
                            <label className='text-white' htmlFor="category">Category</label>
                            <select name="category" id="category" className='bg-section text-white outline-none hover:bg-section/80 focus:border focus:border-accent/60 transition px-4 py-2 rounded-2xl'>
                                <option  value="">Select Category</option>
                                <option  value="ring">Ring</option>
                                <option  value="necklace">Necklace</option>
                                <option  value="bracelet">Bracelet</option>
                                <option  value="earrings">Earrings</option>
                            </select>
                        </div>
                    </div>
                    <div className='hidden mt-5 grid grid-cols-1  justify-between items-center gap-5'>
                        <div className='flex flex-col gap-3'>
                            <label className='text-white' htmlFor="category">Category</label>
                            <select name="category" id="category" className='bg-section text-white outline-none hover:bg-section/80 focus:border focus:border-accent/60 transition px-4 py-2 rounded-2xl'>
                                <option  value="">Select Category</option>
                                <option  value="rashadiLira">Rashadi Lira</option>
                                <option  value="englishLira">English Lira</option>

                            </select>
                        </div>
                    </div>
                    <div className=' hidden mt-5 grid grid-cols-1  justify-between items-center gap-5'>
                        <div className='flex flex-col gap-3'>
                            <label className='text-white' htmlFor="category">Category</label>
                            <select name="category" id="category" className='bg-section text-white outline-none hover:bg-section/80 focus:border focus:border-accent/60 transition px-4 py-2 rounded-2xl'>
                                <option  value="">Select Category</option>
                                <option  value="rashadiLira">Gold Bar</option>

                            </select>
                        </div>
                    </div>

                    <div className='mt-5 grid grid-cols-1 md:grid-cols-2  justify-between items-center gap-5'>
                        <div className='flex flex-col gap-3 '>
                            <label className='text-white' htmlFor="weight">Weight (grams)</label>
                            <input type="number" name="weight" id="weight" placeholder='10.5'
                            className='bg-section text-white outline-none hover:bg-section/80 focus:border focus:border-accent/60 transition px-4 py-2 rounded-2xl'/>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label className='text-white' htmlFor="purchasePrice">Purchase Price (JOD)</label>
                            <input type="text" name="purchasePrice" id="purchasePrice" placeholder='650.00'
                            className='bg-section text-white outline-none hover:bg-section/80 focus:border focus:border-accent/60 transition px-4 py-2 rounded-2xl'/>
                        </div>
                    </div>
                    <div className='mt-5 grid grid-cols-1  justify-between items-center gap-5'>
                        <div className='flex flex-col gap-3'>
                            <label className='text-white' htmlFor="purchaseDate">Purchase Date</label>
                            <input type="date" name="purchaseDate" id="purchaseDate"
                            className='bg-section text-white outline-none hover:bg-section/80 focus:border focus:border-accent/60 transition px-4 py-2 rounded-2xl'/>
                        </div>
                    </div>
                    <div className='mt-5 grid grid-cols-1  justify-between items-center gap-5'>
                        <div className='flex flex-col gap-3'>
                            <label className='text-white' htmlFor="photo">Photo (optinal)</label>
                            {/* <div className='border-2 border-dashed border-accent rounded-2xl flex flex-col justify-center items-center h-60'>

                                {preview ? (
                                    <img
                                    src={preview}
                                    alt="preview"
                                    className="h-full w-full object-cover rounded-2xl"
                                    />
                                ) : (
                                    <>
                                    <span
                                        onClick={() => fileRef.current.click()}
                                        className='cursor-pointer flex justify-center items-center h-20 w-20 bg-accent/30 text-accent rounded-full text-4xl p-4'
                                    >
                                        <i className="fa-solid fa-arrow-up-from-bracket"></i>
                                    </span>

                                    <p className='text-secondary/80 font-light mt-2'>
                                        <span className='text-accent font-bold'>Click to upload </span>
                                        or drag and drop
                                    </p>

                                    <p className='text-secondary/80 text-sm mt-2'>
                                        PNG, JPG up to 10MB
                                    </p>
                                    </>
                                )}

                            </div> */}


                            <div className='border-2 border-dashed border-accent rounded-2xl flex flex-col justify-center items-center h-60'>
                                {
                                    preview ? (
                                        <img
                                        src={preview}
                                        alt="preview"
                                        className="h-50 w-50 object-cover rounded-full"
                                        />
                                    ) :
                                    (
                                        <>
                                            <span onClick={() => fileRef.current.click()} className='cursor-pointer flex justify-center items-center h-20 w-20 bg-accent/30 text-accent rounded-full text-4xl p-4'>
                                                <i className="fa-solid fa-arrow-up-from-bracket"></i>
                                            </span>
                                            <p className='text-secondary/80 font-light mt-2'>
                                            <span onClick={() => fileRef.current.click()} className='cursor-pointer text-accent font-bold'>Click to upload </span>or drag and drop</p>
                                            <p className='text-secondary/80 text-sm mt-2'>PNG, JPG up to 10MB</p>
                                        </>
                                    )
                                }

                                <input type="file" ref={fileRef} className='hidden' onChange={handleFileChange} />
                            </div>

                        </div>
                    </div>

                    <div className='mt-20 flex flex-col md:flex-row justify-between items-center  gap-5'>
                        <button className='w-full md:w-lg cursor-pointer border border-accent/80 text-accent font-bold hover:text-accent/70 hover:border-accent/60 transition transition px-4 py-2 rounded-2xl'> <Link to="/dashboard">Cencel</Link> </button>
                        <button type='submit' className='w-full md:w-lg cursor-pointer bg-accent text-section font-bold hover:bg-accent/70 transition transition px-4 py-2 rounded-2xl'> Add Asset</button>

                    </div>
                </form>
            </div>

        </section>
    </>

    )
}

export default AddAsset
