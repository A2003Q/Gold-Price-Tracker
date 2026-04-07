import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Form from '../components/Form'
import Input, { Select } from '../components/Input'
import Logo from '../components/Logo'
import { Link } from 'react-router-dom'



function Login() {
    const [formData , setFormData] = useState({
            email: "",
            password: "",
            
        });
    
        const [errors , setErrors] = useState({
            email: "",
            password: "",        
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

    

    if (!formData.email.includes("@"))
        newErrors.email = "Invalid email";

    if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    console.log(formData);
    };
  return (
    <>
        <nav className='   bg-primary/80 backdrop-blur-sm fixed h-16 w-full z-50'>
            <div className='app-container h-16'>
                <Logo/>
            </div>
        </nav>
            <section className='app-container p-20 w-full h-screen flex flex-col gap-3 items-center justify-center'>
                <Form title= {'Welcome Back'} desc={'Login to track your gold investments'} buttonText={'Login'} onSubmit={handleSubmit}>
                    <Input lable={"Email"} placeholder={'you@example.com'} type={'email'} name={'email'} value={formData.email} error={errors.email} onChange={handleChange}/>
                    <Input lable={"Password"} placeholder={'...................'} type={'password'} name={'password'} value={formData.password} error={errors.password} onChange={handleChange}/>
                </Form>
                
                <p className='text-secondary font-light'>Don't have an account?  
                    <Link className='text-accent font-bold' to="/register">Register</Link></p>
            </section>
    </>
  )
}

export default Login