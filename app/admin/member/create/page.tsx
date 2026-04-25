"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API = axios.create({
  baseURL: "https://hmcf55cz-5000.asse.devtunnels.ms/api",
});

export default function CreateMember() {
  const router = useRouter();

  const [form, setForm] = useState({
    full_name: "",
    position: "",
    division: "",
    sort_order: "",
    description: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const getToken = () => {
    const raw =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return raw?.replace(/"/g, "").trim();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const token = getToken();
    if (!token) return alert("Login dulu");

    try {
      const formData = new FormData();

      formData.append("full_name", form.full_name);
      formData.append("position", form.position);
      formData.append("division", form.division);
      formData.append("description", form.description);
      formData.append("sort_order", `${Number(form.sort_order)}`);
      // ✅ ini kunci utama
      if (file) {
        formData.append("photo", file); // HARUS sesuai field multer di BE
      }

      if (!form.sort_order || Number(form.sort_order) <= 0) {
        return alert("Sort order wajib diisi dan harus lebih dari 0");
      }
      await API.post("/board", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      router.push("/admin/member");
    } catch (err) {
      console.error(err);
      alert("Gagal tambah");
    }
  };

  return (
    <div className="flex">
      <div className="p-6 w-full">
        <h1 className="text-xl font-bold mb-4">Tambah Pengurus</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            placeholder="Nama"
            className="border p-2"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          />

          <input
            placeholder="Jabatan"
            className="border p-2"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          />

          <input
            placeholder="Divisi"
            className="border p-2"
            value={form.division}
            onChange={(e) => setForm({ ...form, division: e.target.value })}
          />
          <input
            type="number"
            placeholder="Urutan (1 = Ketua, 2 = Wakil, dst)"
            className="border p-2"
            value={form.sort_order}
            onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
          />
          <input
            placeholder="Sekolah / Deskripsi"
            className="border p-2"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          {/* ✅ FIX FILE INPUT */}
          <input
            type="file"
            className="border p-2"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />

          <button className="bg-blue-500 text-white py-2 rounded">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}
