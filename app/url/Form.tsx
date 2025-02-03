"use client";
export default function Form() {
  return (
    <div>
      <p>userAgent: {window.navigator.userAgent}</p>
      <p>url: {window.location.toString()}</p>
    </div>
  );
}
