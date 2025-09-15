import axios from 'axios'

const OPENAI_COMPLETE_URL = 'https://api.kksj.org/v1/chat/completions'

const OPENAI_COMPLETE_KEY = import.meta.env.VITE_OPENAI_API_KEY

/**
 * 非流式获取 AI 响应
 * @param {string} userInput 用户输入的提示
 * @param {string} systemPrompt 系统提示
 * @returns {Promise<any>} 返回一个包含 AI 完整响应的 Promise
 */
export const getAiResponse = async ({userInput = '',systemPrompt = 'You are a helpful assistant.'}:
   {userInput?: string
    systemPrompt?: string
   } = {}): Promise<any> => {
  const headers = {
    'Authorization': `Bearer ${OPENAI_COMPLETE_KEY}`,
    'Content-Type': 'application/json'
  }

  const data= {
    model: 'gpt-5-chat',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userInput }
    ],
  }
  try {
    const response = await axios.post(OPENAI_COMPLETE_URL, data, { headers});
    return response.data;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    throw error;
  }
}

/**
 * 流式获取 AI 响应
 * @param {string} userInput 用户输入的提示
 * @param {string} systemPrompt 系统提示
 * @param {function} onFinish 回调函数，用于处理完成
 * @param {function} onContent 回调函数，用于处理每次接收到的内容
 */
export const getAiResponseStream = async (
  {
    userInput = '',
    systemPrompt = 'You are a helpful assistant.',
    onFinish = () => {},
    onContent = (content: string) => {}
  }: {
    userInput?: string
    systemPrompt?: string
    onFinish?: () => void
    onContent?: (content: string) => void
  } = {}
) => {
  const headers = {
    'Authorization': `Bearer ${OPENAI_COMPLETE_KEY}`,
    'Content-Type': 'application/json'
    }
    const data= {
      model: 'gpt-5-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userInput }
      ],
      stream: true
    };
    try {
      const response = await fetch(OPENAI_COMPLETE_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });
      if (!response.body){
        throw new Error('ReadableStream not supported in this environment.');
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      while (true) {
        const { done, value} = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim() !== '')
          for (const line of lines) {
            if(line === 'data: [DONE]') {
              onFinish();
              return;
            }
            if (line.startsWith('data: ')) {
                    const dataStr = line.substring(6);
                    try {
                        const dataJson = JSON.parse(dataStr);
                        const content = dataJson.choices[0]?.delta?.content;
                        if (content) {
                            onContent(content);
                        }
                    } catch (error) {
                      console.warn('Failed to parse JSON:', error);
                        // 忽略无法解析的 JSON
                    }
                  }
          }
      }
      onFinish();
    } catch (error) {
      console.error('Error fetching AI response:', error);
      throw error;
    }
}