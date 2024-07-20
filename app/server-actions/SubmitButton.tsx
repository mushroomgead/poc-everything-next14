import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit">{pending ? "loading" : "submit"}</button>;
}
