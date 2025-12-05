import OpenAI from 'openai'

// 创建OpenAI客户端实例，配置为使用DeepSeek API
export const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_API_BASE_URL,
})