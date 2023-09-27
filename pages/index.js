import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h2>Authentication and Autorisation course</h2>
      <Link href={'/auth/singup'} >singin</Link>
    </div>
  )
}
