"use client";

import { Suspense } from "react";
import AdminCommentsPage from "@/components/pages/AdminCommentsPage";

export default function AdminCommentsRoute() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminCommentsPage />
    </Suspense>
  );
}
