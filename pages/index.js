import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h2>Authentication and Autorisation course</h2>
      <button><Link href={'/auth/singup'} >Singup</Link></button>
      <button><Link href={'/auth/singin'} >Singin</Link></button>
      <button><Link href={'/dashbord'} >Dashbord</Link></button>
      
      
    </div>
  )
}
