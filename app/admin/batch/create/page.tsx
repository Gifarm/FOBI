"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const API = axios.create({
  baseURL: "https://hmcf55cz-5000.asse.devtunnels.ms/api",
});

export default function CreateBatch() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    max_participants: "",
  });

  const getToken = () => {
    const raw =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return raw?.replace(/"/g, "").trim();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = getToken();

      await API.post("/batch", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Batch dibuat");
      router.push("/admin/batch");
    } catch {
      toast.error("Gagal");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Tambah Batch</h1>

      <input
        name="name"
        placeholder="Nama"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="description"
        placeholder="Deskripsi"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="date"
        name="start_date"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="date"
        name="end_date"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="max_participants"
        placeholder="Max Peserta"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2"
      >
        Simpan
      </button>
    </div>
  );
}
