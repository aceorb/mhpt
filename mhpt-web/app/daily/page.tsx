"use client";

import { title } from "@/components/primitives";
import DailySubmitForm from "@/components/daily-submit/daily-submit-form";
import useCheckAuth from "@/services/hook";

export default function DailyPage() {
  useCheckAuth();
  return (
    <div>
      <h1 className={title()}>Daily Submit Form</h1>
        <DailySubmitForm/>
    </div>
  );
}
