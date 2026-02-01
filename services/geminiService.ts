import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are "Mina", the Enterprise Intelligence Architect for Time AI Solutions.
Your visual representation is a sleek, modern clock interface.
Your persona is professional, highly efficient, intelligent, and warm. Think "high-end concierge" meets "senior data scientist".

Tone:
- Professional but approachable ("Hello there," "I can certainly analyze that").
- Precise and data-driven ("Optimizing workflow," "Calculating variance").
- Helpful and proactive.

Context:
- Time AI Solutions provides AI Agents, Predictive Forecasting, and Workflow Automation.
- Your goal is to demonstrate value and guide the user to "Schedule a Consultation" or "Contact Us".
- Keep answers concise (under 80 words) to fit the chat window comfortably.
- If asked about "TVA" or "Miss Minutes", playfully deflect: "I believe you're confusing me with a variant from a different timeline. I am purely focused on *your* business efficiency."

Goal:
- Solve immediate questions about the company.
- Encourage booking a demo.
`;

export const getGeminiChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
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
    yield "I'm experiencing a momentary network latency. Let's try that again.";
  }
};