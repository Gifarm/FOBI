"use client";

import React, { useState, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { ArrowRight } from "lucide-react";

// Komponen utama yang menggunakan useSearchParams
function VerifyOTPContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== 6) {
      toast.error("Kode OTP harus 6 digit!");
      return;
    }

    const loading = toast.loading("Memverifikasi kode...");

    try {
      const res = await axios.post(
        "https://hmcf55cz-5000.asse.devtunnels.ms/api/auth/verify-email",
        {
          email,
          token: code,
        },
      );

      toast.dismiss(loading);
      toast.success(res.data.message || "Verifikasi berhasil!");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error: unknown) {
      const err = error as any;

      toast.dismiss(loading);

      const message = err.response?.data?.message || "Kode OTP salah / expired";

      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-6">
      <Toaster position="top-right" />

      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-black text-slate-800 mb-2">
          Verifikasi Email
        </h1>
        <p className="text-slate-500 text-sm mb-6">
          Masukkan kode OTP yang dikirim ke:
          <br />
          <span className="font-semibold text-slate-700">{email}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-14 text-center text-xl font-bold border rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            Verifikasi
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="text-xs text-slate-400 mt-4">
          Tidak menerima kode? Coba cek spam atau tunggu beberapa saat.
        </p>
      </div>
    </div>
  );
}

// Fallback component saat loading
function VerifyOTPLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-6">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto"></div>
          <div className="flex justify-center gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-12 h-14 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
          <div className="h-12 bg-slate-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}

// Export default dengan Suspense boundary
export default function VerifyOTP() {
  return (
    <Suspense fallback={<VerifyOTPLoading />}>
      <VerifyOTPContent />
    </Suspense>
  );
}
