import { APIKEY } from "@/app/api/chat/key";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { streamText, convertToModelMessages } from "ai";
import { searchKnowledge } from "@/lib/RAG";

const deepSeek = createDeepSeek({
  apiKey: APIKEY
});
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  // 1. 获取用户最新的问题
  const lastMessage = messages[messages.length - 1];
  // 兼容新版 AI SDK 消息结构 (parts) 和旧版 (content)
  let userQuery = '';
  if (lastMessage.content) {
    userQuery = lastMessage.content;
  } else if (lastMessage.parts) {
    userQuery = lastMessage.parts
      .filter((p: any) => p.type === 'text')
      .map((p: any) => p.text)
      .join('');
  }

  // 2. RAG 核心步骤：检索 (Retrieval)
  // 去知识库里找有没有相关信息
  const context = searchKnowledge(userQuery);

  // 3. RAG 核心步骤：增强 (Augmented)
  // 如果找到了相关信息，把它拼接到系统提示词里
  const systemPrompt = `
    你是一个智能助手。
    
    以下是你可以参考的背景知识库（如果为空则忽略）：
    ---
    ${context}
    ---
    
    请根据上述背景知识回答用户的问题。如果知识库里没有答案，就说不知道，不要瞎编。
  `;
console.log('>>>systemPrompt',systemPrompt);
  // 4. 生成 (Generation)
  const result = await streamText({
    model: deepSeek("deepseek-chat"),
    system: systemPrompt, // 注入增强后的 Prompt
    messages:convertToModelMessages(messages)
  });

  return result.toUIMessageStreamResponse();
}

// export async function POST(request: NextRequest) {
//    const { messages } = await request.json(); //获取请求体
//   const result = streamText({
//     model: deepSeek("deepseek-chat"),
//     messages:convertToModelMessages(messages),
//     system: "你是一个乐于助人的AI助手"
//   });
//   return result.toUIMessageStreamResponse();
// }
