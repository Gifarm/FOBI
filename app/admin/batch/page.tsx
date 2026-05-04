"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import SideBar from "../../sidebar/page";

const API = axios.create({
  baseURL: "https://hmcf55cz-5000.asse.devtunnels.ms/api",
});

type Batch = {
  id: number;
  name: string;
  is_active: boolean;
  start_date?: string;
  end_date?: string;
};

export default function BatchPage() {
  const router = useRouter();
  const [data, setData] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getToken = () => {
    const raw =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return raw?.replace(/"/g, "").trim();
  };

  const fetchData = async () => {
    try {
      const token = getToken();

      const res = await API.get("/batch?include_inactive=true", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(res.data.batches);
    } catch {
      toast.error("Gagal ambil batch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Nonaktifkan batch ini?")) return;

    try {
      const token = getToken();

      await API.delete(`/batch/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Batch dinonaktifkan");
      fetchData();
    } catch {
      toast.error("Gagal");
    }
  };

  return (
    <div className="flex">
      <SideBar onToggle={(open: boolean) => setSidebarOpen(open)} />

      <main
        className={`${sidebarOpen ? "ml-[288px]" : "ml-[80px]"} p-6 w-full`}
      >
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">Batch</h1>

          <button
            onClick={() => router.push("/admin/batch/create")}
            className="bg-blue-600 text-white px-4 py-2"
          >
            + Tambah
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Status</th>
                <th>Tanggal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.is_active ? "Aktif" : "Nonaktif"}</td>
                  <td>
                    {item.start_date} - {item.end_date}
                  </td>
                  <td className="space-x-2">
                    <button
                      onClick={() =>
                        router.push(`/admin/batch/edit/${item.id}`)
                      }
                    >
                      Edit
                    </button>

                    <button onClick={() => handleDelete(item.id)}>
                      Nonaktifkan
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
