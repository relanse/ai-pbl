import {createOpenAI} from '@ai-sdk/openai'
import {generateText, streamText} from 'ai'

const openai = createOpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: import.meta.env.VITE_OPENAI_API_BASE_URL
})

const model = openai('gpt-5-chat')

/**
 * 非流式获取 AI 响应
 * @param {string} userInput 用户输入的提示
 * @param {string} systemPrompt 系统提示
 * @returns {Promise<any>} 返回一个包含 AI 完整响应的 Promise
 */
export const getAiResponse = async ({
  userInput = '',
  systemPrompt = 'You are a helpful assistant.'
}: {userInput?: string; systemPrompt?: string} = {}): Promise<any> => {
  try {
    const {text} = await generateText({
      model: model,
      system: systemPrompt,
      prompt: userInput
    })
    return text
  } catch (error) {
    console.error('Error fetching AI response:', error)
    throw error
  }
}

/**
 * 流式获取 AI 响应
 * @param {string} userInput 用户输入的提示
 * @param {string} systemPrompt 系统提示
 * @param {function} onFinish 回调函数，用于处理完成
 * @param {function} onContent 回调函数，用于处理每次接收到的内容
 */
export const getAiResponseStream = async ({
  userInput = '',
  systemPrompt = 'You are a helpful assistant.',
  onFinish = () => {},
  onContent = (content: string) => {}
}: {
  userInput?: string
  systemPrompt?: string
  onFinish?: () => void
  onContent?: (content: string) => void
} = {}) => {
  try {
    const result = await streamText({
      model: model,
      system: systemPrompt,
      prompt: userInput
    })
    for await (const part of result.textStream) {
      onContent(part)
    }
    onFinish()
  } catch (error) {
    console.error('Error fetching AI response:', error)
    throw error
  }
}

