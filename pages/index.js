import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [login, setLogin] = useState(false);

  const router = useRouter();
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(result => {
        if (result.success) setLogin(true);
      })
  }, [])
  const logOut = async () => {
    const res = await fetch('http://localhost:3000/api/auth/logout', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json();
    if (data.success) window.location.href = '/';
  }
  return (
    <div>
      <h2>Authentication and Autorisation course</h2>
      {login ?
        <>
          <button><Link href={'/dashbord'} >Dashbord</Link></button>
          <button onClick={logOut}>logOut</button>
        </>
        :
        <>
          <button><Link href={'/auth/singup'} >Singup</Link></button>
          <button><Link href={'/auth/singin'} >Singin</Link></button>
        </>
      }
    </div>
  )
}
