import axios from 'axios'

// --- 类型定义 ---
// ComfyUI API
interface ComfyUIPrompt {
  [nodeId: string]: {
    inputs: Record<string, any>
    class_type: string
  }
}

interface QueuePromptResponse {
  prompt_id: string
  number: number
  node_errors: Record<string, any>
}

// Gemini API
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

const GEMINI_API_URL = 'https://whatcanisay.zeabur.app/v1/chat/completions'

//comfyui api
const COMFYUI_BASE_URL = 'http://127.0.0.1:8188'

const ComfyUIClient = axios.create({
  baseURL: COMFYUI_BASE_URL
})

/**
 * 使用 Gemini API (OpenAI兼容格式) 流式生成文本内容
 * @param prompt 你的文本提示
 * @param onChunk 回调函数，用于处理每个接收到的文本块
 * @param onComplete 完成时的回调函数
 */
export async function generateTextWithGeminiStream(
  prompt: string,
  onChunk: (chunk: string) => void,
  onComplete: () => void
): Promise<void> {
  try {
    const response = await fetch(GEMINI_API_URL, {
      // 移除 ?alt=sse
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 如果需要，在这里添加 'Authorization': `Bearer ${GEMINI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gemini-2.5-pro', // 指定一个模型，这通常是必需的
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        stream: true // 开启流式输出
      })
    })

    if (!response.ok || !response.body) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const {value, done} = await reader.read()
      if (done) {
        onComplete()
        break
      }

      const chunk = decoder.decode(value)
      const lines = chunk.split('\n').filter(line => line.startsWith('data: '))

      for (const line of lines) {
        const jsonStr = line.replace(/^data: /, '')

        // 检查流结束的标志
        if (jsonStr.trim() === '[DONE]') {
          onComplete()
          return
        }

        try {
          const parsed = JSON.parse(jsonStr)
          // 从 OpenAI 兼容的 delta 中获取内容
          const text = parsed.choices[0]?.delta?.content || ''
          if (text) {
            onChunk(text)
          }
        } catch (error) {
          // 忽略JSON解析错误
        }
      }
    }
  } catch (error) {
    console.error('Error calling streaming OpenAI-compatible API:', error)
    throw new Error('调用流式 API 失败')
  }
}
