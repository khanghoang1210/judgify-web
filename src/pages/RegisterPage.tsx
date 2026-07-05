import { useState } from "react";
import { Eye, EyeOff, Mail, User, Lock, TerminalIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    agreedToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle registration
    console.log("Register:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-8 bottom-8 select-none overflow-hidden">
        <div className="flex flex-col text-right font-jetbrains-mono text-[7rem] md:text-[10rem] lg:text-[12rem] font-bold uppercase leading-[0.9] tracking-[0.25em] text-outline-variant/15">
          <span>CODE</span>
          <span>BUILD</span>
          <span>SHIP</span>
        </div>
      </div>

      {/* Centered row: branding + form */}
      <div className="flex items-center gap-20 w-full max-w-5xl relative z-10">
        {/* Branding */}
        <div className="hidden lg:flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-6">
            <TerminalIcon size={48} className="text-primary bg-primary-container rounded-lg p-1" />
            <h1 className="text-display-lg font-bold font-geist text-on-surface">
              Judgify
            </h1>
          </div>
          <p className="text-headline-sm text-on-surface-variant leading-relaxed max-w-xs">
            Join the elite ranks of professional developers. Your journey to
            mastery starts here.
          </p>
        </div>

        {/* Form card */}
        <div className="w-full max-w-110 shrink-0">
          {/* Mobile branding */}
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center">
                <span className="text-primary font-jetbrains-mono font-bold text-sm">
                  {">_"}
                </span>
              </div>
              <h1 className="text-headline-md font-bold font-geist text-on-surface">
                Judgify
              </h1>
            </div>
          </div>

          <div className="bg-surface-container rounded-2xl border border-outline-variant/60 p-10">
            <h2 className="text-headline-md font-semibold font-geist text-on-surface mb-6">
              Create your account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-body-sm font-medium text-on-surface mb-2">
                  Username
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                  />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="w-full h-11 pl-10 pr-4 bg-surface-container-high border border-outline-variant rounded-md text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
                    placeholder="Choose a username"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-body-sm font-medium text-on-surface mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full h-11 pl-10 pr-4 bg-surface-container-high border border-outline-variant rounded-md text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-body-sm font-medium text-on-surface mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full h-11 pl-10 pr-10 bg-surface-container-high border border-outline-variant rounded-md text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-code-sm text-on-surface-variant mt-1.5">
                  At least 8 characters, one number, and one symbol.
                </p>
              </div>

              {/* Terms checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreedToTerms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      agreedToTerms: e.target.checked,
                    })
                  }
                  className="mt-1 w-4 h-4 rounded border-outline-variant bg-surface-container-high accent-primary cursor-pointer"
                  required
                />
                <label
                  htmlFor="terms"
                  className="text-body-sm text-on-surface-variant cursor-pointer"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-primary hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-primary hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full h-11 bg-primary-container text-on-primary-container font-semibold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                Create Account
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="translate-x-0 group-hover:translate-x-1 transition-transform"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant" />
                </div>
                <div className="relative flex justify-center text-body-sm">
                  <span className="px-3 bg-surface-container text-on-surface-variant">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="h-11 bg-surface-container-high border border-outline-variant rounded-lg hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2 text-body-sm font-medium text-on-surface"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" />
                  </svg>
                  GitHub
                </button>
                <button
                  type="button"
                  className="h-11 bg-surface-container-high border border-outline-variant rounded-lg hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2 text-body-sm font-medium text-on-surface"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <path
                      d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"
                      fill="#4285F4"
                    />
                    <path
                      d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"
                      fill="#34A853"
                    />
                    <path
                      d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </button>
              </div>
            </form>

            {/* Sign in link */}
            <p className="text-body-sm text-on-surface-variant text-center mt-6">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-primary font-semibold hover:underline"
              >
                Sign in instead
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
