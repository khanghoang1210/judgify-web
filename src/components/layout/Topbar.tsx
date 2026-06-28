import { Bell } from "lucide-react";
import { Search } from "lucide-react";

export function Topbar() {
    return (
        <header className="h-16 bg-(--color-background) border-b border-(--color-outline-variant) flex items-center gap-4 px-6">
            {/* Search bar */}
            <div className="flex-1 max-w-lg relative">
                <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-on-surface-variant)"
                />
                <input
                    type="text"
                    placeholder="Search problems, topics..."
                    className="w-full h-9 pl-9 pr-4 bg-(--color-surface-container) border border-(--color-outline-variant) rounded-[var(--radius-md)] text-sm text-(--color-on-surface) placeholder:text-(--color-on-surface-variant) focus:outline-none focus:border-(--color-primary) transition-colors"
                />
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3 ml-auto">
                {/* Notification bell */}
                <button className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-(--color-on-surface-variant) hover:bg-(--color-surface-container) hover:text-(--color-on-surface) transition-colors relative">
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-(--color-primary) rounded-full"></span>
                </button>

                {/* Rank + username + avatar */}
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-[10px] font-semibold tracking-widest text-(--color-on-surface-variant) font-(family-name:--font-jetbrains-mono)">
                            RANK #42
                        </p>
                        <p className="text-sm font-medium text-(--color-on-surface) leading-tight">
                            Alex Dev
                        </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-(--color-primary) to-(--color-secondary) flex items-center justify-center text-sm font-bold text-(--color-on-primary) shrink-0">
                        A
                    </div>
                </div>
            </div>
        </header>
    );
}
