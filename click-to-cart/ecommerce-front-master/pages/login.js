import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login ()  {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const router = useRouter();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3387/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            console.log(response);
            if (!response.ok) {
                if (response.status === 422) {
                    window.alert("Invalid Login, Email doesn't exist!!");
                    console.log("Invalid Login, Email doesn't exist!!...");
                } else {
                    window.alert("Login Failed");
                    console.log("Login Failed...");
                }
            } else {
                const data = await response.json();
                if (response.status === 200) {
                    localStorage.setItem("authenticated", false);
                    router.push('/home');
                    console.log("Authenticated Value:", true);
                    window.alert("Login Successful...")
                    console.log("Welcome to Home Page...");
                } else {
                    window.alert("Login Failed: " + data.error);
                    console.log("Login Failed: " + data.error);
                }
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    };


    return (
        <div style={{textAlign:"center", width:'100%' , height: '100px', display:"-ms-grid"}}>
            <div style={{width: '1230px',padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor:'#959292', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',alignContent:"center"}}>
                <h2>CLICK-TO-CART</h2>
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column'}}>
                        <div style={{marginBottom: '20px'}}>
                            <label>Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div style={{ marginBottom: '20px'}}>
                            <label>Password:</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                        <button style={{padding: '10px 20px',backgroundColor: '#007bff',color: '#fff', border: 'none',borderRadius: '5px',cursor: 'pointer',transition: 'backgroundColor 0.3s ease',backgroundColor: '#0056b3'}} type="submit">Login</button>
                    </div>
                </form>
                <div style={{  display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                    <p>Dont have an account? 
                        <Link href="/register" legacyBehavior>
                            <a>Register</a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}


