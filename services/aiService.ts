import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTemporalInsightsStream = async (userPrompt: string) => {
  const ai = getAIClient();
  return await ai.models.generateContentStream({
    model: "gemini-3-flash-preview",
    // Simplifying contents to a string for direct prompt usage
    contents: userPrompt,
    config: {
      systemInstruction: `You are the Time AI Navigator, a high-level temporal intelligence. 
      Your purpose is to guide users through their focus cycles. 
      Speak in a precise, slightly futuristic, yet highly encouraging tone. 
      Use technical metaphors (e.g., 'bandwidth', 'sync', 'frequency').
      Keep responses brief and punchy.`,
      temperature: 0.8,
    },
  });
};

export const optimizeSchedule = async (events: any[]) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Optimize this schedule for maximum deep work efficiency: ${JSON.stringify(events)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            startTime: { type: Type.STRING },
            endTime: { type: Type.STRING },
            reasoning: { type: Type.STRING }
          },
          required: ["id", "title", "startTime", "endTime", "reasoning"]
        }
      }
    }
  });
  return JSON.parse(response.text || '[]');
};

