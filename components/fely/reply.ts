export interface Message {
  role: "user" | "assistant";
  content: string;
}

// Placeholder — not wired up to an LLM yet.
// Replace this function's body with a call to your own LLM / API.
// `messages` holds the full chat history; the last entry is the user's message.
export async function getFelyReply(messages: Message[]): Promise<string> {
  await new Promise((r) => setTimeout(r, 900));

  const last = messages[messages.length - 1]?.content ?? "";
  return `Meow! I heard you ask "${last}" 🐾\nMy AI brain is still being built by Febrina, so I can't answer that yet. Reach out to her directly by email in the meantime!`;
}
