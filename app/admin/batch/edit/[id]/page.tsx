/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const API = axios.create({
  baseURL: "https://hmcf55cz-5000.asse.devtunnels.ms/api",
});

export default function EditBatch() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<any>({
    name: "",
    description: "",
    is_active: false,
    start_date: "",
    end_date: "",
    max_participants: "",
  });

  const getToken = () => {
    const raw =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return raw?.replace(/"/g, "").trim();
  };

  const fetchDetail = async () => {
    try {
      const token = getToken();

      const res = await API.get(`/batch?include_inactive=true`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const found = res.data.batches.find((b: any) => b.id == id);
      setForm(found);
    } catch {
      toast.error("Gagal ambil data");
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdate = async () => {
    try {
      const token = getToken();

      await API.put(`/batch/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Berhasil update");
      router.push("/admin/batch");
    } catch {
      toast.error("Gagal update");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Batch</h1>

      <input
        value={form.name}
        name="name"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        value={form.description}
        name="description"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <label className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          name="is_active"
          checked={form.is_active}
          onChange={handleChange}
        />
        Aktifkan Batch
      </label>

      <input
        type="date"
        value={form.start_date}
        name="start_date"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="date"
        value={form.end_date}
        name="end_date"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        value={form.max_participants}
        name="max_participants"
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
