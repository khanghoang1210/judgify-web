import { NavLink } from "react-router-dom";
import { useAuth } from "../../lib/auth/authContext";
import {
  LayoutDashboard,
  Code2,
  Trophy,
  User,
  Settings,
  Swords,
  ClipboardList,
} from "lucide-react";
import { cn } from "../../lib/cn";

const mainNavItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/problems", label: "Problems", icon: Code2 },
  { to: "/contests", label: "Contests", icon: Swords },
  { to: "/submissions", label: "Submissions", icon: ClipboardList },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const { session } = useAuth();

  return (
    <aside className="w-44 bg-surface-container-low border-r border-outline-variant flex flex-col">
      {/* Logo */}
      <div className="h-14 flex flex-col justify-center px-4 border-outline-variant">
        <h1 className="text-lg font-bold font-geist text-on-surface">
          Judgify
        </h1>
        <p className="text-xs text-on-surface-variant mt-0.5">
          {session ? session.username : "Signed out"}
        </p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 mt-3">
        <ul className="space-y-0.5">
          {mainNavItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2.5 px-4 py-2 text-body-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary-container/20 text-primary border-r-2"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
                  )
                }
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-outline-variant"></div>
    </aside>
  );
}
