import { useState } from "react";
import { ArrowRight, Check, Keyboard, Layers, Moon, Zap } from "lucide-react";
import { Segmented } from "../../components/Choice";

const tiers = [
  { name: "Personal", price: [0, 0], about: "For one person and one machine.", items: ["All components", "Light and dark", "Community support"] },
  { name: "Pro", price: [12, 120], about: "For people shipping several projects.", items: ["Everything in Personal", "Templates", "Native token exports", "Priority support"], featured: true },
  { name: "Team", price: [40, 400], about: "Shared tokens across a team.", items: ["Everything in Pro", "Shared themes", "Roles and SSO"] },
];

export function Landing() {
  const [yearly, setYearly] = useState<"m" | "y">("m");
  return (
    <div className="tpl-landing">
      <header className="topbar landing-nav">
        <span className="wordmark">mono</span>
        <nav className="row landing-links">
          <a href="#/t/landing">Product</a>
          <a href="#/t/landing">Pricing</a>
          <a href="#/t/landing">Docs</a>
          <a href="#/t/landing">Changelog</a>
        </nav>
        <span className="spacer" />
        <a className="btn ghost sm" href="#/t/auth">
          Sign in
        </a>
        <a className="btn primary sm" href="#/t/auth">
          Get started
        </a>
      </header>

      <section className="landing-hero container">
        <span className="badge">New · Templates for every kind of UI</span>
        <h1 className="landing-title">
          Black, white,
          <br />
          and nothing extra.
        </h1>
        <p className="landing-lede">
          A design language for people who want their interfaces to get out of the way. Dense, keyboard-first, and the
          same in every app you build.
        </p>
        <div className="row wrap" style={{ justifyContent: "center" }}>
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
        <span className="faint" style={{ fontSize: "var(--text-sm)" }}>
          Used in
        </span>
        {["atlas", "north", "relay", "orbit", "kiln"].map((l) => (
          <span key={l} className="landing-logo">
            {l}
          </span>
        ))}
      </section>

      <section className="container landing-section">
        <h2 className="landing-h2">Built on one rule</h2>
        <div className="grid" style={{ "--min": "220px", "--gap": "1px" } as React.CSSProperties}>
          {[
            [Layers, "Inverted selection", "Tabs, rows, menus and text selection all invert. No accent color to keep in sync."],
            [Moon, "Both themes", "Every token is set for light and dark on the same line. Nothing breaks when the system flips."],
            [Keyboard, "Keyboard first", "Every action has a key, and the key is shown next to it."],
            [Zap, "Almost no motion", "Things appear when you ask. Nothing bounces, nothing waits for an animation."],
          ].map(([I, t, d]) => {
            const Icon = I as typeof Layers;
            return (
              <div className="landing-feature" key={t as string}>
                <Icon />
                <h3>{t as string}</h3>
                <p className="muted">{d as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container landing-section">
        <div className="stack" style={{ alignItems: "center", textAlign: "center" }}>
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
                {t.featured && <span className="badge" style={{ "--c": "var(--bg)" } as React.CSSProperties}>Popular</span>}
              </div>
              <div>
                <span className="pricing-amount">${yearly === "m" ? t.price[0] : t.price[1]}</span>
                <span className="muted"> / {yearly === "m" ? "month" : "year"}</span>
              </div>
              <p className="muted">{t.about}</p>
              <ul className="stack" style={{ "--gap": "8px", listStyle: "none" } as React.CSSProperties}>
                {t.items.map((i) => (
                  <li key={i} className="row" style={{ "--gap": "8px" } as React.CSSProperties}>
                    <Check size={15} /> {i}
                  </li>
                ))}
              </ul>
              <span className="grow" />
              <button className={t.featured ? "btn block" : "btn primary block"}>{t.price[0] ? "Choose " + t.name : "Start free"}</button>
            </div>
          ))}
        </div>
      </section>

      <section className="container landing-section" style={{ maxWidth: 760 }}>
        <h2 className="landing-h2">Questions</h2>
        <div className="accordion">
          {[
            ["Does it work with Tailwind?", "Yes. The tokens are CSS variables, so Tailwind's theme can point at them."],
            ["Can I use it in native apps?", "The tokens export to GPUI and Qt Quick theme structs."],
            ["Is there a dark mode?", "Both themes are first-class and follow the system unless you pick one."],
          ].map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="landing-cta">
        <h2 className="landing-h2">Make the next one monochrome.</h2>
        <a className="btn lg" href="#/t/auth">
          Get started <ArrowRight />
        </a>
      </section>

      <footer className="container landing-foot">
        <span className="wordmark">mono</span>
        {[
          ["Product", "Components", "Templates", "Changelog"],
          ["Resources", "Docs", "Native", "Figma"],
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
