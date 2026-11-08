import { useState } from "react";
import { Bell, CreditCard, Menu as MenuIcon, Palette, ShieldAlert, User } from "lucide-react";
import { Segmented } from "../../components/Choice";
import { useToast } from "../../components/Toast";

export function Settings() {
  const [theme, setTheme] = useState<"system" | "light" | "dark">("system");
  const [density, setDensity] = useState<"compact" | "comfortable">("compact");
  const [side, setSide] = useState(false);
  const toast = useToast();
  return (
    <div className="shell">
      <aside className={side ? "shell-side open" : "shell-side"}>
        <a className="wordmark" href="#/" style={{ padding: "8px 8px 12px" }}>
          Settings
        </a>
        <nav className="nav">
          <a href="#/t/settings" aria-current="page">
            <User /> Profile
          </a>
          <a href="#/t/settings">
            <Palette /> Appearance
          </a>
          <a href="#/t/settings">
            <Bell /> Notifications
          </a>
          <a href="#/t/settings">
            <CreditCard /> Billing
          </a>
          <a href="#/t/settings">
            <ShieldAlert /> Danger zone
          </a>
        </nav>
      </aside>
      <main className="shell-main">
        <header className="topbar">
          <button className="btn ghost icon shell-toggle" aria-label="Menu" onClick={() => setSide(!side)}>
            <MenuIcon />
          </button>
          <span style={{ fontWeight: 600 }}>Profile</span>
        </header>
        <div className="settings">
          <section className="settings-section">
            <div>
              <h3>Profile</h3>
              <p className="muted">How you appear to others.</p>
            </div>
            <div className="stack">
              <div className="row">
                <span className="avatar lg">mc</span>
                <button className="btn sm">Change photo</button>
                <button className="btn ghost sm">Remove</button>
              </div>
              <div className="grid" style={{ "--min": "200px" } as React.CSSProperties}>
                <div className="field">
                  <label htmlFor="s-n">Name</label>
                  <input id="s-n" className="input" defaultValue="Mira Chen" />
                </div>
                <div className="field">
                  <label htmlFor="s-u">Username</label>
                  <label className="input input-group">
                    <span className="affix">@</span>
                    <input id="s-u" defaultValue="mira" />
                  </label>
                </div>
              </div>
              <div className="field">
                <label htmlFor="s-b">
                  Bio <span className="optional">optional</span>
                </label>
                <textarea id="s-b" className="input" placeholder="A line about you" />
              </div>
            </div>
          </section>
          <section className="settings-section">
            <div>
              <h3>Appearance</h3>
              <p className="muted">Applies on this device.</p>
            </div>
            <div className="stack" style={{ "--gap": "var(--space-5)", alignItems: "flex-start" } as React.CSSProperties}>
              <div className="field">
                <span className="label">Theme</span>
                <Segmented
                  label="Theme"
                  value={theme}
                  onChange={setTheme}
                  options={[
                    { value: "system", label: "System" },
                    { value: "light", label: "Light" },
                    { value: "dark", label: "Dark" },
                  ]}
                />
              </div>
              <div className="field">
                <span className="label">Density</span>
                <Segmented
                  label="Density"
                  value={density}
                  onChange={setDensity}
                  options={[
                    { value: "compact", label: "Compact" },
                    { value: "comfortable", label: "Comfortable" },
                  ]}
                />
              </div>
              <label className="choice">
                <input type="checkbox" role="switch" className="switch" /> Reduce motion
              </label>
            </div>
          </section>
          <section className="settings-section">
            <div>
              <h3>Notifications</h3>
              <p className="muted">Email and desktop.</p>
            </div>
            <div className="stack" style={{ "--gap": "var(--space-5)" } as React.CSSProperties}>
              {[
                ["Mentions", "When someone @mentions you.", true],
                ["Weekly summary", "A digest every Monday.", true],
                ["Product news", "New features, rarely.", false],
              ].map(([t, h, on]) => (
                <label className="choice" key={t as string}>
                  <input type="checkbox" role="switch" className="switch" defaultChecked={on as boolean} />
                  <span>
                    {t as string}
                    <span className="help">{h as string}</span>
                  </span>
                </label>
              ))}
            </div>
          </section>
          <section className="settings-section">
            <div>
              <h3>Billing</h3>
              <p className="muted">Plan and invoices.</p>
            </div>
            <div className="stack">
              <div className="card inverted row between wrap">
                <div>
                  <strong>Pro</strong>
                  <div className="muted" style={{ fontSize: "var(--text-sm)" }}>
                    $12 / month · renews Dec 5
                  </div>
                </div>
                <button className="btn sm">Change plan</button>
              </div>
              <div className="table-wrap">
                <table className="table compact">
                  <tbody>
                    {["Nov 5", "Oct 5", "Sep 5"].map((d) => (
                      <tr key={d}>
                        <td>{d}</td>
                        <td>
                          <span className="badge good">paid</span>
                        </td>
                        <td className="n">$12.00</td>
                        <td style={{ width: 1 }}>
                          <button className="link" style={{ fontSize: "var(--text-sm)" }}>
                            PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          <section className="settings-section">
            <div>
              <h3 style={{ color: "var(--bad)" }}>Danger zone</h3>
              <p className="muted">Can't be undone.</p>
            </div>
            <div className="card plain row between wrap" style={{ borderColor: "color-mix(in srgb, var(--bad) 45%, transparent)" }}>
              <div>
                <strong>Delete account</strong>
                <div className="muted" style={{ fontSize: "var(--text-sm)" }}>
                  Removes your data everywhere.
                </div>
              </div>
              <button className="btn danger sm">Delete account</button>
            </div>
          </section>
        </div>
        <footer className="settings-save">
          <span className="muted grow" style={{ fontSize: "var(--text-sm)" }}>
            Unsaved changes
          </span>
          <button className="btn">Discard</button>
          <button className="btn primary" onClick={() => toast("Settings saved", { tone: "good" })}>
            Save
          </button>
        </footer>
      </main>
    </div>
  );
}
