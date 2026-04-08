import { useState } from 'react'
import Form from '../components/Form'
import Input, { Select } from '../components/Input'
import Logo from '../components/Logo'
import { Link } from 'react-router-dom';

function Register() {
    
    const [formData , setFormData] = useState({
        name:"",
        email: "",
        phone: "",
        password: "",
        gender: ""
    });

    const [errors , setErrors] = useState({
        name :"",
        email: "",
        phone: "",
        password: "",        
        gender: ""
        
    });

    const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
    };


    const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";

    if (!formData.email.includes("@"))
        newErrors.email = "Invalid email";

    if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";

    if (formData.phone.length < 10)
        newErrors.phone = "Enter Valid phone number";

    if (!formData.gender)
        newErrors.gender = "Please select gender";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
        const response = await fetch("http://127.0.0.1:8000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(data);
            alert("Error occurred");
            return;
        }

        console.log("Success:", data);
        alert("Registered successfully");

    } catch (error) {
        console.error("Error:", error);
    }
};

    return (
        <>
            <nav className='   bg-primary/80 backdrop-blur-sm fixed h-16 w-full z-50'>
                <div className='app-container h-16'>
                    <Logo/>
                </div>
            </nav>
            <section className='app-container p-20 w-full h-auto flex flex-col gap-3 items-center justify-center'>
                <Form title= {'Create Account'} desc={'Start tracking your gold investments today'} buttonText={'Create Account'} onSubmit={handleSubmit}>
                    <Input lable={"Full Name"} placeholder={'Sara Mohammad'} type={'text'} name={'name'} value={formData.name} onChange={handleChange} error={errors.name} />
                    <Input lable={"Email"} placeholder={'you@example.com'} type={'email'} name={'email'} value={formData.email} onChange={handleChange} error={errors.email} />
                    <Input lable={"Phone"} placeholder={'+962 799342463'} type={'tel'} name={'phone'} value={formData.phone} onChange={handleChange} error={errors.phone} />
                    <Input lable={"Password"} placeholder={'...................'} type={'password'} name={'password'} value={formData.password} onChange={handleChange} error={errors.password} />
                    <Select lable={"Gender"} name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        error={errors.gender}/>  
                </Form>  
                
                <p className='text-secondary font-light'>Already have an account? 
                    <Link className='text-accent font-bold' to="/login">Login</Link></p>
                    
            </section>
        </>
    )
}

export default Register