import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

/* Native modal <dialog>. Esc and a click on the scrim close it. */
export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  className = "dialog",
}: {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={className}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {title && (
        <div className="dialog-head">
          <h2>{title}</h2>
          <button className="btn ghost icon sm" aria-label="Close" onClick={onClose}>
            <X />
          </button>
        </div>
      )}
      <div className="dialog-body">{children}</div>
      {footer && <div className="dialog-foot">{footer}</div>}
    </dialog>
  );
}
