import { headers } from "next/headers";
import { auth } from "./auth";



export const gettokenfromserver =  async () => {
     const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });
  const token = jwtToken?.token;
  console.log("Server Token:", token);
  return token;
}