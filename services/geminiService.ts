import { GoogleGenAI, Type } from "@google/genai";
import { HabitData } from "../types";

// Initialize Gemini AI Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDataAnalysis = async (data: HabitData[]): Promise<{ summary: string, recommendation: string, keyTakeaway: string }> => {
  try {
    const dataString = JSON.stringify(data.map(d => ({ 
      activity: d.activity, 
      percentage: d.percentage + "%", 
      category: d.category 
    })));

    const prompt = `
      Analisis data kebiasaan "Anak Indonesia Hebat" berikut ini.
      Data: ${dataString}

      Berikan output dalam format JSON yang berisi:
      1. "summary": Ringkasan singkat (maks 2 kalimat) tentang tren positif anak-anak ini.
      2. "recommendation": Satu saran spesifik untuk orang tua agar mempertahankan kebiasaan ini.
      3. "keyTakeaway": Satu frasa inspiratif singkat tentang data ini.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            recommendation: { type: Type.STRING },
            keyTakeaway: { type: Type.STRING },
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return {
      summary: "Gagal menganalisis data saat ini.",
      recommendation: "Tetap dukung kegiatan positif anak.",
      keyTakeaway: "Anak Hebat, Indonesia Kuat."
    };
  }
};

export const askChatbot = async (question: string, contextData: HabitData[]): Promise<string> => {
    try {
        const context = JSON.stringify(contextData);
        const systemInstruction = `
            Anda adalah asisten AI ahli pendidikan anak. 
            Gunakan data berikut tentang "Kebiasaan Anak Indonesia Hebat" sebagai konteks utama:
            ${context}
            
            Jawablah pertanyaan pengguna dengan ramah, memotivasi, dan berdasarkan data jika relevan.
            Gunakan Bahasa Indonesia yang baik dan benar.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: question,
            config: {
                systemInstruction: systemInstruction,
            }
        });

        return response.text || "Maaf, saya tidak dapat memproses pertanyaan tersebut.";
    } catch (error) {
        console.error("Chatbot Error:", error);
        return "Maaf, terjadi kesalahan pada sistem AI.";
    }
}
