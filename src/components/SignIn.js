
import React, { useState } from 'react';
import axios from 'axios';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignIn = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
            console.log(response.data);
            // Handle successful sign-in, e.g., store token and redirect
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignIn}>Sign In</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default SignIn;