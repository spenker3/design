import { useEffect, useRef, useState } from "react";
import { ArrowUp, Copy, Menu as MenuIcon, Paperclip, Plus, RotateCcw, Search, SquarePen, ThumbsUp } from "lucide-react";

type Msg = { role: "user" | "assistant"; text: string };

const history = [
  { group: "Today", items: ["Heap insert complexity", "Rewrite the README intro"] },
  { group: "Previous 7 days", items: ["Rust lifetimes in iterators", "Trip packing list", "SQL window functions"] },
  { group: "October", items: ["Bike commute routes", "Cover letter draft", "Sourdough timing"] },
];

const reply =
  "Inserting into a binary heap is O(log n): the new item goes at the end, then swaps with its parent until the heap property holds again. Each swap climbs one level, and a heap of n items has about log₂ n levels.";

export function Chat() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [current, setCurrent] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const [side, setSide] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => end.current?.scrollIntoView({ block: "end" }), [msgs, thinking]);

  function send() {
    const text = draft.trim();
    if (!text) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setDraft("");
    setCurrent(current ?? text.slice(0, 32));
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMsgs((m) => [...m, { role: "assistant", text: reply }]);
    }, 900);
  }

  const composer = (
    <div className="composer">
      <textarea
        rows={1}
        placeholder="Ask anything"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
          }
        }}
        autoFocus
      />
      <div className="composer-actions">
        <button className="btn ghost icon sm" aria-label="Attach" data-tip="Attach">
          <Paperclip />
        </button>
        <span className="grow" />
        <span className="faint" style={{ fontSize: "var(--text-xs)" }}>
          Shift ↵ for a new line
        </span>
        <button className="btn primary icon sm" aria-label="Send" disabled={!draft.trim()} onClick={send}>
          <ArrowUp />
        </button>
      </div>
    </div>
  );

  return (
    <div className="shell tpl-chat">
      <aside className={side ? "shell-side open" : "shell-side"}>
        <div className="row between">
          <a className="wordmark" href="#/" style={{ paddingLeft: 6 }}>
            ask
          </a>
          <button
            className="btn ghost icon"
            aria-label="New chat"
            data-tip="New chat"
            data-tip-side="bottom"
            onClick={() => {
              setMsgs([]);
              setCurrent(null);
              setSide(false);
            }}
          >
            <SquarePen />
          </button>
        </div>
        <label className="input input-group">
          <Search />
          <input placeholder="Search chats" />
        </label>
        {current && (
          <nav className="nav">
            <div className="nav-label">Now</div>
            <a href="#/t/chat" aria-current="page">
              <span className="truncate">{current}</span>
            </a>
          </nav>
        )}
        {history.map((h) => (
          <nav className="nav" key={h.group}>
            <div className="nav-label">{h.group}</div>
            {h.items.map((t) => (
              <a key={t} href="#/t/chat">
                <span className="truncate">{t}</span>
              </a>
            ))}
          </nav>
        ))}
        <span className="grow" />
        <div className="row" style={{ padding: "8px 6px" }}>
          <span className="avatar">mc</span>
          <span className="grow">mira</span>
          <span className="badge">Pro</span>
        </div>
      </aside>

      <main className="shell-main">
        <header className="topbar" style={{ borderBottom: msgs.length ? undefined : "none" }}>
          <button className="btn ghost icon shell-toggle" aria-label="Menu" onClick={() => setSide(!side)}>
            <MenuIcon />
          </button>
          <span style={{ fontWeight: 600 }}>{current ?? ""}</span>
          <span className="spacer" />
          <select className="input sm" style={{ width: "auto" }} defaultValue="opus">
            <option value="opus">Opus 5.5</option>
            <option value="sonnet">Sonnet 5.5</option>
            <option value="haiku">Haiku 5.5</option>
          </select>
        </header>

        {msgs.length === 0 ? (
          <div className="chat-empty">
            <h1>What are we working on?</h1>
            {composer}
            <div className="row wrap" style={{ justifyContent: "center" }}>
              {["Explain a concept", "Review my code", "Plan a trip", "Draft an email"].map((s) => (
                <button key={s} className="btn sm" onClick={() => setDraft(s + ": ")}>
                  <Plus /> {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="chat-thread">
              {msgs.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="msg user">
                    {m.text}
                  </div>
                ) : (
                  <div key={i} className="msg">
                    <div className="prose">
                      <p>{m.text}</p>
                      <pre>{`fn push(&mut self, x: T) {\n    self.items.push(x);\n    self.sift_up(self.items.len() - 1);\n}`}</pre>
                    </div>
                    <div className="msg-actions">
                      <button className="btn ghost icon sm" aria-label="Copy" data-tip="Copy">
                        <Copy />
                      </button>
                      <button className="btn ghost icon sm" aria-label="Good" data-tip="Good answer">
                        <ThumbsUp />
                      </button>
                      <button className="btn ghost icon sm" aria-label="Retry" data-tip="Retry">
                        <RotateCcw />
                      </button>
                    </div>
                  </div>
                ),
              )}
              {thinking && (
                <div className="row muted">
                  <span className="spinner" /> Thinking…
                </div>
              )}
              <div ref={end} />
            </div>
            <div className="chat-dock">{composer}</div>
          </>
        )}
      </main>
    </div>
  );
}
