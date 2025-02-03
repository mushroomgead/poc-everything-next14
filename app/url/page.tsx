import dynamic from "next/dynamic";

const Form = dynamic(() => import("./Form"), {
  ssr: false,
});

export default async function Page() {
  return <Form />;
}
