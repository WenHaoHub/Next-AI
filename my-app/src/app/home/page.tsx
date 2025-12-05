'use client'
import Link from 'next/link'
import { Suspense, useEffect } from 'react'
import { useChat } from "@ai-sdk/react";
import { useSearchParams, redirect, permanentRedirect } from 'next/navigation'
const checkCookie = async () => {
  const res = await fetch(`/api/login`)
  const data = await res.json();
  console.log('>>>checkCookie', data);
  if (data.code !== 0) {
    return false;
  } else {
    return true;
  }
}



function HomeContent() {
  useEffect(() => {
    checkCookie().then(res => {
      console.log('>>>loggedIn', res);
      if (!res) {
        redirect('/');
      }
    });

  }, []);
  const {messages,sendMessage}=useChat();
  let SearchParams = useSearchParams();
  let id = SearchParams.get('id');
  let jump = SearchParams.get('jump');
  if (jump) {
    redirect('/about');
  }
  return (
    <div>
      Home=={id}
      <Link href="/about" className="block">about</Link>
      <Link href="/routerHooks" className="block">routerHooks</Link>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}