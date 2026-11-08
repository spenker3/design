import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { X } from "lucide-react";

type Tone = "default" | "good" | "warn" | "bad";
type Item = { id: number; message: ReactNode; tone: Tone; action?: { label: string; run: () => void } };
type Show = (message: ReactNode, opts?: { tone?: Tone; action?: Item["action"]; ms?: number }) => void;

const Ctx = createContext<Show>(() => {});
export const useToast = () => useContext(Ctx);

let next = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const dismiss = (id: number) => setItems((all) => all.filter((t) => t.id !== id));

  const show = useCallback<Show>((message, { tone = "default", action, ms = 4000 } = {}) => {
    const id = next++;
    setItems((all) => [...all.slice(-3), { id, message, tone, action }]);
    if (ms > 0) setTimeout(() => dismiss(id), ms);
  }, []);

  return (
    <Ctx.Provider value={show}>
      {children}
      <div className="toasts" role="status" aria-live="polite">
        {items.map((t) => (
          <div key={t.id} className={`toast ${t.tone}`}>
            {t.tone !== "default" && <span className={`dot ${t.tone}`} />}
            <span className="grow">{t.message}</span>
            {t.action && (
              <button
                className="btn sm"
                onClick={() => {
                  t.action!.run();
                  dismiss(t.id);
                }}
              >
                {t.action.label}
              </button>
            )}
            <button className="btn ghost icon sm" aria-label="Dismiss" onClick={() => dismiss(t.id)}>
              <X />
            </button>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}
