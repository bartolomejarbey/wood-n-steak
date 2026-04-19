"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { User, Package, LogOut } from "lucide-react";

type Tab = "login" | "register";

interface UserData {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regEmail, setRegEmail] = useState("");
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      email: loginEmail,
      first_name: "Jan",
      last_name: "Novák",
      phone: "+420 123 456 789",
    });
    setIsLoggedIn(true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      email: regEmail,
      first_name: regFirstName,
      last_name: regLastName,
      phone: regPhone,
    });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setLoginEmail("");
    setLoginPassword("");
    setRegEmail("");
    setRegFirstName("");
    setRegLastName("");
    setRegPhone("");
    setRegPassword("");
  };

  const inputClass = "w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white font-body text-sm placeholder:text-white/20 focus:border-gold/40 focus:outline-none transition-colors";

  if (isLoggedIn && user) {
    return (
      <section className="bg-off-black min-h-screen py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="font-body text-gold/40 text-xs tracking-[0.3em] uppercase">Váš profil</span>
            <h1 className="font-heading text-3xl sm:text-4xl text-cream mt-2">
              Můj účet
            </h1>
          </div>

          {/* Profile Info */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gold/[0.06] border border-gold/15 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gold/70" strokeWidth={1} />
              </div>
              <div>
                <h2 className="font-heading text-lg text-white">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="font-body text-white/40 text-sm">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="font-body text-white/30 text-xs uppercase tracking-wider mb-1">Jméno</p>
                <p className="font-body text-white/70 text-sm">{user.first_name} {user.last_name}</p>
              </div>
              <div>
                <p className="font-body text-white/30 text-xs uppercase tracking-wider mb-1">E-mail</p>
                <p className="font-body text-white/70 text-sm">{user.email}</p>
              </div>
              <div>
                <p className="font-body text-white/30 text-xs uppercase tracking-wider mb-1">Telefon</p>
                <p className="font-body text-white/70 text-sm">{user.phone}</p>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-5 h-5 text-gold/60" strokeWidth={1.5} />
              <h2 className="font-heading text-lg text-white">Historie objednávek</h2>
            </div>
            <p className="font-body text-white/30 text-sm">
              Zatím nemáte žádné objednávky. Objednávky se zde zobrazí po dokončení prvního nákupu.
            </p>
          </div>

          {/* Logout */}
          <div className="text-center">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-8 py-3 border border-white/[0.08] text-white/50 font-body text-sm tracking-wider uppercase rounded-full hover:border-gold/30 hover:text-gold transition-all duration-300"
            >
              <LogOut className="w-4 h-4" strokeWidth={1.5} />
              Odhlásit se
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-off-black min-h-screen py-24 sm:py-32">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="font-body text-gold/40 text-xs tracking-[0.3em] uppercase">Přihlášení</span>
          <h1 className="font-heading text-3xl sm:text-4xl text-cream mt-2">
            Můj účet
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex mb-8 bg-white/[0.02] rounded-lg p-1 border border-white/[0.06]">
          <button
            onClick={() => setTab("login")}
            className={cn(
              "flex-1 py-2.5 font-body text-sm tracking-wider uppercase transition-all rounded-md",
              tab === "login"
                ? "text-gold bg-gold/[0.08]"
                : "text-white/30 hover:text-white/50"
            )}
          >
            Přihlášení
          </button>
          <button
            onClick={() => setTab("register")}
            className={cn(
              "flex-1 py-2.5 font-body text-sm tracking-wider uppercase transition-all rounded-md",
              tab === "register"
                ? "text-gold bg-gold/[0.08]"
                : "text-white/30 hover:text-white/50"
            )}
          >
            Registrace
          </button>
        </div>

        {/* Login Form */}
        {tab === "login" && (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="font-body text-white/40 text-xs uppercase tracking-wider block mb-2">E-mail</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="váš@email.cz"
                className={inputClass}
              />
            </div>
            <div>
              <label className="font-body text-white/40 text-xs uppercase tracking-wider block mb-2">Heslo</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Vaše heslo"
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-gold text-black font-body text-sm font-medium tracking-wider uppercase rounded-full hover:bg-gold-light transition-colors"
            >
              Přihlásit se
            </button>
          </form>
        )}

        {/* Register Form */}
        {tab === "register" && (
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-white/40 text-xs uppercase tracking-wider block mb-2">Jméno</label>
                <input
                  type="text"
                  required
                  value={regFirstName}
                  onChange={(e) => setRegFirstName(e.target.value)}
                  placeholder="Jan"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="font-body text-white/40 text-xs uppercase tracking-wider block mb-2">Příjmení</label>
                <input
                  type="text"
                  required
                  value={regLastName}
                  onChange={(e) => setRegLastName(e.target.value)}
                  placeholder="Novák"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="font-body text-white/40 text-xs uppercase tracking-wider block mb-2">E-mail</label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="váš@email.cz"
                className={inputClass}
              />
            </div>
            <div>
              <label className="font-body text-white/40 text-xs uppercase tracking-wider block mb-2">Telefon</label>
              <input
                type="tel"
                required
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                placeholder="+420 123 456 789"
                className={inputClass}
              />
            </div>
            <div>
              <label className="font-body text-white/40 text-xs uppercase tracking-wider block mb-2">Heslo</label>
              <input
                type="password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Zvolte heslo"
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-gold text-black font-body text-sm font-medium tracking-wider uppercase rounded-full hover:bg-gold-light transition-colors"
            >
              Zaregistrovat se
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
