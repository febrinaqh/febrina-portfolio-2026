"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getFelyReply, type Message } from "./reply";

const STARTERS = [
  "Most impressive project?",
  "What AI/ML skills?",
  "Where has she worked?",
  "Open to work now?",
];

interface Props {
  onClose: () => void;
  onThinking?: (thinking: boolean) => void;
}

export default function FelyChat({ onClose, onThinking }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Fely, Febrina's cat 🐱. Ask me anything about her: experience, projects, skills.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const history: Message[] = [
      ...messages,
      { role: "user", content: text.trim() },
    ];
    setMessages(history);
    setInput("");
    setLoading(true);
    onThinking?.(true);

    try {
      const reply = await getFelyReply(history);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oops, something went wrong 😿 Try again!" },
      ]);
    } finally {
      setLoading(false);
      onThinking?.(false);
    }
  };

  const canSend = input.trim() !== "" && !loading;

  return (
    <motion.div
      data-fely-chat
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.97 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed right-4 z-50 flex h-[min(520px,75vh)] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d17]/95 shadow-2xl shadow-black/50 backdrop-blur-xl sm:right-6"
      style={{ bottom: "calc(84px + env(safe-area-inset-bottom, 0px))" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-lg">
          🐱
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-zinc-100">Fely</p>
          <p className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Febrina&apos;s cat assistant
          </p>
        </div>
        <button
          type="button"
          aria-label="Close chat"
          onClick={onClose}
          className="cursor-pointer rounded-md p-1.5 text-zinc-500 transition hover:bg-white/5 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
              msg.role === "user"
                ? "ml-auto rounded-tr-sm bg-violet-500/20 text-violet-100"
                : "rounded-tl-sm border border-white/5 bg-white/[0.04] text-zinc-200",
            )}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="flex max-w-[85%] gap-1 rounded-2xl rounded-tl-sm border border-white/5 bg-white/[0.04] px-3.5 py-2.5 text-xs text-zinc-500">
            {[0, 0.2, 0.4].map((d) => (
              <span key={d} style={{ animation: `pulse-dot 0.8s ${d}s infinite` }}>
                ●
              </span>
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick starters */}
      {messages.length === 1 && (
        <div className="no-sb flex gap-2 overflow-x-auto px-4 pb-3">
          {STARTERS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="shrink-0 cursor-pointer whitespace-nowrap rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-200"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-white/5 p-3"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Fely anything..."
          disabled={loading}
          className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20"
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={!canSend}
          className={cn(
            "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition",
            canSend
              ? "cursor-pointer bg-gradient-to-br from-violet-500 to-cyan-400 text-black hover:scale-105"
              : "cursor-not-allowed bg-white/10 text-zinc-600",
          )}
        >
          →
        </button>
      </form>
    </motion.div>
  );
}
