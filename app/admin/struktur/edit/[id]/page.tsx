/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const API = axios.create({
  baseURL: "https://hmcf55cz-5000.asse.devtunnels.ms/api",
});

export default function EditStruktur() {
  const { id } = useParams();
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

  const fetchDetail = async () => {
    try {
      const token = getToken();

      const res = await API.get(`/structure/divisions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setForm(res.data.division);
    } catch {
      toast.error("Gagal ambil data");
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = getToken();

      await API.put(`/structure/divisions/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Berhasil update");
      router.push("/admin/struktur");
    } catch {
      toast.error("Gagal update");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Struktur</h1>

      <input
        value={form.name}
        name="name"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        value={form.label}
        name="label"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        value={form.description}
        name="description"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2"
      >
        Update
      </button>
    </div>
  );
}
