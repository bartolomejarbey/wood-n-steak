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

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [regEmail, setRegEmail] = useState("");
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated login
    setUser({
      email: loginEmail,
      first_name: "Jan",
      last_name: "Novak",
      phone: "+420 123 456 789",
    });
    setIsLoggedIn(true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated registration
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

  if (isLoggedIn && user) {
    return (
      <section className="bg-off-black min-h-screen py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl sm:text-4xl text-gold mb-2 text-center">
            Muj ucet
          </h1>
          <div className="gold-divider" />

          {/* Profile Info */}
          <div className="border border-gold/20 bg-black/40 p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 border border-gold/30 flex items-center justify-center">
                <User className="w-7 h-7 text-gold" strokeWidth={1} />
              </div>
              <div>
                <h2 className="font-heading text-xl text-white">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="font-body text-white/50 text-sm">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="font-body text-gold/60 text-xs uppercase tracking-wider mb-1">
                  Jmeno
                </p>
                <p className="font-body text-white/80 text-sm">
                  {user.first_name} {user.last_name}
                </p>
              </div>
              <div>
                <p className="font-body text-gold/60 text-xs uppercase tracking-wider mb-1">
                  Email
                </p>
                <p className="font-body text-white/80 text-sm">{user.email}</p>
              </div>
              <div>
                <p className="font-body text-gold/60 text-xs uppercase tracking-wider mb-1">
                  Telefon
                </p>
                <p className="font-body text-white/80 text-sm">{user.phone}</p>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="border border-gold/20 bg-black/40 p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-5 h-5 text-gold" strokeWidth={1.5} />
              <h2 className="font-heading text-xl text-white">
                Historie objednavek
              </h2>
            </div>
            <p className="font-body text-white/40 text-sm">
              Zatim nemame zadne objednavky. Objednavky se zde zobrazi po
              dokonceni prvniho nakupu.
            </p>
          </div>

          {/* Logout */}
          <div className="text-center">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-gold/30 text-gold font-body text-sm tracking-wider uppercase hover:bg-gold hover:text-black transition-all duration-300"
            >
              <LogOut className="w-4 h-4" strokeWidth={1.5} />
              Odhlasit se
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-off-black min-h-screen py-24 sm:py-32">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <h1 className="font-heading text-3xl sm:text-4xl text-gold mb-2 text-center">
          Muj ucet
        </h1>
        <div className="gold-divider" />

        {/* Tabs */}
        <div className="flex border-b border-gold/20 mb-8">
          <button
            onClick={() => setTab("login")}
            className={cn(
              "flex-1 py-3 font-body text-sm tracking-wider uppercase transition-colors",
              tab === "login"
                ? "text-gold border-b-2 border-gold"
                : "text-white/40 hover:text-white/60"
            )}
          >
            Prihlaseni
          </button>
          <button
            onClick={() => setTab("register")}
            className={cn(
              "flex-1 py-3 font-body text-sm tracking-wider uppercase transition-colors",
              tab === "register"
                ? "text-gold border-b-2 border-gold"
                : "text-white/40 hover:text-white/60"
            )}
          >
            Registrace
          </button>
        </div>

        {/* Login Form */}
        {tab === "login" && (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="font-body text-white/60 text-xs uppercase tracking-wider block mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="vas@email.cz"
                className="w-full px-4 py-3 bg-black/60 border border-gold/20 text-white font-body text-sm placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="font-body text-white/60 text-xs uppercase tracking-wider block mb-2">
                Heslo
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Vase heslo"
                className="w-full px-4 py-3 bg-black/60 border border-gold/20 text-white font-body text-sm placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-gold text-black font-body text-sm font-semibold tracking-wider uppercase hover:bg-gold-light transition-colors"
            >
              Prihlasit se
            </button>
          </form>
        )}

        {/* Register Form */}
        {tab === "register" && (
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-white/60 text-xs uppercase tracking-wider block mb-2">
                  Jmeno
                </label>
                <input
                  type="text"
                  required
                  value={regFirstName}
                  onChange={(e) => setRegFirstName(e.target.value)}
                  placeholder="Jan"
                  className="w-full px-4 py-3 bg-black/60 border border-gold/20 text-white font-body text-sm placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="font-body text-white/60 text-xs uppercase tracking-wider block mb-2">
                  Prijmeni
                </label>
                <input
                  type="text"
                  required
                  value={regLastName}
                  onChange={(e) => setRegLastName(e.target.value)}
                  placeholder="Novak"
                  className="w-full px-4 py-3 bg-black/60 border border-gold/20 text-white font-body text-sm placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="font-body text-white/60 text-xs uppercase tracking-wider block mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="vas@email.cz"
                className="w-full px-4 py-3 bg-black/60 border border-gold/20 text-white font-body text-sm placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="font-body text-white/60 text-xs uppercase tracking-wider block mb-2">
                Telefon
              </label>
              <input
                type="tel"
                required
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                placeholder="+420 123 456 789"
                className="w-full px-4 py-3 bg-black/60 border border-gold/20 text-white font-body text-sm placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="font-body text-white/60 text-xs uppercase tracking-wider block mb-2">
                Heslo
              </label>
              <input
                type="password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Zvolte heslo"
                className="w-full px-4 py-3 bg-black/60 border border-gold/20 text-white font-body text-sm placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-gold text-black font-body text-sm font-semibold tracking-wider uppercase hover:bg-gold-light transition-colors"
            >
              Zaregistrovat se
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
