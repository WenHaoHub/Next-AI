'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation"

import { useState } from "react";
export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        if (data.code === 0) {
          router.push("/home")
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <h1>please login</h1>
      <Input type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} placeholder="Username" className="mb-4" />
      Input password:
      <Input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" className="mb-4" />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}
