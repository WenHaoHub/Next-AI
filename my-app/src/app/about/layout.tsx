"use client"
import { useState } from 'react';
export default function AboutLayout({ children, }: { children: React.ReactNode }) {
    let [count, setCount] = useState(0);
    return <div>
        <div>top</div>
        <div>lay{count}
            <span onClick={() => setCount(count + 1)}>+</span>
        </div>
        {children}
        <div>bottom</div>
    </div>;


}