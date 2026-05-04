"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import SideBar from "../../sidebar/page";

const API = axios.create({
  baseURL: "https://hmcf55cz-5000.asse.devtunnels.ms/api",
});

type Division = {
  id: number;
  name: string;
  label: string;
};

export default function StrukturPage() {
  const router = useRouter();
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getToken = () => {
    const raw =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return raw?.replace(/"/g, "").trim();
  };

  const fetchDivisions = async () => {
    try {
      const token = getToken();

      const res = await API.get("/structure/divisions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDivisions(res.data.divisions);
    } catch {
      toast.error("Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDivisions();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus?")) return;

    try {
      const token = getToken();

      await API.delete(`/structure/divisions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Berhasil hapus");
      fetchDivisions();
    } catch {
      toast.error("Gagal hapus");
    }
  };

  return (
    <div className="flex">
      <SideBar onToggle={(open: boolean) => setSidebarOpen(open)} />

      <main
        className={`${sidebarOpen ? "ml-[288px]" : "ml-[80px]"} p-6 w-full`}
      >
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">Struktur</h1>

          <button
            onClick={() => router.push("/admin/struktur/create")}
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
                <th>Name</th>
                <th>Label</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {divisions.map((item, i) => (
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.label}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() =>
                        router.push(`/admin/struktur/edit/${item.id}`)
                      }
                    >
                      Edit
                    </button>

                    <button onClick={() => handleDelete(item.id)}>Hapus</button>
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
