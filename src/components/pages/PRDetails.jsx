import { useState } from "react";
import Tag from "../ui/Tag";
import { ChevronDown, ChevronRight } from "lucide-react";

/* =========================
   PR DETAILS PAGE
========================= */
export default function PRDetails() {
  const pr = {
    id: 405,
    title: "feat: Update authentication logic for payment-gateway",
    repo: "microservices-repo",
    status: "Open",
    author: "Alex Dev",
    avatar: "https://i.pravatar.cc/40?img=5",
    created: "2 hours ago",
    updated: "15 min ago",
    description:
      "Refactoring the JWT token validation to support the new OAuth2 provider.",
    labels: ["feature", "microservice-auth", "high-priority"],
  };

  const [sidebarWidth, setSidebarWidth] = useState(360);

  return (
    <div className="flex h-full min-h-screen bg-bg">
      {/* Sidebar */}
      <div
        style={{ width: sidebarWidth }}
        className="shrink-0 border-r border-divider bg-surface"
      >
        <div className="h-full overflow-y-auto p-6">
          <PRSidebar pr={pr} />
        </div>
      </div>

      {/* Resizer */}
      <Resizer onResize={setSidebarWidth} />

      {/* Workspace */}
      <div className="flex-1 bg-bg">
        <div className="mx-auto max-w-5xl p-6">
          <PRWorkspace pr={pr} />
        </div>
      </div>
    </div>
  );
}

/* =========================
   RESIZER
========================= */
function Resizer({ onResize }) {
  const startDrag = (e) => {
    e.preventDefault();

    const onMove = (ev) => {
      const newWidth = ev.clientX;
      onResize(Math.max(300, Math.min(520, newWidth)));
    };

    const stop = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", stop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", stop);
  };

  return (
    <div
      onMouseDown={startDrag}
      className="w-[4px] cursor-col-resize bg-transparent hover:bg-divider transition"
    />
  );
}

/* =========================
   SIDEBAR
========================= */
function PRSidebar({ pr }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-primary leading-snug">
          {pr.title}
        </h1>

        <div className="mt-2 flex items-center gap-2">
          <Tag variant="open">{pr.status}</Tag>
          <span className="text-xs text-secondary">
            {pr.repo} • #{pr.id}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Avatar src={pr.avatar} name={pr.author} />
          <div className="text-xs text-secondary">
            {pr.author} opened {pr.created} • updated {pr.updated}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 rounded-md bg-accent px-3 py-2 text-sm font-medium text-black hover:opacity-90">
          Merge
        </button>

        <button className="rounded-md border border-divider px-3 py-2 text-sm text-secondary hover:bg-hover">
          •••
        </button>
      </div>

      <Section title="Description">
        <p className="text-sm text-secondary leading-relaxed">
          {pr.description}
        </p>
      </Section>

      <Section title="Labels">
        <div className="flex flex-wrap gap-2">
          {pr.labels.map((l) => (
            <span
              key={l}
              className="rounded bg-surface-elev px-2 py-0.5 text-xs text-primary"
            >
              {l}
            </span>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* =========================
   WORKSPACE
========================= */
function PRWorkspace({ pr }) {
  const [tab, setTab] = useState("Files");

  return (
    <div className="space-y-6">
      <PRTabs tab={tab} setTab={setTab} />

      {tab === "Checks" && <RiskBanner />}
      {tab === "Files" && <DiffViewer />}
      {tab === "Commits" && <CommitsPanel />}

      <AISuggestion />
    </div>
  );
}

/* =========================
   TABS
========================= */
function PRTabs({ tab, setTab }) {
  const tabs = ["Commits", "Checks", "Files"];

  return (
    <div className="flex items-center gap-6 pb-2 text-sm">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`pb-2 transition ${
            tab === t
              ? "text-primary border-b-2 border-primary"
              : "text-secondary hover:text-primary"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

/* =========================
   FILES (MULTI-FILE DIFF)
========================= */
function DiffViewer() {
  const files = [
    {
      path: "src/services/AuthService.ts",
      additions: 12,
      deletions: 4,
      diff: [
        { type: "del", text: 'const query = "SELECT * FROM users WHERE id = " + input;' },
        { type: "add", text: 'const query = "SELECT * FROM users WHERE id = $1";' },
      ],
    },
    {
      path: "src/controllers/AuthController.ts",
      additions: 6,
      deletions: 2,
      diff: [
        { type: "del", text: "validateToken(token);" },
        { type: "add", text: "validateOAuthToken(token);" },
      ],
    },
  ];

  return (
    <div className="space-y-3">
      {files.map((f) => (
        <FileDiff key={f.path} file={f} />
      ))}
    </div>
  );
}

function FileDiff({ file }) {
  const [open, setOpen] = useState(true);

  return (
    <Card className="overflow-hidden p-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 hover:bg-hover"
      >
        <div className="flex items-center gap-2 text-sm text-primary">
          {open ? (
            <ChevronDown className="h-4 w-4 text-secondary" />
          ) : (
            <ChevronRight className="h-4 w-4 text-secondary" />
          )}
          <span className="truncate">{file.path}</span>
        </div>

        <DiffStats
          additions={file.additions}
          deletions={file.deletions}
        />
      </button>

      {open && <DiffBlock lines={file.diff} />}
    </Card>
  );
}

function DiffStats({ additions, deletions }) {
  return (
    <div className="flex items-center gap-2 text-xs font-medium">
      <span className="text-green-400">+{additions}</span>
      <span className="text-red-400">−{deletions}</span>
    </div>
  );
}

function DiffBlock({ lines }) {
  return (
    <div className="font-mono text-xs">
      {lines.map((l, i) => (
        <DiffLine key={i} {...l} />
      ))}
    </div>
  );
}

function DiffLine({ type, text }) {
  const styles =
    type === "add"
      ? "bg-green-500/10 text-green-300"
      : type === "del"
      ? "bg-red-500/10 text-red-300"
      : "text-secondary";

  const prefix = type === "add" ? "+" : type === "del" ? "−" : " ";

  return (
    <div className={`px-3 py-1 ${styles}`}>
      <span className="select-none mr-2 opacity-60">
        {prefix}
      </span>
      {text}
    </div>
  );
}

/* =========================
   CHECKS
========================= */
function RiskBanner() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <div className="text-xs text-secondary">Risk Score</div>
        <div className="mt-1 text-2xl font-semibold text-primary">
          78 <span className="text-sm text-secondary">/100</span>
        </div>

        <div className="mt-3 h-2 rounded bg-surface-elev">
          <div className="h-2 w-[78%] rounded bg-accent" />
        </div>
      </Card>

      <Card className="border-red-500/30 bg-red-500/10">
        <div className="text-sm font-medium text-red-400">
          Malicious Code Pattern Detected
        </div>

        <p className="mt-1 text-xs text-red-300">
          Potential SQL injection vulnerability detected in AuthService.ts.
        </p>
      </Card>
    </div>
  );
}

/* =========================
   COMMITS
========================= */
function CommitsPanel() {
  return (
    <Card>
      <div className="text-sm text-secondary">
        Commit history will appear here.
      </div>
    </Card>
  );
}

/* =========================
   AI
========================= */
function AISuggestion() {
  return (
    <Card>
      <div className="text-sm font-medium text-primary">
        AI Suggested Fix
      </div>

      <p className="mt-1 text-sm text-secondary">
        Use parameterized queries instead of string concatenation to
        prevent SQL injection.
      </p>
    </Card>
  );
}

/* =========================
   SHARED UI
========================= */
function Section({ title, children }) {
  return (
    <div>
      <div className="mb-2 text-xs font-medium text-secondary uppercase tracking-wide">
        {title}
      </div>
      {children}
    </div>
  );
}

function Avatar({ src, name }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="h-7 w-7 rounded-full object-cover"
      />
    );
  }

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="h-7 w-7 rounded-full bg-surface-elev flex items-center justify-center text-xs text-primary">
      {initials}
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-divider bg-surface p-4 ${className}`}>
      {children}
    </div>
  );
}