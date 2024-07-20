"use client";
import { useEffect, useState } from "react";
import { login } from "./actions";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

export default function Page() {
  const [accessToken, setAccessToken] = useState<string>("");
  const loginWithToken = login.bind(null, accessToken);
  const [state, formAction] = useFormState(loginWithToken, initialState);

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (token) {
      setAccessToken(token);
    }
  }, []);
  const handleSubmit = (e: any) => {
    formAction(e);
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="username" />
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
      <SubmitButton />
    </form>
  );
}
