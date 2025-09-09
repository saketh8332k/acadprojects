import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function RegistrationForm() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordMatchError(true);
            return;
        }

        try {
            const response = await fetch("http://localhost:3387/register", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                if (response.status === 422) {
                    window.alert("Invalid Registration, Email Already Exists");
                    console.log("Invalid Registration, Email Already Exists");
                } else {
                    throw new Error("Registration Failed");
                }
            } else {
                window.alert("Registration Successful");
                console.log("Registration Successful...");
                router.push('/');
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <div style={{alignContent:"center",width: '100%',height: '90vh', display: 'grid'}}>
            <div style={{width: '1230px',padding: '20px',border: '1px solid #ccc',borderRadius: '8px', backgroundColor: '#959292',boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',alignContent:"center"}}>
                <h2 style={{ textAlign: 'center' }}>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div  style={{marginBottom: '20px',width: '100%'}}>
                        <label>Username:</label>
                        <div style={{width: '100%',padding: '10px',border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box'}}>
                            <input name="username" type="text" value={formData.username} onChange={handleChange} placeholder="Enter your username" required />
                        </div>
                        <div style={{width: '100%',padding: '10px',border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box'}}>
                            <label>Email:</label>
                            <div>
                                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                            </div>
                        </div>
                        <div style={{width: '100%',padding: '10px',border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box'}}>
                            <label>Password:</label>
                            <div>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
                            </div>
                        </div>
                        <div style={{width: '100%',padding: '10px',border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box'}}>
                            <label>Confirm Password:</label>
                            <div>
                                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required />
                            </div>
                            {passwordMatchError && <p style={{ color: 'red' }}>Passwords do not match</p>}
                        </div>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <button style={{padding: '10px 20px',backgroundColor: '#007bff',color: '#fff', border: 'none',borderRadius: '5px',cursor: 'pointer',transition: 'backgroundColor 0.3s ease',backgroundColor: '#0056b3'}} type="submit">Register</button>
                    </div>
                </form>
                <div style={{ marginTop: '20px'}}>
                    <p style={{ textAlign: 'center' }}>Already have an account? 
                        <Link href="/login" legacyBehavior>
                            <a>Login</a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegistrationForm;
