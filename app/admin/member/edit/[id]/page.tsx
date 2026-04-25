"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import SideBar from "../../../../sidebar/page";

const API = axios.create({
  baseURL: "https://hmcf55cz-5000.asse.devtunnels.ms/api",
});

export default function EditMember() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<any>({});
  const [file, setFile] = useState<File | null>(null);

  const getToken = () => {
    const raw =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return raw?.replace(/"/g, "").trim();
  };

  const fetchDetail = async () => {
    try {
      const res = await API.get(`/board/${id}`);
      setForm(res.data.member);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) fetchDetail();
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const token = getToken();
    if (!token) return alert("Login dulu");

    try {
      const formData = new FormData();

      formData.append("full_name", form.full_name || "");
      formData.append("position", form.position || "");
      formData.append("division", form.division || "");
      formData.append("description", form.description || "");
      formData.append("sort_order", `${Number(form.sort_order || 0)}`);

      // ✅ upload baru
      if (file) {
        formData.append("photo", file);
      }

      if (!form.sort_order || Number(form.sort_order) <= 0) {
        return alert("Sort order wajib diisi");
      }
      // ✅ fallback lama
      else if (form.photo_url) {
        formData.append("photo_url", form.photo_url);
      }

      await API.put(`/board/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // ❌ jangan set Content-Type di sini
        },
      });

      router.push("/admin/member");
    } catch (err: any) {
      console.error("ERROR:", err?.response?.data || err.message);
      alert("Gagal update");
    }
  };

  return (
    <div className="flex">
      {/* <SideBar /> */}

      <div className="p-6 w-full">
        <h1 className="text-xl font-bold mb-4">Edit Pengurus</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="border p-2"
            value={form.full_name || ""}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          />

          <input
            className="border p-2"
            value={form.position || ""}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          />

          <input
            className="border p-2"
            value={form.division || ""}
            onChange={(e) => setForm({ ...form, division: e.target.value })}
          />
          <input
            type="number"
            placeholder="Urutan (1 = Ketua, dst)"
            className="border p-2"
            value={form.sort_order || ""}
            onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
          />

          <textarea
            className="border p-2"
            value={form.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          {/* ✅ preview foto lama */}
          {form.photo_url && (
            <img
              src={`https://hmcf55cz-5000.asse.devtunnels.ms${form.photo_url}`}
              alt="preview"
              className="w-24 h-24 object-cover rounded"
            />
          )}

          {/* ✅ upload foto baru */}
          <input
            type="file"
            className="border p-2"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />

          <button className="bg-yellow-500 text-white py-2 rounded">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
