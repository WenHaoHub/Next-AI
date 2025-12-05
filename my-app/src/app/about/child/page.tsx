import Link from 'next/link'
import { redirect, permanentRedirect } from 'next/navigation'

export default function Home() {
  let jump = true; // 控制是否跳转
  if (jump) {
    redirect('/about/son');
  }
  return <div>child===
    <Link href="/about/son">son</Link>

  </div>;
}