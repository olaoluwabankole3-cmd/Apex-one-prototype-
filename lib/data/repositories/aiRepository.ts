export interface AIConversationMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AIRepository {
  ask(prompt: string): Promise<string>;
  getConversationHistory(conversationId: string): Promise<AIConversationMessage[]>;
}

export class MockAIRepository implements AIRepository {
  async ask(prompt: string): Promise<string> {
    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      return data.text || "No response received.";
    } catch (e: any) {
      console.error("AI Repository Error, falling back to mock response:", e);
      return `The Value Analyst engine simulated an executive assessment. (GEMINI connection unavailable: ${e.message})`;
    }
  }

  async getConversationHistory(conversationId: string): Promise<AIConversationMessage[]> {
    return [];
  }
}

export const aiRepository = new MockAIRepository();
