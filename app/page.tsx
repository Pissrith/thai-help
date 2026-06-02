"use client";

import { useState } from "react";

const THAI_MAX = 200;
const WALLET_MAX = 133;
const RATIO = WALLET_MAX / THAI_MAX; // 0.665

function format(n: number) {
  return n.toLocaleString("th-TH", { maximumFractionDigits: 2 });
}

export default function Home() {
  const [value, setValue] = useState("");

  let thai = parseFloat(value);
  if (isNaN(thai) || thai < 0) thai = 0;
  if (thai > THAI_MAX) thai = THAI_MAX;

  const wallet = Math.round(thai * RATIO * 100) / 100;
  const total = Math.round((thai + wallet) * 100) / 100;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = parseFloat(e.target.value);
    if (!isNaN(raw) && raw > THAI_MAX) {
      setValue(String(THAI_MAX));
    } else {
      setValue(e.target.value);
    }
  }

  return (
    <div className="flex flex-1 items-start justify-center px-4 py-6">
      <div className="w-full max-w-[520px] rounded-[20px] bg-white px-5 pb-7 pt-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <h1 className="mb-1.5 text-center text-[22px] font-bold text-[#b85c00]">
          คำนวณเงิน
        </h1>
        <div className="mb-[22px] text-center text-sm text-[#777]">
          ไทยช่วยไทย + G-wallet
        </div>

        <div className="mb-[18px]">
          <label className="mb-2 flex items-center justify-between text-base font-semibold text-[#333]">
            <span>ใส่เงินไทยช่วยไทย</span>
            <span className="text-xs font-normal text-[#888]">สูงสุด 200 บาท</span>
          </label>
          <input
            type="number"
            inputMode="decimal"
            placeholder="0"
            min={0}
            max={THAI_MAX}
            step={1}
            autoFocus
            value={value}
            onChange={handleChange}
            className="w-full rounded-[14px] border-2 border-[#ffd6a8] bg-[#fffaf3] px-[18px] py-[22px] text-right text-4xl font-bold text-[#222] outline-none [appearance:textfield] focus:border-[#ff8a00] focus:bg-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>

        <div className="mt-2 flex items-center justify-between rounded-[14px] border-2 border-dashed border-[#b8cdf5] bg-[#f3f7ff] px-[18px] py-4">
          <span className="text-[15px] font-semibold text-[#2b4f9c]">
            G-wallet (คำนวณอัตโนมัติ)
          </span>
          <span>
            <span className="text-[28px] font-extrabold text-[#2b4f9c]">
              {format(wallet)}
            </span>
            <span className="ml-1 text-sm font-medium text-[#2b4f9c]">บาท</span>
          </span>
        </div>

        <div className="mt-[18px] rounded-2xl bg-gradient-to-br from-[#ff8a00] to-[#ff5e3a] px-[18px] py-6 text-center text-white">
          <div className="mb-1.5 text-sm opacity-90">รวมทั้งหมด</div>
          <div>
            <span className="text-5xl font-extrabold tracking-[0.5px]">
              {format(total)}
            </span>
            <span className="ml-1 text-lg font-medium">บาท</span>
          </div>
        </div>

        <div className="mt-3.5 rounded-xl bg-[#fff7ec] px-3.5 py-3 text-center text-sm text-[#555]">
          <b className="text-[#b85c00]">{format(thai)}</b> (ไทยช่วยไทย) +{" "}
          <b className="text-[#b85c00]">{format(wallet)}</b> (G-wallet) ={" "}
          <b className="text-[#b85c00]">{format(total)}</b> บาท
        </div>

        <button
          type="button"
          onClick={() => setValue("")}
          className="mx-auto mt-4 block cursor-pointer px-3 py-1.5 text-sm text-[#b85c00] underline"
        >
          ล้างค่า
        </button>
      </div>
    </div>
  );
}
