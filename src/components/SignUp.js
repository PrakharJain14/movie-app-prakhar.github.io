import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignUp = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', { email, password });
            console.log(response.data);
            // Handle successful registration, e.g., redirect to a different page
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
            <button onClick={handleSignUp}>Sign Up</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default SignUp;
