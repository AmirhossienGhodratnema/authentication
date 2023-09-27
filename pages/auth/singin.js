import { useRouter } from "next/router";
import { useState } from "react"



export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    
    const handler = async () => {
        const res = await fetch('http://localhost:3000/api/auth/singin', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        // if (data.success) router.push('/');1
        console.log(data);
    };

    return (
        <div>
            <h2>SignIn page</h2>

            <label>Email</label>
            <input type="text" onChange={e => setEmail(e.target.value)} />
            <br />
            <label>Password</label>
            <input type="password" onChange={e => setPassword(e.target.value)} />
            <br />
            <button onClick={handler}>singIn</button>
        </div>
    )
}