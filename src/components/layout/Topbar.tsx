import { Bell } from "lucide-react";
import { Search } from "lucide-react";

export function Topbar() {
  return (
    <header className="h-16 bg-background border-b border-outline-variant flex items-center gap-4 px-6">
      {/* Search bar */}
      <div className="flex-1 max-w-lg relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
        />
        <input
          type="text"
          placeholder="Search problems, topics..."
          className="w-full h-9 pl-9 pr-4 bg-surface-container border border-outline-variant rounded-md text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Notification bell */}
        <button className="w-9 h-9 flex items-center justify-center rounded-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
        </button>

        {/* Rank + username + avatar */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-label-caps text-on-surface-variant font-jetbrains-mono">
              RANK #42
            </p>
            <p className="text-body-sm font-medium text-on-surface leading-tight">
              Alex Dev
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-body-sm font-bold text-on-primary shrink-0">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
