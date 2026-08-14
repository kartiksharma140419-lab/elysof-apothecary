import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import elyAvatar from "@/assets/ely-avatar.jpeg.asset.json";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const RECO_RE = /\[\[RECOMMEND:([^\]]*)\]\]/i;

const STARTERS = [
  "Suggest me something",
  "Anything for de-tan?",
  "Aapka best soap kaunsa hai?",
];

const WELCOME =
  "Namaste! I'm **Ely** from ElySof 🌿 Tell me your skin concern — acne, tan, dullness or dryness — and I'll pick the perfect Ayurvedic soap for you.";

function parse(content: string) {
  const m = content.match(RECO_RE);
  const ids = m
    ? m[1]
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean)
    : [];
  return {
    text: content.replace(RECO_RE, "").trim(),
    recos: ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products,
  };
}

export function ElyChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "assistant", content: WELCOME }]);
  const { add } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy, open]);

  useEffect(() => {
    if (open && !busy) inputRef.current?.focus();
  }, [open, busy]);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || busy) return;
    setInput("");
    const next: Msg[] = [...msgs, { role: "user", content: text }];
    setMsgs(next);
    setBusy(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ely-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const err = await res.text().catch(() => "");
        throw new Error(
          res.status === 429
            ? "I'm getting a lot of questions right now — please try again in a moment."
            : res.status === 402
              ? "Our AI assistant is temporarily unavailable. Please WhatsApp us at +91 83697 29653."
              : err || "network",
        );
      }

      setMsgs((m) => [...m, { role: "assistant", content: "" }]);
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buffer = "";
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += dec.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const data = line.slice(5).trim();
          if (!data || data === "[DONE]") continue;
          try {
            const delta = JSON.parse(data)?.choices?.[0]?.delta?.content;
            if (delta) {
              acc += delta;
              setMsgs((m) => {
                const copy = [...m];
                copy[copy.length - 1] = { role: "assistant", content: acc };
                return copy;
              });
            }
          } catch {
            /* partial chunk */
          }
        }
      }

      if (!acc) {
        setMsgs((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            role: "assistant",
            content: "Sorry, I couldn't answer that. Could you ask again?",
          };
          return copy;
        });
      }
    } catch (e) {
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content:
            e instanceof Error && e.message !== "network"
              ? e.message
              : "I couldn't connect just now. Please try again in a moment 🙏",
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        aria-label={open ? "Close ElySof chat" : "Chat with Ely, ElySof beauty expert"}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-4 right-4 z-[900] flex items-center gap-2 border-2 border-ink bg-terracotta px-3 py-2 text-ink shadow-brut-sm transition-transform hover:-translate-y-0.5 sm:bottom-6 sm:right-6"
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <>
            <img
              src={elyAvatar.url}
              alt="Ely, the ElySof AI skincare expert"
              className="h-8 w-8 rounded-full border-2 border-ink object-cover object-top"
            />
            <span className="text-xs font-bold uppercase tracking-widest">Ask Ely</span>
            <MessageCircle className="h-4 w-4" />
          </>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-x-0 bottom-0 z-[901] flex h-[85dvh] flex-col border-2 border-ink bg-parchment shadow-brut sm:inset-x-auto sm:bottom-24 sm:right-6 sm:h-[560px] sm:w-[380px]"
          role="dialog"
          aria-label="Chat with Ely"
        >
          {/* Header */}
          <header className="flex items-center gap-3 border-b-2 border-ink bg-forest px-4 py-3">
            <div className="relative">
              <img
                src={elyAvatar.url}
                alt="Ely, the ElySof AI skincare expert"
                className="h-11 w-11 rounded-full border-2 border-parchment object-cover object-top"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-forest bg-green-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base font-bold leading-tight text-parchment">
                Ely — ElySof Expert
              </p>
              <p className="text-[11px] uppercase tracking-widest text-parchment/70">Online</p>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="text-parchment/80 hover:text-parchment"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          {/* Transcript */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {msgs.map((m, i) => {
              const { text, recos } = m.role === "assistant" ? parse(m.content) : { text: m.content, recos: [] };
              return (
                <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div className={cn("max-w-[88%] space-y-3", m.role === "user" && "max-w-[80%]")}>
                    <div
                      className={cn(
                        "text-sm leading-relaxed",
                        m.role === "user"
                          ? "border-2 border-ink bg-forest px-3 py-2 text-parchment"
                          : "text-ink",
                      )}
                    >
                      {m.role === "assistant" ? (
                        <div className="[&_a]:underline [&_li]:ml-4 [&_li]:list-disc [&_p+p]:mt-2 [&_strong]:font-bold">
                          <ReactMarkdown>{text}</ReactMarkdown>
                        </div>
                      ) : (
                        text
                      )}
                    </div>

                    {recos.map((p) => (
                      <div key={p.id} className="flex gap-3 border-2 border-ink bg-paper p-2">
                        <img
                          src={p.image}
                          alt={`${p.name} product pack`}
                          className="h-16 w-16 flex-none border border-ink object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-bold text-ink">{p.shortName}</p>
                          <p className="text-xs text-muted-foreground">
                            <span className="font-bold text-ink">₹{p.price}</span>{" "}
                            <span className="line-through">₹{p.mrp}</span>
                          </p>
                          <button
                            type="button"
                            onClick={() => add(p)}
                            className="mt-1 border border-ink bg-terracotta px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-ink"
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {busy && msgs[msgs.length - 1]?.role === "user" && (
              <p className="animate-pulse text-sm text-muted-foreground">Ely is typing…</p>
            )}

            {msgs.length === 1 && (
              <div className="flex flex-col items-end gap-2 pt-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border-2 border-forest px-3 py-1.5 text-xs font-semibold text-forest transition-colors hover:bg-forest hover:text-parchment"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 border-t-2 border-ink bg-paper p-2"
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Ask about ElySof — any language"
              className="max-h-28 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-ink outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={busy || !input.trim()}
              className="flex h-9 w-9 flex-none items-center justify-center border-2 border-ink bg-forest text-parchment disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
