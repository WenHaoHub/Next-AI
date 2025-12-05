'use client'
import { useParams } from 'next/navigation'
export default function HomeContent() {
    const params = useParams();
    let id = params.id;
    return (
        <div>
            动态参数{id}
        </div>
    )
}
