"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  Upload,
  LayoutDashboard,
  LineChart,
  BarChart3,
  FlaskConical,
  LogOut,
} from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const supabase = createClient();
  const links = [
    { name: "Tableau de bord", link: "/dashboard", icon: LayoutDashboard },
    {
      name: "Importez vos relevés",
      link: "dashboard/transactions",
      icon: Upload,
    },
    { name: "Projection de trésorerie", link: "/projection", icon: LineChart },
    { name: "Analytics", link: "/analytics", icon: BarChart3 },
    { name: "Simulateur", link: "/simulateur", icon: FlaskConical },
  ];

  const handleLogout = async () => {
    supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-[#FAFAFA] flex flex-col">
        <div className="p-8 text-center border-b">
          <h1 className="font-black uppercase tracking-wide">esi entreprise</h1>
        </div>

        <ul className="p-4 space-y-1 flex-1">
          {links.map(({ name, link, icon: Icon }) => (
            <li key={name}>
              <Link
                href={link}
                className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Bouton de déconnexion collé en bas */}
        <div className="mt-auto border-t">
          <button className="flex w-full items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition cursor-pointer">
            <LogOut size={18} />
            <span className="text-sm font-medium" onClick={handleLogout}>
              Déconnexion
            </span>
          </button>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
