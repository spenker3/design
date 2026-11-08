import { useState } from "react";
import { Bell, Box, ChartColumn, Home, Menu as MenuIcon, Search, Settings, Users } from "lucide-react";
import { Segmented } from "../../components/Choice";

const sales = [12, 18, 9, 22, 30, 26, 14, 19, 33, 41, 28, 24, 36, 45, 39, 31, 27, 42, 48, 52, 38, 35, 44, 50, 57, 49, 46, 53, 61, 58];
const orders = [
  ["#4821", "Ada Lovelace", "paid", "$182.00", "2m ago"],
  ["#4820", "Grace Hopper", "paid", "$44.50", "14m ago"],
  ["#4819", "Alan Turing", "pending", "$120.00", "1h ago"],
  ["#4818", "Edsger Dijkstra", "refunded", "$95.00", "3h ago"],
  ["#4817", "Barbara Liskov", "paid", "$61.25", "5h ago"],
];
const tone: Record<string, string> = { paid: "good", pending: "warn", refunded: "bad" };

export function Dashboard() {
  const [range, setRange] = useState<"7d" | "30d" | "90d">("30d");
  const [side, setSide] = useState(false);
  const max = Math.max(...sales);
  return (
    <div className="shell">
      <aside className={side ? "shell-side open" : "shell-side"}>
        <a className="wordmark" href="#/" style={{ padding: "8px 8px 12px" }}>
          ledger
        </a>
        <nav className="nav">
          <a href="#/t/dashboard" aria-current="page">
            <Home /> Overview
          </a>
          <a href="#/t/dashboard">
            <ChartColumn /> Reports
          </a>
          <a href="#/t/dashboard">
            <Box /> Products <span className="count">128</span>
          </a>
          <a href="#/t/dashboard">
            <Users /> Customers
          </a>
          <div className="nav-label">Workspace</div>
          <a href="#/t/dashboard">
            <Settings /> Settings
          </a>
        </nav>
        <span className="grow" />
        <div className="card tight">
          <strong style={{ fontSize: "var(--text-sm)" }}>Storage</strong>
          <div className="progress" style={{ "--value": "72%" } as React.CSSProperties} />
          <span className="muted" style={{ fontSize: "var(--text-xs)" }}>
            7.2 of 10 GB
          </span>
        </div>
      </aside>
      <main className="shell-main">
        <header className="topbar">
          <button className="btn ghost icon shell-toggle" aria-label="Menu" onClick={() => setSide(!side)}>
            <MenuIcon />
          </button>
          <label className="input input-group sm" style={{ maxWidth: 320 }}>
            <Search />
            <input placeholder="Search orders" />
            <kbd>/</kbd>
          </label>
          <span className="spacer" />
          <button className="btn ghost icon" aria-label="Notifications" data-tip="Notifications" data-tip-side="bottom">
            <Bell />
          </button>
          <span className="avatar">mc</span>
        </header>
        <div className="dash">
          <div className="row between wrap">
            <h1>Overview</h1>
            <Segmented
              label="Range"
              value={range}
              onChange={setRange}
              options={[
                { value: "7d", label: "7 days" },
                { value: "30d", label: "30 days" },
                { value: "90d", label: "90 days" },
              ]}
            />
          </div>
          <div className="grid" style={{ "--min": "180px" } as React.CSSProperties}>
            {[
              ["Revenue", "$12,480", "+8.2%", "up"],
              ["Orders", "312", "+24", "up"],
              ["Refund rate", "2.1%", "+0.4%", "down"],
              ["Average order", "$40.00", "±0", ""],
            ].map(([l, v, d, dir]) => (
              <div className="card stat" key={l}>
                <span className="label">{l}</span>
                <span className="value">{v}</span>
                <span className={`delta ${dir}`}>{d} vs last period</span>
              </div>
            ))}
          </div>
          <div className="dash-row">
            <section className="card">
              <div className="card-head">
                <h3>Revenue per day</h3>
                <span className="muted num" style={{ fontSize: "var(--text-sm)" }}>
                  peak ${max * 10}
                </span>
              </div>
              <div className="bars" role="img" aria-label="Daily revenue for the last 30 days, rising from $90 to $610">
                {sales.map((v, i) => (
                  <span key={i} style={{ "--h": `${(v / max) * 100}%` } as React.CSSProperties} data-tip={`Oct ${i + 6} · $${v * 10}`} />
                ))}
              </div>
              <div className="bars-axis">
                <span>Oct 6</span>
                <span>Oct 20</span>
                <span>Nov 4</span>
              </div>
            </section>
            <section className="card">
              <h3>Activity</h3>
              <ul className="list flush" style={{ margin: "0 -16px" }}>
                {[
                  ["good", "Payout sent", "$3,210 to ••4821"],
                  ["info", "New customer", "barbara@mit.edu"],
                  ["warn", "Low stock", "Trail runners, 2 left"],
                  ["bad", "Payment failed", "Order #4816"],
                ].map(([t, a, b]) => (
                  <li key={a}>
                    <span className={`dot ${t}`} />
                    <span className="grow">
                      <div className="title">{a}</div>
                      <div className="sub">{b}</div>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <section className="stack">
            <div className="row between">
              <h3>Recent orders</h3>
              <button className="btn sm">View all</button>
            </div>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th className="n">Total</th>
                    <th className="n">When</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(([id, who, st, tot, when]) => (
                    <tr key={id}>
                      <td className="mono muted">{id}</td>
                      <td>{who}</td>
                      <td>
                        <span className={`badge ${tone[st]}`}>{st}</span>
                      </td>
                      <td className="n">{tot}</td>
                      <td className="n muted">{when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
