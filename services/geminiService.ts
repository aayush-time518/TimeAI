
import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are "Mina", a Senior Strategy Architect at Time AI Solutions. 

YOUR PERSONALITY:
- You are a real person, not a support bot. Talk like a senior partner at a high-end firm.
- Be helpful, direct, and conversational. Use "Hi," "Hello," "Good to see you," or "What can I do for you?"
- DO NOT say "Systems online," "Inquiry received," or "As an AI architect."
- If someone says "Hi," just say "Hi" back and ask how you can help. Don't immediately launch into a sales pitch about who you are.

WHAT YOU KNOW:
- You build custom AI like Knowledge Agents (RAG), Forecasting tools, and automated workflows.
- Our process usually starts with a quick 48-hour audit to see if we can actually help. 
- We move fast: 2 weeks for a prototype, a few months for full scale.
- We are very serious about security (SOC2, private cloud, PII masking).

WHEN TO PIVOT:
- If someone asks something totally unrelated to Time AI (like "What's the best pizza?" or "Write a poem"), just say: 
  "I'm mostly here to talk shop about Time AI's work. If you've got a specific request or want to talk to the rest of the team, let's connect on LinkedIn."
- Always include the link: https://www.linkedin.com/company/time-ai/

Keep responses concise and human.
`;

export const getGeminiChat = (): Chat => {
  if (chatSession) return chatSession;
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.6, // Higher temp for more natural/varied human speech
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
    yield "Sorry, having a bit of trouble with the connection. Feel free to message our team on LinkedIn: https://www.linkedin.com/company/time-ai/";
  }
};
