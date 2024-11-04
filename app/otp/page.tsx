"use client";
import React, { ChangeEvent, useRef } from "react";

export default function OTP() {
  const ref1 = useRef<any>(null);
  const ref2 = useRef<any>(null);
  const ref3 = useRef<any>(null);
  const ref4 = useRef<any>(null);

  const handleOnFocus = (e: any) => {
    e.target.select();
  };

  return (
    <div className="mt-2">
      <div className="flex flex-row">
        <input
          ref={ref1}
          type="text"
          maxLength={1}
          className="bg-red-200 h-10 w-10 ml-2 text-center"
          onKeyUp={(event) => {
            console.log(`event key : ${event.key}`);
            if (event.key === "Backspace") {
              // nothing
            } else {
              if (ref2.current) {
                ref2.current.focus();
              }
            }
          }}
          onFocus={handleOnFocus}
        />
        <input
          ref={ref2}
          type="text"
          maxLength={1}
          className="bg-red-200 h-10 w-10 ml-2 text-center"
          onKeyUp={(event) => {
            if (event.key === "Backspace") {
              if (ref1.current) {
                ref1.current.focus();
              }
            } else {
              if (ref3.current) {
                ref3.current.focus();
              }
            }
          }}
          onFocus={handleOnFocus}
        />
        <input
          ref={ref3}
          type="text"
          maxLength={1}
          className="bg-red-200 h-10 w-10 ml-2 text-center"
          onKeyUp={(event) => {
            if (event.key === "Backspace") {
              if (ref2.current) {
                ref2.current.focus();
              }
            } else {
              if (ref4.current) {
                ref4.current.focus();
              }
            }
          }}
          onFocus={handleOnFocus}
        />
        <input
          ref={ref4}
          type="text"
          maxLength={1}
          className="bg-red-200 h-10 w-10 ml-2 text-center"
          onKeyUp={(event) => {
            if (event.key === "Backspace") {
              if (ref3.current) {
                ref3.current.focus();
              }
            } else {
            }
          }}
          onFocus={handleOnFocus}
        />
      </div>
    </div>
  );
}
