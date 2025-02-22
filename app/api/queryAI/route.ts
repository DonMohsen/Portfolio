import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com', // DeepSeek's API base URL
  apiKey: process.env.DEEPEEK_API_KEY, // Your DeepSeek API key
});

interface RequestBody {
  prompt: string;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt }: RequestBody = await req.json();

    // Debug log: Check prompt and request data
    console.log('Received prompt:', prompt);

    // Request to DeepSeek via OpenAI SDK
    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat', // Model you're using (DeepSeek model)
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt }, // User's prompt
      ],
    });

    // Debug log: Check what we get from DeepSeek API
    console.log('API response:', completion);

    return NextResponse.json({ response: completion.choices[0].message.content }, { status: 200 });
  } catch (error:any) {
    console.error('Error with DeepSeek request:', error);

    // Log the error message to help debug
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
