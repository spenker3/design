import { useState } from "react";
import { ArrowRight, Check, Menu as MenuIcon } from "lucide-react";
import { Segmented } from "../../components/Choice";
import { Menu } from "../../components/Menu";

const links = ["Features", "Pricing", "Docs", "Changelog"];

const tiers = [
  { name: "Personal", price: [0, 0], about: "For one person and their own projects.", items: ["Unlimited projects", "Files up to 1 GB", "Community support"] },
  { name: "Pro", price: [12, 120], about: "For people running several projects at once.", items: ["Everything in Personal", "Milestones and timelines", "Files up to 100 GB", "Priority support"], featured: true },
  { name: "Team", price: [40, 400], about: "For teams that share projects.", items: ["Everything in Pro", "Shared workspaces", "Roles and single sign-on"] },
];

const features: [string, string][] = [
  ["Milestones", "Group tasks under a date. The milestone shows what's open and what's late."],
  ["Files with their tasks", "Attach a file to a task, and it moves with the task."],
  ["Keyboard first", "Every action has a key, and the key is shown next to it."],
  ["Works offline", "Changes save on your machine first and sync when you reconnect."],
];

export function Landing() {
  const [yearly, setYearly] = useState<"m" | "y">("m");
  return (
    <div className="tpl-landing">
      <header className="topbar landing-nav">
        <a className="wordmark" href="#/">
          atlas
        </a>
        <nav className="row landing-links">
          {links.map((l) => (
            <a key={l} className="btn ghost sm" href="#/t/landing">
              {l}
            </a>
          ))}
        </nav>
        <span className="spacer" />
        <a className="btn ghost sm" href="#/t/auth">
          Sign in
        </a>
        <a className="btn primary sm" href="#/t/auth">
          Start free
        </a>
        <Menu
          align="end"
          trigger={(p) => (
            <button className="btn ghost icon sm landing-menu" aria-label="Menu" {...p}>
              <MenuIcon />
            </button>
          )}
        >
          {links.map((l) => (
            <a key={l} href="#/t/landing">
              {l}
            </a>
          ))}
        </Menu>
      </header>

      <section className="container landing-hero">
        <h1 className="landing-title">Files, tasks and milestones for small teams</h1>
        <p className="landing-lede">
          Atlas keeps each project's files, tasks and dates together, so every milestone shows what's done and what's left.
        </p>
        <div className="row wrap">
          <a className="btn primary lg" href="#/t/auth">
            Start free <ArrowRight />
          </a>
          <a className="btn lg" href="#/t/docs">
            Read the docs
          </a>
        </div>
        <div className="landing-shot">
          <div className="media" style={{ "--ratio": "16/8" } as React.CSSProperties}>
            <span className="media-label">product screenshot</span>
          </div>
        </div>
      </section>

      <section className="container landing-logos">
        <span className="faint">Used by</span>
        {["north", "relay", "orbit", "kiln", "harbor"].map((l) => (
          <span key={l} className="landing-logo">
            {l}
          </span>
        ))}
      </section>

      <section className="container landing-section">
        <h2 className="landing-h2">Features</h2>
        <div className="grid" style={{ "--min": "220px", "--gap": "1px" } as React.CSSProperties}>
          {features.map(([t, d]) => (
            <div className="landing-feature" key={t}>
              <h3>{t}</h3>
              <p className="muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container landing-section">
        <div className="row between wrap">
          <h2 className="landing-h2">Pricing</h2>
          <Segmented
            label="Billing period"
            value={yearly}
            onChange={setYearly}
            options={[
              { value: "m", label: "Monthly" },
              { value: "y", label: "Yearly · 2 months free" },
            ]}
          />
        </div>
        <div className="grid" style={{ "--min": "240px" } as React.CSSProperties}>
          {tiers.map((t) => (
            <div key={t.name} className={t.featured ? "card inverted pricing" : "card plain pricing"}>
              <div className="row between">
                <h3>{t.name}</h3>
                {t.featured && <span className="badge" style={{ "--c": "var(--bg)" } as React.CSSProperties}>popular</span>}
              </div>
              <div>
                <span className="pricing-amount">${yearly === "m" ? t.price[0] : t.price[1]}</span>
                <span className="muted"> / {yearly === "m" ? "month" : "year"}</span>
              </div>
              <p className="muted">{t.about}</p>
              <ul className="stack" style={{ "--gap": "8px", listStyle: "none" } as React.CSSProperties}>
                {t.items.map((i) => (
                  <li key={i} className="row" style={{ "--gap": "8px" } as React.CSSProperties}>
                    <Check size={16} /> {i}
                  </li>
                ))}
              </ul>
              <span className="grow" />
              <button className="btn block">{t.price[0] ? "Choose " + t.name : "Start free"}</button>
            </div>
          ))}
        </div>
      </section>

      <section className="container landing-section">
        <h2 className="landing-h2">Questions</h2>
        <div className="accordion landing-faq">
          {[
            ["Does it work offline?", "Yes. Changes save on your machine and sync when you reconnect."],
            ["Can I import from another tool?", "Atlas reads CSV and Markdown. Run atlas import in a project folder to bring them in."],
            ["Is there a dark mode?", "Atlas follows your system theme, or you can pick light or dark in settings."],
          ].map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="landing-cta">
        <div className="container stack" style={{ "--gap": "var(--space-6)", alignItems: "flex-start" } as React.CSSProperties}>
          <div className="stack" style={{ "--gap": "var(--space-3)" } as React.CSSProperties}>
            <h2 className="landing-h2">Free for one person</h2>
            <p className="landing-lede">Upgrade when you add a team.</p>
          </div>
          <a className="btn lg" href="#/t/auth">
            Start free <ArrowRight />
          </a>
        </div>
      </section>

      <footer className="container landing-foot">
        <a className="wordmark" href="#/">
          atlas
        </a>
        {[
          ["Product", "Features", "Pricing", "Changelog"],
          ["Resources", "Docs", "Guides", "Status"],
          ["Company", "About", "Contact", "Privacy"],
        ].map(([h, ...ls]) => (
          <nav key={h} className="stack" style={{ "--gap": "8px" } as React.CSSProperties}>
            <h4>{h}</h4>
            {ls.map((l) => (
              <a key={l} href="#/t/landing" className="muted" style={{ textDecoration: "none" }}>
                {l}
              </a>
            ))}
          </nav>
        ))}
      </footer>
    </div>
  );
}
