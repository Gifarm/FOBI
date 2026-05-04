"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const API = axios.create({
  baseURL: "https://hmcf55cz-5000.asse.devtunnels.ms/api",
});

export default function CreateStruktur() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    label: "",
    description: "",
  });

  const getToken = () => {
    const raw =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return raw?.replace(/"/g, "").trim();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = getToken();

      await API.post("/structure/divisions", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Berhasil tambah");
      router.push("/admin/struktur");
    } catch {
      toast.error("Gagal tambah");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Tambah Struktur</h1>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="label"
        placeholder="Label"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="description"
        placeholder="Deskripsi"
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
