import type { ReactNode } from "react";

/* Page header for a showcase page. */
export function Page({ title, lede, children }: { title: string; lede?: ReactNode; children: ReactNode }) {
  return (
    <article className="page">
      <header className="page-head">
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
      </header>
      {children}
    </article>
  );
}

/* One example: name, the rules for using it, and the live preview. */
export function Demo({
  title,
  rules,
  children,
  bare,
  pad = true,
}: {
  title: string;
  rules?: ReactNode;
  children: ReactNode;
  bare?: boolean;
  pad?: boolean;
}) {
  return (
    <section className="demo" id={title.toLowerCase().replace(/\W+/g, "-")}>
      <div className="demo-text">
        <h2>{title}</h2>
        {rules && <div className="demo-rules">{rules}</div>}
      </div>
      {bare ? children : <div className={pad ? "demo-stage" : "demo-stage flush"}>{children}</div>}
    </section>
  );
}
