"use client"
import { useState } from 'react';
export default function AboutTamplate({
    children,
}: { children: React.ReactNode }) {
    let [count, setCount] = useState(0);
    return <div>
        <div>-------Tamplate-----------》》》</div>
        <div>temp{count}
            <span onClick={() => setCount(count + 1)}>+</span>
        </div>
        {children}
        <div>-------Tamplate-----------《《《</div>
    </div>;


}