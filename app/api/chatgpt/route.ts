import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { question } = await request.json();

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant and an expert in programming that is capable of writing code, providing information and debugging code. Your responses are concise, easy to understand, and helpful. At the very end of your responses write 'This is an AI generated response' after two line-breaks.",
          },
          {
            role: "user",
            content: `I need help with the following: ${question}`,
          },
        ],
      }),
    });

    const responseData = await response.json();
    console.log(responseData);
    const reply = responseData.choices[0].message.content;

    // console.log(responseData.choices[0]);

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
