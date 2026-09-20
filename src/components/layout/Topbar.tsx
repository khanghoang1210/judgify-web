import { Bell, LogOut, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/auth/authContext";

export function Topbar() {
  const navigate = useNavigate();
  const { session, signOut } = useAuth();

  return (
    <header className="h-14 bg-background border-b border-outline-variant flex items-center gap-3 px-4">
      {/* Search bar */}
      <div className="flex-1 max-w-lg relative">
        <Search
          size={14}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant"
        />
        <input
          type="text"
          placeholder="Search problems, topics..."
          className="w-full h-8 pl-8 pr-3 bg-surface-container border border-outline-variant rounded-md text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Notification bell */}
        <button className="w-8 h-8 flex items-center justify-center rounded-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors relative">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
        </button>

        {session ? (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-label-caps text-on-surface-variant font-jetbrains-mono">
                {session.role}
              </p>
              <p className="text-body-sm font-medium text-on-surface leading-tight">
                {session.username}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-body-sm font-bold text-on-primary shrink-0">
              {session.username[0]?.toUpperCase()}
            </div>
            <button
              onClick={() => {
                signOut();
                navigate("/login");
              }}
              title="Sign out"
              className="w-8 h-8 flex items-center justify-center rounded-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/login")}
              className="px-3 py-1.5 rounded-md border border-outline-variant text-body-sm text-on-surface hover:border-primary transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-3 py-1.5 rounded-md bg-primary-container text-on-primary-container text-body-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
