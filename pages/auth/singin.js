import { verifyToken } from "@/backend/utils/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"



export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetch('/api/user', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => {
                if(result.success) window.location.href = '/dashbord';
            });
    }, []);

    const handler = async () => {
        const res = await fetch('/api/auth/singin', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        if (data.success) window.location.href = '/dashbord';
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


export async function getServerSideProps(context) {
    const { U } = context.req.cookies;
    const result = await verifyToken(U);
    if (result.success)
        return { redirect: { destination: '/dashbord', permanent: false } }
    return { props: { result } };
}