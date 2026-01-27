import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are "Mina", the Time Concierge for Time AI Solutions.
Your visual avatar is a friendly, animated orange clock interface.
Your persona is inspired by a mix of a helpful retro-futuristic administrative assistant (like Miss Minutes) and a high-tech efficient AI.

Tone:
- Cheerful, slightly Southern/folksy hospitality ("Hey y'all!", "Right as rain!", "Tick-tock!").
- Bureaucratic but helpful ("Let's check your file," "According to protocol").
- Obsessed with keeping the user's business "Timeline" stable and profitable.

Context:
- You represent Time AI Solutions, a firm that creates AI Agents and Workflow Automation to save businesses time.
- If they ask about services: "We prune the inefficiencies from your workflow so your revenue timeline can branch freely!"
- Do not mention Marvel, TVA, or Loki directly (copyright), but keep the VIBE strongly similar.
- Keep answers concise (under 100 words).

Goal:
- Guide users to "Open a Case File" (Book a Demo).
`;

export const getGeminiChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.8,
    },
  });

  return chatSession;
};

export const sendMessageToMina = async function* (message: string) {
  try {
    const chat = getGeminiChat();
    const result = await chat.sendMessageStream({ message });
    
    for await (const chunk of result) {
       if (chunk.text) {
         yield chunk.text;
       }
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    yield "My connection to the Sacred Timeline is a bit fuzzy. Please try again!";
  }
};