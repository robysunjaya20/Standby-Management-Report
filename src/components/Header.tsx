
"use client";

import Image from "next/image";

type Section = "setting" | "form" | "data";

type HeaderProps = {
  activeSection: Section;
  onNavigate: (section: Section) => void;
};

const navigation: {
  id: Section;
  label: string;
  icon: string;
}[] = [
  {
    id: "setting",
    label: "Setting Area Kerja",
    icon: "⚙️",
  },
  {
    id: "form",
    label: "Tambah Kode Part",
    icon: "➕",
  },
  {
    id: "data",
    label: "Data Part Code",
    icon: "📋",
  },
];

export default function Header({
  activeSection,
  onNavigate,
}: HeaderProps) {
  const GOOGLE_SHEET_URL =
    "https://docs.google.com/spreadsheets/d/1qJL_CnJxsPWrpi97pl9KYmXNcYaWl2Dve-xogQkG4Hg/edit?usp=sharing";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="flex min-h-[68px] items-center justify-between gap-3 px-3 sm:px-5 lg:px-7">
        <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg sm:h-10 sm:w-10">
            <Image
              src="/logo.png"
              alt="Logo BEI"
              fill
              priority
              sizes="40px"
              className="object-contain"
            />
          </div>

          <div className="min-w-0">
            <h1 className="max-w-[180px] truncate text-xs font-extrabold tracking-tight text-slate-900 sm:max-w-none sm:text-lg">
              Standby Management Report
            </h1>

            <p className="mt-0.5 truncate text-[10px] font-medium text-slate-500 sm:text-sm">
              SU2ID &amp; KS Mirror
            </p>
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-center gap-1 px-3 lg:flex">
          {navigation.map((item) => {
            const active = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-lg px-3 text-xs font-bold transition xl:px-4 xl:text-sm ${
                  active
                    ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 xl:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-700">
              Local Storage Aktif
            </span>
          </div>

          <a
            href={GOOGLE_SHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100 sm:min-h-10 sm:gap-2 sm:px-3 sm:text-sm"
            title="Buka Google Sheets"
          >
            <span>📊</span>
            <span className="hidden sm:inline">
              Google Sheets
            </span>
          </a>
        </div>
      </div>

      <nav
        aria-label="Navigasi utama"
        className="flex items-center gap-1 overflow-x-auto border-t border-slate-100 px-3 py-2 lg:hidden"
      >
        {navigation.map((item) => {
          const active = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[11px] font-bold transition sm:text-xs ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}
