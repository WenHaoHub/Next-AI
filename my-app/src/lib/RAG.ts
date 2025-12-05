
// src/lib/utils.ts (或者新建一个文件)
import { myKnowledgeBase } from './fake-data';

export function searchKnowledge(query: string) {
  // 简单的关键词匹配模拟 RAG 的 "Retrieval" 过程
  const results = myKnowledgeBase.filter(item => 
    query.includes(item.content.substring(0, 5)) || // 极其简陋的模拟
    item.content.includes(query) ||
    query.includes("作者") && item.content.includes("作者") // 模拟语义命中
  );
  
  return results.map(r => r.content).join("\n");
}