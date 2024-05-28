import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

// Set base URL for Axios
axios.defaults.baseURL = 'http://localhost:5000'; // Assuming your backend is running on port 5000

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);
