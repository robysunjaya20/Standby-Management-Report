"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AREA_OPTIONS,
} from "@/data/partConfig";

import type {
  AreaSetting,
  PartData,
  PartFormData,
  RackJisType,
  ShiftType,
} from "@/types/part";

const STORAGE_KEY =
  "part-code-data";

const SETTING_STORAGE_KEY =
  "part-area-setting";


function getTodayDate(): string {
  const now = new Date();

  const year =
    now.getFullYear();

  const month =
    String(
      now.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      now.getDate()
    ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


function formatDisplayDate(
  date: string
): string {
  if (!date) {
    return "";
  }

  const parts =
    date.split("-");

  if (parts.length !== 3) {
    return date;
  }

  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}


export function usePartCodes() {


  const [data, setData] =
    useState<PartData[]>([]);

  const [isLoaded, setIsLoaded] =
    useState(false);


  const [workArea, setWorkArea] =
    useState<AreaSetting>(
      "RAK JIS"
    );

  const [rackJis, setRackJis] =
    useState<RackJisType>(
      "No 1"
    );

  const [pic, setPic] =
    useState("");

  const [shift, setShift] =
    useState<ShiftType>(
      "SHIFT 1"
    );

  /*
   * TANGGAL KERJA
   */
  const [workDate, setWorkDate] =
    useState<string>(
      getTodayDate()
    );


  const [form, setForm] =
    useState<PartFormData>({
      area:
        "SU2ID LH",

      partCode:
        "",

      result:
        "OK",

      stampDate:
        "",

      detailProblem:
        "",

      workArea:
        "RAK JIS",

      rackJis:
        "No 1",

      pic:
        "",

      shift:
        "SHIFT 1",
    });


  const [editingId, setEditingId] =
    useState<number | null>(
      null
    );

  const [search, setSearch] =
    useState("");

  const [filterArea, setFilterArea] =
    useState("ALL");


  useEffect(() => {

    try {


      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (saved) {

        const parsed =
          JSON.parse(saved);

        if (
          Array.isArray(parsed)
        ) {

          const migrated =
            parsed.map(
              (item) => {

                let partCode =
                  item.partCode ||
                  "";

                if (
                  item.color &&
                  /^\d{3}$/.test(
                    partCode
                  )
                ) {

                  partCode =
                    `${partCode}${item.color}`;

                }


                const result =
                  item.result === "NG"
                    ? "NG"
                    : "OK";


                const migratedWorkArea: AreaSetting =
                  item.workArea ===
                  "DOORSUB"
                    ? "DOORSUB"
                    : item.workArea === "J12"
                    ? "J12"
                    : "RAK JIS";


                const migratedRack:
                  RackJisType =
                  item.rackJis ||
                  "No 1";

                const migratedShift:
                  ShiftType =
                  item.shift ===
                  "SHIFT 2"
                    ? "SHIFT 2"
                    : "SHIFT 1";


                const migratedWorkDate =
                  /^\d{4}-\d{2}-\d{2}$/.test(
                    item.workDate ||
                    ""
                  )
                    ? item.workDate
                    : getTodayDate();


                return {

                  ...item,

                  partCode,

                  fullCode:
                    `${item.prefix || ""}${partCode}`,

                  result,

                  stampDate:
                    item.stampDate ||
                    "",

                  detailProblem:
                    item.detailProblem ||
                    "",

                  workArea:
                    migratedWorkArea,

                  rackJis:
                    migratedRack,

                  pic:
                    item.pic ||
                    "",

                  shift:
                    migratedShift,

                  workDate:
                    migratedWorkDate,

                };

              }
            );


          setData(
            migrated
          );

        }

      }


      const savedSetting =
        localStorage.getItem(
          SETTING_STORAGE_KEY
        );


      if (savedSetting) {

        const setting =
          JSON.parse(
            savedSetting
          );


        const loadedArea:
          AreaSetting =
          setting.workArea ===
          "DOORSUB"
            ? "DOORSUB"
            : setting.workArea === "J12"
            ? "J12"
            : "RAK JIS";


        const loadedRack:
          RackJisType =
          setting.rackJis ||
          "No 1";


        const loadedPic =
          setting.pic ||
          "";


        const loadedShift:
          ShiftType =
          setting.shift ===
          "SHIFT 2"
            ? "SHIFT 2"
            : "SHIFT 1";

        const loadedWorkDate = getTodayDate();  

        setWorkArea(
          loadedArea
        );

        setRackJis(
          loadedRack
        );

        setPic(
          loadedPic
        );

        setShift(
          loadedShift
        );

        setWorkDate(
          loadedWorkDate
        );


        setForm(
          (previous) => ({
            ...previous,

            workArea:
              loadedArea,

            rackJis:
              loadedRack,

            pic:
              loadedPic,

            shift:
              loadedShift,
          })
        );

      }

    } catch (error) {

      console.error(
        "Gagal membaca Local Storage:",
        error
      );

    }


    setIsLoaded(
      true
    );

  }, []);


  useEffect(() => {

    if (!isLoaded) {
      return;
    }

    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );

    } catch (error) {

      console.error(
        "Gagal menyimpan Local Storage:",
        error
      );

    }

  }, [
    data,
    isLoaded,
  ]);

  const previewCode =
    useMemo(() => {

      const selectedArea =
        AREA_OPTIONS.find(
          (item) =>
            item.label ===
            form.area
        );


      if (!selectedArea) {
        return "";
      }


      return (
        selectedArea.prefix +
        (
          form.partCode ||
          "---"
        )
      );

    }, [
      form.area,
      form.partCode,
    ]);

  const updateForm = (
    field: keyof PartFormData,
    value: string
  ) => {

    setForm(
      (previous) => ({
        ...previous,

        [field]:
          value,
      })
    );

  };


  const updateWorkArea = (
    value: AreaSetting
  ) => {

    setWorkArea(
      value
    );


    const selectedRack:
      RackJisType =
      rackJis ||
      "No 1";


    setRackJis(
      selectedRack
    );


    setForm(
      (previous) => ({
        ...previous,

        workArea:
          value,

        rackJis:
          selectedRack,
      })
    );

  };

  const updateRackJis = (
    value: RackJisType
  ) => {

    setRackJis(
      value
    );


    setForm(
      (previous) => ({
        ...previous,

        rackJis:
          value,
      })
    );

  };


  const updatePic = (
    value: string
  ) => {

    setPic(
      value
    );


    setForm(
      (previous) => ({
        ...previous,

        pic:
          value,
      })
    );

  };


  const updateShift = (
    value: ShiftType
  ) => {

    setShift(
      value
    );


    setForm(
      (previous) => ({
        ...previous,

        shift:
          value,
      })
    );

  };


  const updateWorkDate = (
    value: string
  ) => {

    setWorkDate(
      value
    );

  };


  const saveAreaSetting = () => {

    if (!workDate) {

      return {
        success:
          false,

        message:
          "Tanggal kerja harus dipilih.",
      };

    }


    const finalRack =
      rackJis;


    if (!finalRack) {

      return {
        success:
          false,

        message:
          "Silakan pilih Rak JIS terlebih dahulu.",
      };

    }


    if (!pic.trim()) {

      return {
        success:
          false,

        message:
          "PIC harus diisi.",
      };

    }


    if (!shift) {

      return {
        success:
          false,

        message:
          "Silakan pilih Shift.",
      };

    }


    const setting = {

      workArea,

      rackJis:
        finalRack,

      pic:
        pic.trim(),

      shift,

      workDate,

    };


    localStorage.setItem(
      SETTING_STORAGE_KEY,
      JSON.stringify(setting)
    );

    setForm(
      (previous) => ({
        ...previous,

        workArea,

        rackJis:
          finalRack,

        pic:
          pic.trim(),

        shift,
      })
    );


    return {

      success:
        true,

      message:
        `Setting Area berhasil disimpan untuk tanggal ${formatDisplayDate(workDate)}.`,

    };

  };


  
  const resetForm = () => {
    setForm((previous) => ({
      ...previous,

      area: previous.area,
      stampDate: previous.stampDate,
      partCode: previous.partCode,

      result: "OK",
      detailProblem: "",

      workArea,
      rackJis,
      pic,
      shift,
    }));

    setEditingId(null);
  };



  const savePart = () => {

    if (
      !/^\d{3}[A-Z0-9]{3}$/.test(
        form.partCode
      )
    ) {

      return {
        success:
          false,

        message:
          "Kode Part harus terdiri dari 3 angka + 3 karakter. Contoh: 020NB9.",
      };

    }


    /*
     * Validasi Result
     */
    if (
      form.result !== "OK" &&
      form.result !== "NG"
    ) {

      return {
        success:
          false,

        message:
          "Result harus dipilih OK atau NG.",
      };

    }


    /*
     * Validasi Stamp Date
     */
    if (
      !/^[A-Z]\d{4}$/.test(
        form.stampDate
      )
    ) {

      return {
        success:
          false,

        message:
          "STAMP DATE / LOT harus terdiri dari 1 huruf dan 4 angka. Contoh: A1234.",
      };

    }


    /*
     * Validasi Area
     */
    if (!form.workArea) {

      return {
        success:
          false,

        message:
          "Area kerja belum dipilih.",
      };

    }


    /*
     * Validasi Rak JIS
     */
    if (!form.rackJis) {

      return {
        success:
          false,

        message:
          "Rakjis belum dipilih.",
      };

    }


    /*
     * Validasi PIC
     */
    if (!form.pic.trim()) {

      return {
        success:
          false,

        message:
          "PIC belum diisi. Silakan simpan Setting Area terlebih dahulu.",
      };

    }


    /*
     * Validasi Shift
     */
    if (!form.shift) {

      return {
        success:
          false,

        message:
          "Shift belum dipilih.",
      };

    }


    /*
     * Validasi tanggal kerja
     */
    if (!workDate) {

      return {
        success:
          false,

        message:
          "Tanggal kerja belum dipilih. Silakan simpan Setting Area terlebih dahulu.",
      };

    }


    /*
     * Cari model
     */
    const selectedArea =
      AREA_OPTIONS.find(
        (item) =>
          item.label ===
          form.area
      );


    if (!selectedArea) {

      return {
        success:
          false,

        message:
          "Model tidak ditemukan.",
      };

    }


    const fullCode =
      selectedArea.prefix +
      form.partCode;

    if (
      editingId !== null
    ) {

      setData(
        (previous) =>
          previous.map(
            (item) =>

              item.id ===
              editingId

                ? {

                    ...item,

                    area:
                      form.area,

                    prefix:
                      selectedArea.prefix,

                    partCode:
                      form.partCode,

                    fullCode,

                    result:
                      form.result,

                    stampDate:
                      form.stampDate,

                    detailProblem:
                      form.detailProblem.trim(),

                    workArea:
                      form.workArea,

                    rackJis:
                      form.rackJis,

                    pic:
                      form.pic.trim(),

                    shift:
                      form.shift,

                    workDate:
                      item.workDate ||
                      workDate,

                  }

                : item
          )
      );


      resetForm();


      return {

        success:
          true,

        mode:
          "update" as const,

        message:
          "Data berhasil diperbarui.",

      };

    }


    const newPart:
      PartData = {

      id:
        Date.now(),

      area:
        form.area,

      prefix:
        selectedArea.prefix,

      partCode:
        form.partCode,

      fullCode,

      result:
        form.result,

      stampDate:
        form.stampDate,

      detailProblem:
        form.detailProblem.trim(),

      workArea:
        form.workArea,

      rackJis:
        form.rackJis,

      pic:
        form.pic.trim(),

      shift:
        form.shift,

      workDate,

      createdAt:
        new Date().toISOString(),

    };


    setData(
      (previous) => [
        ...previous,

        newPart,
      ]
    );


    resetForm();


    return {

      success:
        true,

      mode:
        "create" as const,

      message:
        `Data berhasil ditambahkan untuk tanggal ${formatDisplayDate(workDate)}.`,

    };

  };

  const editPart = (
    part: PartData
  ) => {

    setEditingId(
      part.id
    );


    setWorkArea(
      part.workArea ||
      "RAK JIS"
    );


    setRackJis(
      part.rackJis ||
      "No 1"
    );


    setPic(
      part.pic ||
      ""
    );


    setShift(
      part.shift ===
      "SHIFT 2"
        ? "SHIFT 2"
        : "SHIFT 1"
    );

    setWorkDate(
      /^\d{4}-\d{2}-\d{2}$/.test(
        part.workDate ||
        ""
      )
        ? part.workDate
        : getTodayDate()
    );


    setForm({

      area:
        part.area,

      partCode:
        part.partCode,

      result:
        part.result === "NG"
          ? "NG"
          : "OK",

      stampDate:
        part.stampDate ||
        "",

      detailProblem:
        part.detailProblem ||
        "",

      workArea:
        part.workArea ||
        "RAK JIS",

      rackJis:
        part.rackJis ||
        "No 1",

      pic:
        part.pic ||
        "",

      shift:
        part.shift ===
        "SHIFT 2"
          ? "SHIFT 2"
          : "SHIFT 1",

    });


    window.scrollTo({
      top: 0,

      behavior:
        "smooth",
    });

  };


  const deletePart = (
    id: number
  ) => {

    setData(
      (previous) =>
        previous.filter(
          (item) =>
            item.id !== id
        )
    );


    if (
      editingId === id
    ) {
      resetForm();
    }

  };


  const deleteAll = () => {

    setData([]);

    resetForm();

  };


  const filteredData =
    useMemo(() => {

      const keyword =
        search
          .trim()
          .toLowerCase();


      return data.filter(
        (item) => {

          const matchesSearch =
            keyword === "" ||

            item.fullCode
              .toLowerCase()
              .includes(keyword) ||

            item.area
              .toLowerCase()
              .includes(keyword) ||

            item.partCode
              .toLowerCase()
              .includes(keyword) ||

            item.result
              .toLowerCase()
              .includes(keyword) ||

            item.stampDate
              .toLowerCase()
              .includes(keyword) ||

            item.detailProblem
              .toLowerCase()
              .includes(keyword) ||

            item.workArea
              .toLowerCase()
              .includes(keyword) ||

            item.rackJis
              .toLowerCase()
              .includes(keyword) ||

            item.pic
              .toLowerCase()
              .includes(keyword) ||

            item.shift
              .toLowerCase()
              .includes(keyword) ||

            /*
             * Bisa search tanggal juga
             */
            (
              item.workDate ||
              ""
            )
              .toLowerCase()
              .includes(keyword);


          const matchesArea =
            filterArea ===
              "ALL" ||
            item.area ===
              filterArea;


          return (
            matchesSearch &&
            matchesArea
          );

        }
      );

    }, [
      data,
      search,
      filterArea,
    ]);

  return {

    data,
    filteredData,
    form,
    editingId,


    /* Search */
    search,

    filterArea,

    previewCode,


    /*
     * Setting Area
     */
    workArea,
    rackJis,
    pic,
    shift,
    workDate,


    /* Search setter */
    setSearch,
    setFilterArea,
    updateForm,


    /* Setting */
    updateWorkArea,

    updateRackJis,

    updatePic,

    updateShift,


    updateWorkDate,

    saveAreaSetting,


    savePart,

    editPart,

    deletePart,

    deleteAll,

    resetForm,

  };

}