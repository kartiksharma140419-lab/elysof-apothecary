import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import elyAvatar from "@/assets/ely-avatar.jpeg";
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
    // strips the finished marker plus any half-streamed one at the tail
    text: content.replace(RECO_RE, "").replace(/\[{1,2}R?E?C?O?M?M?E?N?D?:?[^\]]*$/i, "").trim(),
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
        className="fixed bottom-4 right-4 z-[900] flex items-center gap-2 rounded-full bg-terracotta py-1.5 pl-1.5 pr-4 text-ink shadow-soft-sm ring-1 ring-ink/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft sm:bottom-6 sm:right-6"
      >
        {open ? (
          <X className="mx-2 h-5 w-5" />
        ) : (
          <>
            <img
              src={elyAvatar}
              alt="Ely, the ElySof AI skincare expert"
              className="h-9 w-9 rounded-full object-cover object-top ring-2 ring-parchment/80"
            />
            <span className="text-sm font-semibold tracking-tight">Ask Ely</span>
            <MessageCircle className="h-4 w-4 opacity-70" />
          </>
        )}
      </button>

      {open && (
        <div
          className="animate-ely-pop fixed inset-x-0 bottom-0 z-[901] flex h-[85dvh] flex-col overflow-hidden rounded-t-3xl bg-parchment shadow-soft ring-1 ring-ink/10 sm:inset-x-auto sm:bottom-24 sm:right-6 sm:h-[560px] sm:w-[390px] sm:rounded-3xl"
          role="dialog"
          aria-label="Chat with Ely"
        >
          {/* Header */}
          <header className="flex items-center gap-3 bg-forest px-4 py-3.5">
            <div className="relative">
              <img
                src={elyAvatar}
                alt="Ely, the ElySof AI skincare expert"
                className="h-11 w-11 rounded-full object-cover object-top ring-2 ring-parchment/70"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 ring-2 ring-forest" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base font-semibold leading-tight text-parchment">
                Ely — ElySof Expert
              </p>
              <p className="text-[11px] text-parchment/70">Online · usually replies instantly</p>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="rounded-full p-1.5 text-parchment/80 transition-colors hover:bg-parchment/10 hover:text-parchment"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          {/* Transcript */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
            {msgs.map((m, i) => {
              const { text, recos } = m.role === "assistant" ? parse(m.content) : { text: m.content, recos: [] };
              return (
                <div
                  key={i}
                  className={cn("animate-ely-bubble flex gap-2", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  {m.role === "assistant" && (
                    <img
                      src={elyAvatar}
                      alt=""
                      aria-hidden
                      className="mt-0.5 h-7 w-7 flex-none rounded-full object-cover object-top ring-1 ring-ink/10"
                    />
                  )}
                  <div className={cn("max-w-[85%] space-y-3", m.role === "user" && "max-w-[80%]")}>
                    <div
                      className={cn(
                        "px-4 py-2.5 text-sm leading-relaxed shadow-soft-sm",
                        m.role === "user"
                          ? "rounded-3xl rounded-br-md bg-forest text-parchment"
                          : "rounded-3xl rounded-bl-md bg-paper text-ink ring-1 ring-ink/5",
                      )}
                    >
                      {m.role === "assistant" ? (
                        <div className="[&_a]:underline [&_li]:ml-4 [&_li]:list-disc [&_p+p]:mt-2 [&_strong]:font-semibold">
                          <ReactMarkdown>{text}</ReactMarkdown>
                        </div>
                      ) : (
                        text
                      )}
                    </div>

                    {recos.map((p) => (
                      <div
                        key={p.id}
                        className="flex gap-3 rounded-2xl bg-paper p-2.5 shadow-soft-sm ring-1 ring-ink/5"
                      >
                        <img
                          src={p.image}
                          alt={`${p.name} product pack`}
                          className="h-16 w-16 flex-none rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold text-ink">{p.shortName}</p>
                          <p className="text-xs text-muted-foreground">
                            <span className="font-semibold text-ink">₹{p.price}</span>{" "}
                            <span className="line-through">₹{p.mrp}</span>
                          </p>
                          <button
                            type="button"
                            onClick={() => add(p)}
                            className="mt-1.5 rounded-full bg-terracotta px-3 py-1 text-[11px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
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
              <div className="flex items-center gap-2">
                <img
                  src={elyAvatar}
                  alt=""
                  aria-hidden
                  className="h-7 w-7 flex-none rounded-full object-cover object-top ring-1 ring-ink/10"
                />
                <div className="flex items-center gap-1 rounded-3xl rounded-bl-md bg-paper px-4 py-3 shadow-soft-sm ring-1 ring-ink/5">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-forest/60"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {msgs.length === 1 && (
              <div className="flex flex-wrap justify-end gap-2 pt-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full bg-forest/10 px-3.5 py-1.5 text-xs font-medium text-forest transition-colors hover:bg-forest hover:text-parchment"
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
            className="flex items-end gap-2 bg-paper/70 px-3 py-3"
          >
            <div className="flex flex-1 items-end gap-2 rounded-3xl bg-paper px-3 py-1 shadow-soft-sm ring-1 ring-ink/10 focus-within:ring-2 focus-within:ring-forest/40">
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
                className="max-h-28 flex-1 resize-none bg-transparent py-2.5 text-sm text-ink outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="submit"
              aria-label="Send message"
              disabled={busy || !input.trim()}
              className="mb-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-forest text-parchment shadow-soft-sm transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

