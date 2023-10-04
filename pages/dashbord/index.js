import { verifyToken } from "@/backend/utils/auth";
import { useEffect, useState } from "react"

export default function Dashbord({ result }) {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');


    // useEffect(() => {
    //     fetch('http://localhost:3000/api/user', {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json' }
    //     })
    //         .then(res => res.json())
    //         .then(result => console.log(result))
    // }, [])

    const saveHandler = async () => {
        const res = await fetch('/api/updateInfoUser', {
            method: 'POST',
            body: JSON.stringify({ name, lastName, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json()
        console.log(data);
    };

    return (
        <div>
            <h2>Dashbord</h2>
            <p>Your email is: {result.email}</p>

            <input type='text' placeholder='Name' value={name} onChange={e => setName(e.target.value)} /><br /><br />
            <input type='text' placeholder='LastName' value={lastName} onChange={e => setLastName(e.target.value)} /><br /><br />
            <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} /><br /><br />
            <button onClick={saveHandler} >Save</button>
        </div>
    )
};


export async function getServerSideProps(context) {
    const { U } = context.req.cookies;
    const result = await verifyToken(U);
    if (!result) {
        return { redirect: { destination: '/auth/singin', permanent: false } }
    }

    return { props: { result } };
}