import React, { useEffect, useState } from 'react'
import InnerNav from '../components/InnerNav';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function EditAsset() {

    const navigate = useNavigate();
    const { id } = useParams();


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

        // 🔥 مهم للـ API لاحقًا
        setDataForm(prev => ({
            ...prev,
            pic: file
        }));
    }
};

    //====== reviw pic ==========



    //====== Data Forn State ==========
    const [dataForm , setDataForm] = useState({
        type :"",
        karat:"",
        category :"",
        weight :"",
        purchasePrice:"",
        purchaseDate:"",
        pic:""

    });

    const handleChange = (e) => {
    const { name, value } = e.target;

    setDataForm(prev => {

        if (name === "type") {
            return {
                ...prev,
                type: value,
                category: "",
                karat: "",
                weight: ""
            };
        }

        return {
            ...prev,
            [name]: value
        };
    });
};

    useEffect(() => {

    // 🟡 bars → karat = 24
    if (dataForm.type === "bars") {
        setDataForm(prev => ({
            ...prev,
            karat: "24"
        }));
    }

    // 🟡 coins
    if (dataForm.type === "coins") {

        if (dataForm.category === "rashadiLira") {
            setDataForm(prev => ({
                ...prev,
                karat: "21",
                weight: "7.2"
            }));
        }

        if (dataForm.category === "englishLira") {
            setDataForm(prev => ({
                ...prev,
                karat: "21",
                weight: "8"
            }));
        }
    }

}, [dataForm.type, dataForm.category]);
    //====== Data Form State ==========



    //====== Api==========
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({}); // reset errors

    // 🔥 تحويل القيم لتناسب الباك
    let formattedType = dataForm.type;

    if (formattedType === "bars") formattedType = "bar";
    if (formattedType === "coins") formattedType = "coin";

    const formData = new FormData();

    formData.append("type", formattedType);
    formData.append("karat", dataForm.karat);
    formData.append("category", dataForm.category);
    formData.append("weight", dataForm.weight);
    formData.append("purchase_price", dataForm.purchasePrice);
    formData.append("purchase_date", dataForm.purchaseDate);
    formData.append("currency", "JOD");

    if (dataForm.pic) {
        formData.append("image", dataForm.pic);
    }

    try {
        formData.append("_method", "PUT");

        const response = await fetch(`http://127.0.0.1:8000/api/assets/${id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: formData
        });
        const data = await response.json();

        if (!response.ok) {
            if (data.errors) {
                setErrors(data.errors); // 🔥 أهم خطوة
            }
            return;
        }

        console.log("SUCCESS:", data);

        // reset form
        setDataForm({
            type: "",
            karat: "",
            category: "",
            weight: "",
            purchasePrice: "",
            purchaseDate: "",
            pic: ""
        });

        setPreview(null);

        Swal.fire({
        icon: 'success',
        title: 'Updated Successfully 🎉',
        text: 'Your asset has been updated successfully',
        confirmButtonColor: '#f2bb39'
    }).then(() => {
        navigate('/dashboard');
    });

    } catch (error) {
        console.error(error);
    }
};

    //====== Api ==========



    //====== Get Asset Info using id Api ==========
    useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/assets/${id}`, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(res => res.json())
    .then(data => {
        const asset = data.asset;

        setDataForm({
            type: asset.type === "bar" ? "bars" : asset.type === "coin" ? "coins" : asset.type,
            karat: asset.karat || "",
            category: asset.category || "",
            weight: asset.weight || "",
            purchasePrice: asset.purchase_price || "",
            purchaseDate: asset.purchase_date || "",
            pic: ""
        });

        if (asset.image) {
            setPreview(`http://127.0.0.1:8000/storage/${asset.image}`);
        }
    })
    .catch(err => console.error(err));
}, [id]);
    //====== Get Asset Info using id Api ==========













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
                <form  onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 md:grid-cols-2  justify-between items-center gap-5'>
                        <div className='flex flex-col gap-3 '>
                            <label className='text-white' htmlFor="type">Type Asset</label>
                            <select value={dataForm.type} onChange={handleChange} name="type" id="type" className='bg-section text-white outline-none hover:bg-section/80 focus:border focus:border-accent/60 transition px-4 py-2 rounded-2xl'>
                                <option  value="">Select Type</option>
                                <option  value="jewelry">Jewelry</option>
                                <option  value="bars">Bars</option>
                                <option  value="coins">Coins</option>
                            </select>
                            {errors.type && (
                            <p className="text-red-500 text-sm mt-1">{errors.type[0]}</p>
                            )}
                        </div>

                        <div className='flex flex-col gap-3'>
                            <label className='text-white' htmlFor="karat">Karat</label>
                            <select value={dataForm.karat} onChange={handleChange}
                            disabled={dataForm.type === "bars" || dataForm.type === "coins"} name="karat" id="karat" className='bg-section text-white outline-none hover:bg-section/80 focus:border focus:border-accent/60 transition px-4 py-2 rounded-2xl'>
                                <option  value="">Select Karat</option>
                                <option  value="24">24</option>
                                <option  value="21">21</option>
                                <option  value="18">18</option>
                            </select>
                            {errors.karat && <p className="text-red-500 text-sm">{errors.karat[0]}</p>}
                        </div>
                    </div>

                    {
                        dataForm.type==='jewelry' ?(
                        <div className=' mt-5 grid grid-cols-1  justify-between items-center gap-5'>
                            <div className='flex flex-col gap-3'>
                                <label className='text-white' htmlFor="category">Category</label>
                                <select value={dataForm.category} onChange={handleChange} name="category" id="category" className='bg-section text-white outline-none hover:bg-section/80 focus:border focus:border-accent/60 transition px-4 py-2 rounded-2xl'>
                                    <option  value="">Select Category</option>
                                    <option  value="ring">Ring</option>
                                    <option  value="necklace">Necklace</option>
                                    <option  value="bracelet">Bracelet</option>
                                    <option  value="earrings">Earrings</option>
                                </select>
                                {errors.category && <p className="text-red-500 text-sm">{errors.category[0]}</p>}
                            </div>
                        </div>
                    ) :
                    (<></>)
                    }


                    {dataForm.type==='coins' ? (
                    <div className=' mt-5 grid grid-cols-1  justify-between items-center gap-5'>
                        <div className='flex flex-col gap-3'>
                            <label className='text-white' htmlFor="category">Category</label>
                            <select value={dataForm.category} onChange={handleChange} name="category" id="category" className='bg-section text-white outline-none hover:bg-section/80 focus:border focus:border-accent/60 transition px-4 py-2 rounded-2xl'>
                                <option  value="">Select Category</option>
                                <option  value="rashadiLira">Rashadi Lira</option>
                                <option  value="englishLira">English Lira</option>

                            </select>
                            {errors.category && <p className="text-red-500 text-sm">{errors.category[0]}</p>}
                        </div>
                    </div>
                    )


                    :(<></>)

                    }

                    {
                        dataForm.type==='bars' ? (
                        <div className='  mt-5 grid grid-cols-1  justify-between items-center gap-5'>
                            <div className='flex flex-col gap-3'>
                                <label className='text-white' htmlFor="category">Category</label>
                                <select value={dataForm.category} onChange={handleChange} name="category" id="category" className='bg-section text-white outline-none hover:bg-section/80 focus:border focus:border-accent/60 transition px-4 py-2 rounded-2xl'>
                                    <option  value="">Select Category</option>
                                    <option  value="bar">Gold Bar</option>

                                </select>
                                {errors.category && <p className="text-red-500 text-sm">{errors.category[0]}</p>}
                            </div>
                        </div>
                        )

                        : (<></>)
                    }


                    <div className='mt-5 grid grid-cols-1 md:grid-cols-2  justify-between items-center gap-5'>
                        <div className='flex flex-col gap-3 '>
                            <label className='text-white' htmlFor="weight">Weight (grams)</label>
                            <input value={dataForm.weight} onChange={handleChange} disabled={dataForm.type === "coins"} type="number" name="weight" id="weight" placeholder='10.5'
                            className='bg-section text-white outline-none hover:bg-section/80 focus:border focus:border-accent/60 transition px-4 py-2 rounded-2xl'/>
                            {errors.weight && <p className="text-red-500 text-sm">{errors.weight[0]}</p>}
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label className='text-white' htmlFor="purchasePrice">Purchase Price (JOD)</label>
                            <input value={dataForm.purchasePrice} onChange={handleChange} type="text" name="purchasePrice" id="purchasePrice" placeholder='650.00'
                            className='bg-section text-white outline-none hover:bg-section/80 focus:border focus:border-accent/60 transition px-4 py-2 rounded-2xl'/>
                            {errors.purchase_price && <p className="text-red-500 text-sm">{errors.purchase_price[0]}</p>}
                        </div>
                    </div>
                    <div className='mt-5 grid grid-cols-1  justify-between items-center gap-5'>
                        <div className='flex flex-col gap-3'>
                            <label className='text-white' htmlFor="purchaseDate">Purchase Date</label>
                            <input value={dataForm.purchaseDate} onChange={handleChange} type="date" name="purchaseDate" id="purchaseDate"
                            className='bg-section text-white outline-none hover:bg-section/80 focus:border focus:border-accent/60 transition px-4 py-2 rounded-2xl'/>
                            {errors.purchase_date && <p className="text-red-500 text-sm">{errors.purchase_date[0]}</p>}
                        </div>
                    </div>
                    <div className='mt-5 grid grid-cols-1  justify-between items-center gap-5'>
                        <div className='flex flex-col gap-3'>
                            <label className='text-white' htmlFor="photo">Photo (optinal)</label>



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

                                <input onChange={handleFileChange} type="file" ref={fileRef} className='hidden' onChange={handleFileChange} />
                                {errors.image && <p className="text-red-500 text-sm">{errors.image[0]}</p>}
                            </div>

                        </div>
                    </div>

                    <div className='mt-20 flex flex-col md:flex-row justify-between items-center  gap-5'>
                        <button className='w-full md:w-lg cursor-pointer border border-accent/80 text-accent font-bold hover:text-accent/70 hover:border-accent/60  transition px-4 py-2 rounded-2xl'> <Link to="/dashboard">Cencel</Link> </button>
                        <button type='submit' className='w-full md:w-lg cursor-pointer bg-accent text-section font-bold hover:bg-accent/70 transition  px-4 py-2 rounded-2xl'> Edit Asset</button>

                    </div>
                </form>
            </div>

        </section>
    </>

    )
}

export default EditAsset
