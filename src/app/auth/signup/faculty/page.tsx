"use client";

import BaseSignUpForm from "@/components/AuthComnponents/SignUpComponents/BaseSignUpForm";
import { roles } from "@/types/role.types";

export default function FacultySignUpForm() {
  return <BaseSignUpForm role={roles.find((r) => r.value === "faculty")!} />;
}
