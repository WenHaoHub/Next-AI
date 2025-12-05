'use client'
import { useRouter } from "next/navigation"
export default function Page() {
    const router = useRouter()
    return (
        <>
            <button onClick={() => router.push("/home")} className="block">跳转page页面</button>
            <button onClick={() => router.replace("/home")} className="block">替换当前页面</button>
            <button onClick={() => router.back()} className="block">返回上一页</button>
            <button onClick={() => router.forward()} className="block">跳转下一页</button>
            <button onClick={() => router.refresh()} className="block">刷新当前页面</button>
            <button onClick={() => router.prefetch("/home")} className="block">预获取about页面</button>
        </>
    )
}