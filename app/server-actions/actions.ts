"use server";
import { z } from "zod";
import { cookies } from "next/headers";

// const schema = z.object({
//   username: z.string({
//     required_error: "requireddddd",
//     invalid_type_error: "Invalid Username",
//   }),
// });

export async function login(token: string, prevState: any, formData: FormData) {
  // const validateFields = schema.safeParse({
  //   username: formData.get("username"),
  // });
  const rawData = {
    username: formData.get("username"),
  };
  // console.log("rawData: ", cookies().get("gadedata"));

  cookies().set({
    name: "gadedata",
    value: String(Math.random()),
    httpOnly: true,
  });

  // if (!validateFields.success) {
  //   return {
  //     errors: validateFields.error?.flatten().fieldErrors,
  //   };
  // }

  return {
    message: "success",
  };
}
