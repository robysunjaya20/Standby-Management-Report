
"use client";

import { useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatsCards from "@/components/StatsCards";
import AreaSetting from "@/components/AreaSetting";
import PartForm from "@/components/PartForm";
import PartList from "@/components/PartList";
import GoogleSheetsCard from "@/components/GoogleSheetsCard";
import SyncModal from "@/components/SyncModal";
import DeleteAllModal from "@/components/DeleteAllModal";
import Toast from "@/components/Toast";

import { usePartCodes } from "@/hooks/usePartCodes";
import { saveBatchToGoogleSheets } from "@/lib/api";

type Section = "setting" | "form" | "data";

const navigation: {
  id: Section;
  label: string;
  icon: string;
  description: string;
}[] = [
  {
    id: "setting",
    label: "Setting Area Kerja",
    icon: "⚙️",
    description: "Pengaturan kerja",
  },
  {
    id: "form",
    label: "Tambah Data",
    icon: "➕",
    description: "Input kode part",
  },
  {
    id: "data",
    label: "Data Part Code",
    icon: "📋",
    description: "Daftar dan sinkronisasi",
  },
];

export default function Home() {
  const {
    data,
    filteredData,
    form,
    editingId,
    search,
    filterArea,
    previewCode,
    setSearch,
    setFilterArea,
    updateForm,
    savePart,
    editPart,
    deletePart,
    deleteAll,
    resetForm,
    workArea,
    rackJis,
    pic,
    shift,
    workDate,
    updateWorkArea,
    updateRackJis,
    updatePic,
    updateShift,
    updateWorkDate,
    saveAreaSetting,
  } = usePartCodes();

  const [activeSection, setActiveSection] =
    useState<Section>("setting");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [showSyncModal, setShowSyncModal] =
    useState(false);

  const [showDeleteAllModal, setShowDeleteAllModal] =
    useState(false);

  const [isSyncing, setIsSyncing] =
    useState(false);

  const [lastSync, setLastSync] =
    useState<string | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    setToast({ message, type });
  };

  const navigateTo = (section: Section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  const handleSaveAreaSetting = () => {
    const result = saveAreaSetting();

    showToast(
      result.message,
      result.success ? "success" : "error"
    );
  };

  const handleSavePart = () => {
    const result = savePart();

    if (!result.success) {
      showToast(result.message, "error");
      return;
    }

    showToast(result.message, "success");
  };

  const handleEditPart = (
    part: (typeof data)[number]
  ) => {
    editPart(part);
    navigateTo("form");
  };

  const handleDeletePart = (id: number) => {
    deletePart(id);
    showToast("Data berhasil dihapus.", "success");
  };

  const handleDeleteAll = () => {
    deleteAll();
    setShowDeleteAllModal(false);

    showToast(
      "Semua data lokal berhasil dihapus.",
      "success"
    );
  };

  const openSyncModal = () => {
    if (data.length === 0) {
      showToast(
        "Belum ada data lokal yang bisa disimpan.",
        "info"
      );
      return;
    }

    if (!workDate) {
      showToast(
        "Tanggal kerja belum dipilih. Silakan simpan Setting Area terlebih dahulu.",
        "error"
      );
      return;
    }

    setShowSyncModal(true);
  };

  const formatDisplayDate = (date: string) => {
    if (!date) return "";

    const parts = date.split("-");

    if (parts.length !== 3) return date;

    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  const handleSync = async () => {
    try {
      setIsSyncing(true);

      const result = await saveBatchToGoogleSheets(
        data,
        workDate
      );

      setLastSync(new Date().toLocaleString("id-ID"));
      setShowSyncModal(false);

      showToast(
        `Berhasil menyimpan ${result.count} data baru ke sheet ${formatDisplayDate(workDate)}.`,
        "success"
      );
    } catch (error) {
      console.error(
        "Gagal menyimpan ke Google Sheets:",
        error
      );

      setShowSyncModal(false);

      showToast(
        error instanceof Error
          ? error.message
          : "Gagal menyimpan data ke Google Sheets.",
        "error"
      );
    } finally {
      setIsSyncing(false);
    }
  };

  const currentNavigation = navigation.find(
    (item) => item.id === activeSection
  )!;

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <div className="relative mx-auto flex max-w-[1600px]">
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Tutup sidebar"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-slate-950/40 md:hidden"
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-40 mt-0 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-200 md:sticky md:top-0 md:h-[calc(100vh-0px)] md:translate-x-0 ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-600">
                Part Code System
              </p>
              <h2 className="mt-1 text-lg font-extrabold text-slate-900">
                Menu Utama
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
              aria-label="Tutup menu"
            >
              ✕
            </button>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto p-3">
            <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Navigasi
            </p>

            {navigation.map((item) => {
              const active = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  aria-current={active ? "page" : undefined}
                  className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${
                    active
                      ? "border-blue-200 bg-blue-50 text-blue-800 shadow-sm"
                      : "border-transparent text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg ${
                      active
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-extrabold">
                      {item.label}
                    </span>
                    <span
                      className={`mt-1 block text-[10px] ${
                        active
                          ? "text-blue-600"
                          : "text-slate-400"
                      }`}
                    >
                      {item.description}
                    </span>
                  </span>

                  {active && (
                    <span className="text-sm font-bold">
                      ›
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="border-t border-slate-200 p-4">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-[10px] font-semibold text-slate-500">
                Total data tersimpan
              </p>
              <p className="mt-1 text-2xl font-extrabold text-slate-900">
                {data.length}
              </p>
              <p className="mt-1 text-[10px] text-slate-400">
                Data lokal pada browser
              </p>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-3 py-3 sm:px-5 sm:py-5 lg:px-7">
          <div className="mb-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Buka menu navigasi"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-lg text-slate-700 hover:bg-slate-50 md:hidden"
            >
              ☰
            </button>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                {currentNavigation.label}
              </p>
              <h1 className="mt-1 truncate text-base font-extrabold text-slate-900 sm:text-lg">
                {currentNavigation.label}
              </h1>
              <p className="mt-0.5 text-[11px] text-slate-500">
                Kelola pencatatan dan monitoring part.
              </p>
            </div>

            <div className="hidden shrink-0 rounded-lg bg-emerald-50 px-3 py-2 sm:block">
              <p className="text-[10px] font-semibold text-emerald-700">
                Total Data
              </p>
              <p className="text-center text-sm font-extrabold text-emerald-800">
                {data.length}
              </p>
            </div>
          </div>

          {activeSection === "setting" && (
            <section className="space-y-4">

              <AreaSetting
                area={workArea}
                rackJis={rackJis}
                pic={pic}
                shift={shift}
                workDate={workDate}
                onChangeArea={updateWorkArea}
                onChangeRackJis={updateRackJis}
                onChangePic={updatePic}
                onChangeShift={updateShift}
                onChangeWorkDate={updateWorkDate}
                onSave={handleSaveAreaSetting}
              />

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-bold text-slate-700">
                  Langkah selanjutnya
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Setelah pengaturan disimpan, buka menu Tambah
                  Kode Part untuk mulai memasukkan data.
                </p>
                <button
                  type="button"
                  onClick={() => navigateTo("form")}
                  className="mt-3 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700"
                >
                  Lanjut Tambah Kode Part →
                </button>
              </div>
            </section>
          )}

          {activeSection === "form" && (
            <section className="space-y-4">
              {editingId !== null && (
                <div className="flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
                  <p className="text-xs font-semibold text-amber-800">
                    Kamu sedang mengedit data part.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      showToast(
                        "Mode edit dibatalkan.",
                        "info"
                      );
                    }}
                    className="shrink-0 rounded-lg border border-amber-300 bg-white px-3 py-2 text-xs font-bold text-amber-800 hover:bg-amber-100"
                  >
                    Batal Edit
                  </button>
                </div>
              )}

              <PartForm
                form={form}
                editing={editingId !== null}
                previewCode={previewCode}
                onChange={updateForm}
                onSubmit={handleSavePart}
                onCancel={resetForm}
              />

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Data sudah ditambahkan?
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Buka daftar untuk melihat data yang tersimpan.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo("data")}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Lihat Data Part →
                </button>
              </div>
            </section>
          )}

          {activeSection === "data" && (
            <section className="space-y-4">
              <StatsCards
                data={data}
                displayed={filteredData.length}
              />

              <GoogleSheetsCard
                dataCount={data.length}
                isSyncing={isSyncing}
                lastSync={lastSync}
                onSync={openSyncModal}
              />

              <PartList
                data={filteredData}
                search={search}
                filterArea={filterArea}
                onSearch={setSearch}
                onFilterArea={setFilterArea}
                onEdit={handleEditPart}
                onDelete={handleDeletePart}
                onDeleteAll={() =>
                  setShowDeleteAllModal(true)
                }
                onClearFilter={() => {
                  setSearch("");
                  setFilterArea("ALL");
                }}
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigateTo("form")}
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700"
                >
                  + Tambah Kode Part
                </button>
              </div>
            </section>
          )}
        </main>
      </div>

      <Footer />

      {showSyncModal && !isSyncing && (
        <SyncModal
          dataCount={data.length}
          onClose={() => setShowSyncModal(false)}
          onConfirm={handleSync}
        />
      )}

      {isSyncing && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 px-3 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl bg-white p-4 text-center shadow-2xl">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-lg">
              ☁️
            </div>

            <div className="mx-auto mt-3 h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-emerald-600" />

            <h2 className="mt-3 text-sm font-extrabold text-slate-900">
              Menyimpan Data
            </h2>

            <p className="mt-1.5 text-xs font-medium leading-relaxed text-slate-500">
              Sedang menyimpan{" "}
              <span className="font-bold text-slate-700">
                {data.length} data
              </span>{" "}
              dari browser ke Google Sheets.
            </p>

            <div className="mt-2 rounded-lg bg-emerald-50 px-3 py-2">
              <p className="text-[10px] font-semibold text-emerald-700">
                Sheet tanggal:
              </p>
              <p className="mt-0.5 text-xs font-extrabold text-emerald-800">
                {formatDisplayDate(workDate)}
              </p>
            </div>

            <div className="mt-2 rounded-lg bg-slate-100 px-3 py-2">
              <p className="text-[10px] font-semibold text-slate-500">
                Mohon jangan tutup halaman ini.
              </p>
            </div>
          </div>
        </div>
      )}

      {showDeleteAllModal && (
        <DeleteAllModal
          dataCount={data.length}
          onClose={() => setShowDeleteAllModal(false)}
          onConfirm={handleDeleteAll}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
