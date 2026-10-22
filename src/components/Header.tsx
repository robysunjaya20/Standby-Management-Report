
import Image from "next/image";

export default function Header() {
  const GOOGLE_SHEET_URL =
    "https://docs.google.com/spreadsheets/d/1qJL_CnJxsPWrpi97pl9KYmXNcYaWl2Dve-xogQkG4Hg/edit?usp=sharing";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="flex min-h-[68px] w-full items-center justify-between gap-3 px-3 sm:px-5 lg:px-7">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-white">
            <Image
              src="/logo.PNG"
              alt="Logo BEI"
              fill
              priority
              sizes="40px"
              className="object-contain"
            />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-sm font-extrabold tracking-tight text-slate-900 sm:text-lg">
              Standby Management Report
            </h1>

            <p className="mt-0.5 truncate text-[11px] font-medium text-slate-500 sm:text-sm">
              SU2ID &amp; KS Mirror
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            <span className="text-[11px] font-bold text-emerald-700">
              Local Storage Aktif
            </span>
          </div>

          <a
            href={GOOGLE_SHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 text-xs font-bold text-emerald-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-100 active:scale-[0.98] sm:px-4 sm:text-sm"
            title="Buka Google Sheets"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
              aria-hidden="true"
            >
              <path
                d="M5 3h9l5 5v13H5V3Z"
                fill="#16A34A"
                opacity=".15"
              />
              <path
                d="M14 3v5h5M8 12h8M8 15h8M8 18h5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 3h9l5 5v13H5V3Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>

            <span>Google Sheets</span>
          </a>
        </div>
      </div>
    </header>
  );
}
