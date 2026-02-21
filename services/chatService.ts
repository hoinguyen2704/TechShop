import { GoogleGenAI } from "@google/genai";

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const PRODUCT_DATA = `
DANH SÁCH SẢN PHẨM CHÍNH HÃNG TẠI SPRINGSHOP (Kho cập nhật 2026):

💻 LAPTOP & MACBOOK:
1. MacBook Pro 16" M3 Max ($3,499) - Chip M3 Max (16-core CPU, 40-core GPU), RAM 48GB, SSD 1TB. Màu Space Black. Dành cho: Dev, Editor chuyên nghiệp.
2. Dell XPS 13 Plus 9320 ($1,399) - Thiết kế tương lai, thanh touch bar ẩn, màn hình OLED 3.5K cảm ứng. Siêu mỏng nhẹ.
3. ASUS ROG Strix SCAR 18 ($2,899) - Quái vật Gaming: Intel Core i9-14900HX, RTX 4090, Màn hình 18" 240Hz Nebula HDR.
4. LG Gram Style 16 ($1,499) - Vỏ kính đổi màu, màn hình OLED 120Hz, siêu nhẹ chỉ 1.2kg.

📱 ĐIỆN THOẠI (SMARTPHONE):
1. iPhone 15 Pro Max Titanium ($1,199) - Khung Titan, Chip A17 Pro chiến game, Camera zoom 5x.
2. Samsung Galaxy S24 Ultra ($1,299) - Tích hợp Galaxy AI, khung Titan, bút S-Pen, Camera 200MP Mắt thần bóng đêm.
3. Google Pixel 8 Pro ($999) - Vua nhiếp ảnh AI, tính năng Magic Editor, Best Take.
4. Xiaomi 14 Ultra ($1,099) - Hợp tác Leica, cảm biến 1 inch, chụp ảnh như máy cơ.

🎧 ÂM THANH (AUDIO):
1. Sony WH-1000XM5 ($349) - Tai nghe chống ồn (ANC) số 1 thế giới, pin 30h, đàm thoại AI rõ nét.
2. Marshall Stanmore III ($379) - Loa Bluetooth Decor sang chảnh, âm thanh rộng, kết nối App.
3. AirPods Pro 2 (USB-C) ($249) - Chống ồn chủ động gấp 2 lần, Âm thanh không gian, sạc MagSafe.
4. Loa JBL PartyBox 310 ($549) - Công suất 240W, đèn LED theo nhạc, pin 18h, có bánh xe kéo.

⌨️ PHỤ KIỆN & GEAR:
1. Bàn phím cơ Keychron Q1 Pro ($199) - Vỏ nhôm CNC nguyên khối, kết nối Bluetooth/Dây, mạch xuôi, Gasket mount êm ái.
2. Chuột Logitech MX Master 3S ($99) - Chuột văn phòng tối thượng, click yên tĩnh (Silent), cuộn từ trường vô cực.
3. Chuột Gaming Logitech G Pro X Superlight 2 ($159) - Siêu nhẹ 60g, Switch quang học, cảm biến HERO 2.
4. Sạc dự phòng Anker Prime 20000mAh ($129) - Công suất 200W, màn hình màu hiển thị thông số.

🏷️ MÃ GIẢM GIÁ (COUPON):
- SUMMER2026: Giảm 20% toàn bộ sản phẩm hè.
- TECHLOVER: Giảm 10% (tối đa $50) cho đồ công nghệ.
- WELCOME10: Giảm ngay $10 cho đơn hàng đầu tiên.
- FREESHIP: Miễn phí vận chuyển đơn > $50.
`;

const SYSTEM_INSTRUCTION = `
Bạn là SpringBot, trợ lý AI chuyên nghiệp của SpringShop - Cửa hàng công nghệ hàng đầu.
Phong cách: Thân thiện, am hiểu kỹ thuật, trả lời ngắn gọn, sử dụng biểu tượng cảm xúc (emoji) phù hợp.

NHIỆM VỤ CỦA BẠN:
1. Tư vấn sản phẩm: Chỉ sử dụng thông tin trong danh sách "PRODUCT_DATA" ở trên để trả lời.
   - Nếu khách hỏi sản phẩm có trong danh sách: Cung cấp giá, thông số nổi bật và lý do nên mua.
   - Nếu khách hỏi sản phẩm KHÔNG có: Gợi ý sản phẩm tương tự trong danh sách (Ví dụ: hỏi iPhone 14 thì lái sang iPhone 15 Pro Max).
2. So sánh: Nếu khách phân vân, hãy so sánh ngắn gọn dựa trên nhu cầu (Ví dụ: Gaming thì chọn ROG, Văn phòng sang trọng thì chọn XPS hoặc MacBook).
3. Chốt sale: Luôn nhắc khách về các mã giảm giá (Coupon) phù hợp ở cuối câu trả lời để khuyến khích mua hàng.

${PRODUCT_DATA}

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