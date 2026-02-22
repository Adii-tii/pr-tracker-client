import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  GitPullRequest,
  FolderGit2,
  Activity,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex h-screen flex-col border-r border-divider bg-surface transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Top */}
      <div className="flex items-center border-b h-14 border-divider px-3 py-3">
        {/* Repo */}
        <div className="flex flex-1 items-center gap-2 overflow-hidden">
          <div className="w-5 shrink-0" />
          <button
            className={`flex items-center gap-2 text-sm font-medium text-primary transition-opacity duration-200 ${
              collapsed ? "opacity-0" : "opacity-100"
            }`}
          >
            <span className="truncate">my-repo</span>
            <ChevronDown className="h-4 w-4 text-secondary" />
          </button>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-md p-1 hover:bg-hover"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5 text-secondary" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-secondary" />
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-2 py-3 text-sm">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" active collapsed={collapsed} path={"/dashboard"} />
        <SidebarItem icon={GitPullRequest} label="Pull Requests" collapsed={collapsed} path={"/pull-requests"}/>
        <SidebarItem icon={FolderGit2} label="Repositories" collapsed={collapsed} path={"/repos"}/>
        <SidebarItem icon={Activity} label="Activity" collapsed={collapsed} />
      </nav>

      {/* Account */}
      <div className="border-t border-divider p-2">
        <div className="flex items-center rounded-lg px-2 py-2 hover:bg-hover">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="h-7 w-7 rounded-full bg-surface-elev shrink-0" />

            <div
              className={`transition-opacity duration-200 ${
                collapsed ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="text-sm leading-tight">
                <div className="text-primary">Rajja</div>
                <div className="text-secondary text-xs">@rajja</div>
              </div>
            </div>
          </div>

          {!collapsed && (
            <button className="ml-auto rounded-md p-1 hover:bg-selected">
              <MoreHorizontal className="h-4 w-4 text-secondary" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({ icon: Icon, label, collapsed, path }) {
  const location = useLocation();
  const active = location.pathname === path;

  return (
    <Link
      to={path}
      title={collapsed ? label : ""}
      className={`flex w-full items-center rounded-lg px-3 py-2 transition-colors ${
        active
          ? "bg-selected text-primary"
          : "text-secondary hover:bg-hover hover:text-primary"
      }`}
    >
      {/* Fixed icon slot */}
      <div className="w-5 shrink-0 flex items-center justify-center">
        <Icon className="h-4 w-4" />
      </div>

      {/* Fading label */}
      <span
        className={`ml-2 whitespace-nowrap transition-opacity duration-200 ${
          collapsed ? "opacity-0" : "opacity-100"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}