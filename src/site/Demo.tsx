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

/* One example: name, a short rule, and the live preview. rules is what the site shows: only what the
   preview can't. spec is never rendered. It's the full text for the skill, which can't see the preview,
   and replaces rules there. */
export function Demo({
  title,
  rules,
  children,
  bare,
  pad = true,
}: {
  title: string;
  rules?: ReactNode;
  spec?: ReactNode;
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
