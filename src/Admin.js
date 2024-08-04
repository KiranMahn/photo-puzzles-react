import { useState } from 'react';
import Memory from './Memory';
import Msg from './Msg';

const Admin = () => {
    const [theme, setTheme] = useState("#C3CEF7");
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [locked, setLocked] = useState(true);
    const [starWars, setStarWars] = useState("none");

    const handleClick = (newTheme) => {
        setTheme(newTheme);
        if(newTheme == "black") {
            setStarWars("url(\"starwars.jpeg\")")
            setTheme("white");
        }
        let home = document.getElementById("home");
        home.style.color = "white";
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        // Replace 'adminPassword' with your actual admin password
        const adminPassword = 'honk';

        if (password === adminPassword) {
            setMessage('Login successful!'); // Replace with your desired action upon successful login
            setLocked(false);
        } else {
            setMessage('Incorrect password. Please try again.');
        }
    };

    const ThemeSelector = () => {
        return (
            <div id="themeSelector">
                    <button 
                        style={{backgroundColor: '#EDB7AD', width: '4em', height: '4em', margin: '1.5em'}}
                        onClick={() => handleClick("#EDB7AD")}
                    ></button>
                    <button 
                        style={{backgroundColor: '#BDE3F2', width: '4em', height: '4em', margin: '1.5em'}}
                        onClick={() => handleClick("#BDE3F2")}
                    ></button>
                    <button 
                        style={{backgroundColor: '#C0DFB7', width: '4em', height: '4em', margin: '1.5em'}}
                        onClick={() => handleClick("#C0DFB7")}
                    ></button>
                    <button 
                        style={{backgroundColor: '#C3CEF7', width: '4em', height: '4em', margin: '1.5em'}}
                        onClick={() => handleClick("#C3CEF7")}
                    ></button>
                    <button 
                        style={{backgroundColor: 'black', width: '4em', height: '4em', margin: '1.5em'}}
                        onClick={() => handleClick("black")}
                    ></button>
                </div>
        );
    
    }

    if(locked) {
        return (
            <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <p>Admin Password:</p>
                <input type="password" value={password} onChange={handlePasswordChange} />
                <button onClick={handleLogin} style={{margin: '1em'}}>Login</button>
                {message && <p>{message}</p>}
            </div>
        );
    } else {
        return (
            <div id="home" style={{backgroundColor: theme, backgroundImage: starWars, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                <ThemeSelector/>
                <Memory theme={theme}/>
                <Msg theme={theme}/>
            </div>
        );
    }
    
}



export default Admin;