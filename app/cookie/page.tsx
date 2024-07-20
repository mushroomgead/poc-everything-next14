"use server";
import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

async function getData() {
  const res: AxiosResponse<Todo> = await axios(
    "https://jsonplaceholder.typicode.com/todos/1"
  );
  cookies().set({
    name: "data",
    value: JSON.stringify(res.data),
    httpOnly: true,
  });
  return res.data;
}

export default async function Page() {
  const data = await getData();
  return <div>hello cookie: {JSON.stringify(data)}</div>;
}
