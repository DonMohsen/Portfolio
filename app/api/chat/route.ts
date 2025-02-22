import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  prompt: string;
  imageUrl?: string;
}

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const { prompt, imageUrl }: RequestBody = await req.json();

    // Check if prompt exists, if not return a 400 error
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    // Log the incoming request for debugging
    console.log("Received prompt:", prompt);
    console.log("Received image URL:", imageUrl);

    // Prepare the OpenRouter request payload
    const payload: any = {
      model: "google/gemini-2.0-pro-exp-02-05:free",
      messages: [{ role: "user", content: prompt }],
    };

    // Add the image URL only if provided
    if (imageUrl) {
      payload.messages.push({
        role: "user",
        content: {
          type: "image_url",
          image_url: { url: imageUrl },
        },
      });
    }

    // Send the request to OpenRouter's API
    const apiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, // Ensure correct API key is set
        "HTTP-Referer": process.env.SITE_URL || "<YOUR_SITE_URL>", // Optional, for site ranking
        "X-Title": process.env.SITE_NAME || "<YOUR_SITE_NAME>", // Optional, for site ranking
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Check if the API response was successful
    if (!apiResponse.ok) {
      throw new Error(`OpenRouter API failed with status: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();

    // Ensure the response contains the correct structure
    if (data?.choices?.length > 0) {
      const responseText = data.choices[0].message.content;
      return NextResponse.json({ response: responseText }, { status: 200 });
    } else {
      throw new Error("No valid choices in the response from OpenRouter API.");
    }
  } catch (error:any) {
    // Log the error for debugging
    console.error("Error with OpenRouter request:", error);

    return NextResponse.json({ error: error.message || "Unknown error occurred." }, { status: 500 });
  }
}