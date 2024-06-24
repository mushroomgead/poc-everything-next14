// @ts-nocheck
"use client";

import jspreadsheet from "jspreadsheet-ce";
import "jspreadsheet-ce/dist/jspreadsheet.css";
import "jspreadsheet-ce/dist/jspreadsheet.datatables.css";

import { useEffect, useRef } from "react";
var data = [
  ["Jazz", "Honda", "2019-02-12", "", true, "$ 2.000,00", "#777700"],
  ["Civic", "Honda", "2018-07-11", "", true, "$ 4.000,01", "#007777"],
];

export default function Home() {
  const jsRef = useRef();
  useEffect(() => {
    if (!jsRef.current.jspreadsheet) {
      jspreadsheet(jsRef.current, {
        data: data,
        columns: [
          { title: "Model", width: 300 },
          { title: "Price", width: 80 },
          { title: "Model", width: 100 },
        ],
      });
    }
  }, []);
  return (
    <main className="text-black">
      homex
      <div ref={jsRef}></div>
    </main>
  );
}
