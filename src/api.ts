import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyAhyh-yaH0vwn2Q6EZ0UBVMBvIOrcsTrIA';

export async function getBookExplanation(book: string) {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);

    const model = genAI.getGenerativeModel({
      model: 'models/gemini-1.5-flash',
    });

    const prompt = `Write an explanation of the Bible book "${book}" in the warm, engaging style of Max Lucado, including:
    1. Historical context and setting - written with vivid imagery and relatable metaphors
    2. Main characters - described with emotional depth and human connection
    3. Key events - narrated as compelling stories that touch the heart
    4. Central themes - explained with pastoral warmth and practical application
    5. Life lessons - shared with hope and encouragement
    6. Notable passages - illuminated with Max Lucado's signature storytelling style
    7. Connection to our daily walk with God
    
    Make the writing style warm, accessible, and inspiring - just like Max Lucado's books.`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Error fetching book explanation:', error);
    throw error;
  }
}
