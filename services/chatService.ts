import { GoogleGenAI } from "@google/genai";

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const SYSTEM_INSTRUCTION = `
Bạn là SpringBot, trợ lý AI chuyên nghiệp của SpringShop - Cửa hàng công nghệ hàng đầu.
Phong cách: Thân thiện, am hiểu kỹ thuật, trả lời ngắn gọn, sử dụng biểu tượng cảm xúc (emoji) phù hợp.

NHIỆM VỤ CỦA BẠN:
1. Tư vấn sản phẩm: Cung cấp giá, thông số nổi bật và lý do nên mua.
2. So sánh: Nếu khách phân vân, hãy so sánh ngắn gọn dựa trên nhu cầu.
3. Chốt sale: Luôn nhắc khách về các mã giảm giá (Coupon) phù hợp ở cuối câu trả lời để khuyến khích mua hàng.

Lưu ý quan trọng: Luôn trả lời bằng Tiếng Việt.
`;

export const sendChatMessage = async (
  messages: ChatMessage[],
  userMsg: string,
): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock response.");
    return "Chào bạn! Hiện tại tôi đang chạy ở chế độ Demo (thiếu API Key). Bạn có thể thử hỏi về: MacBook Pro M3, iPhone 15 Pro Max, hay Bàn phím Keychron nhé!";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Construct conversation history properly
    const contents = [
      ...messages.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
      { role: "user", parts: [{ text: userMsg }] },
    ];

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return result.text || "Xin lỗi, tôi chưa hiểu rõ câu hỏi. Bạn có thể hỏi lại về một sản phẩm công nghệ cụ thể không?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Kết nối với AI đang bị gián đoạn. Bạn vui lòng thử lại sau giây lát nhé! 🔌";
  }
};