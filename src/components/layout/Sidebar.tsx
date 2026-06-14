import { NavLink } from "react-router-dom";
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
];

const bottomNavItems = [
    { to: "/profile", label: "Profile", icon: User },
    { to: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
    return (
        <aside className="w-48 bg-[var(--color-surface-container-low)] border-r border-[var(--color-outline-variant)] flex flex-col">
            {/* Logo */}
            <div className="h-16 flex flex-col justify-center px-5  border-[var(--color-outline-variant)]">
                <h1 className="text-xl font-bold font-[family-name:var(--font-geist)] text-[var(--color-on-surface)]">
                    Judgify
                </h1>
                <p className="text-xs text-[var(--color-on-surface-variant)] mt-0.5">
                    Pro Developer
                </p>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 p-3 pt-4">
                <ul className="space-y-0.5">
                    {mainNavItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                end={item.to === "/"}
                                className={({ isActive }) =>
                                    cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-[var(--color-primary-container)] bg-opacity-20 text-[var(--color-primary)]"
                                            : "text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] hover:text-[var(--color-on-surface)]"
                                    )
                                }
                            >
                                <item.icon size={18} />
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Bottom Navigation */}
            <div className="p-3 border-t border-[var(--color-outline-variant)]">
                <ul className="space-y-0.5">
                    {bottomNavItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-[var(--color-primary-container)] bg-opacity-20 text-[var(--color-primary)]"
                                            : "text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] hover:text-[var(--color-on-surface)]"
                                    )
                                }
                            >
                                <item.icon size={18} />
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
