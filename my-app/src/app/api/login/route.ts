import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
export async function GET(request: NextRequest) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value || null;
  if (token && token === "123456") {
    return NextResponse.json({ code: 0, message: "已登录", data: { token } });
  } else {
    return NextResponse.json({ code: 1, message: "未登录" });
  }
}
export async function POST(request: NextRequest) {
  const body = await request.json();
  if (body.username === "admin" && body.password === "password") {
    const cookiesStore = await cookies();
    cookiesStore.set("token", "123456", {
      httpOnly: true,
      maxAge: 60 * 60 * 24
    });
    return NextResponse.json({ code: 0, message: "登录成功" });
  } else {
    return NextResponse.json({ code: 1, message: "用户名或密码错误" });
  }
}
