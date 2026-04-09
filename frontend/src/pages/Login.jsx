import  { useState } from 'react'
import Form from '../components/Form'
import Input from '../components/Input'
import Logo from '../components/Logo'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import miniStar from '../assets/images/smallStar.svg'



function Login() {
    const navigate = useNavigate();
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            
            if (!response.ok) {

                // validation errors (422)
                if (data.errors) {
                    const backendErrors = {};

                    for (let key in data.errors) {
                        backendErrors[key] = data.errors[key][0];
                    }

                    setErrors(backendErrors);
                }

                // login غلط (401)
                if (data.message) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: data.message,
                    });
                }

                return;
            }

        
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            Swal.fire({
                icon: 'success',
                title: 'Welcome 🎉',
                text: `Hello ${data.user.name}`,
                timer: 1500,
                showConfirmButton: false
            });

            // تحويل للداشبورد
            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);

        } catch (error) {
            console.error(error);
        }
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


                 {/* shape  */}
                <img src={miniStar}  className='hidden md:block absolute bottom- right-50 animate-ping'
                width={150} height={150} alt="" />
                <img src={miniStar}  className='hidden md:block absolute top-20 right-30 animate-ping'
                width={150} height={150} alt="" />
                <img src={miniStar}  className='hidden md:block absolute top-90 left-30 animate-ping'
                width={150} height={150} alt="" />
            </section>
    </>
  )
}

export default Login