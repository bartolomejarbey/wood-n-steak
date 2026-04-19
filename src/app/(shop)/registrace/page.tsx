import { redirect } from "next/navigation";

export default function RegistracePage() {
  redirect("/prihlaseni?tab=register");
}
