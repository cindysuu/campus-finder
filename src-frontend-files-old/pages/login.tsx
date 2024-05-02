
// React page for user login

import React from 'react';

function Login() {
    return (
        <div>
            <h1>Login</h1>
            {/* Add your login form here */}
        </div>
    );
}

export default Login;

// function Login() {
//     // const [email, setEmail] = useState('');
//     // const [password, setPassword] = useState('');
//     const [credentials, setCredentials] = useState({'email': '', 'password': ''});
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     // const { setAuthInfo } = useAuth();
//     const { setAuthInfo } = useContext(AuthContext);

//     const handleLogin = async () => {
//         try {
//             // const data = await loginUser(email, password);  // Call the LoginUser function from the AuthService
//             const data = await login(credentials);
//             setAuthInfo({ token: data.token }); // Set the token in the AuthContext
//             navigate('/home');  // Redirect to the home page
//             console.log('Login success:', data);
//         } catch (error) {
//             setError('Failed to log in');
//             console.error(error);
//         }
//     };

//     return (
//         <div>
//             <h1>Login</h1>
//             <input 
//                 type="email" 
//                 value={email} 
//                 onChange={e => setEmail(e.target.value)} 
//                 placeholder="Email" 
//             />
//             <input 
//                 type="password" 
//                 value={password} 
//                 onChange={e => setPassword(e.target.value)} 
//                 placeholder="Password" 
//             />
//             <button onClick={handleLogin}>Login</button>
//             {error && <p>{error}</p>}   {/* Display the error message */}
//         </div>
//     );
// }

// export default Login;
