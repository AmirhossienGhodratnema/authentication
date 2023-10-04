import { verifyToken } from "@/backend/utils/auth";
import { useEffect } from "react"

export default function Dashbord() {

    // useEffect(() => {
    //     fetch('http://localhost:3000/api/user', {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json' }
    //     })
    //         .then(res => res.json())
    //         .then(result => console.log(result))
    // }, [])


    return (
        <div>
            <h2>Dashbord</h2>
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