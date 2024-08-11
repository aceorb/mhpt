"use client";

import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";

import { title } from "@/components/primitives";
import useCheckAuth from "@/services/hook";

export default function Home() {
  useCheckAuth();
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Mental Health Progress Tracker</h1>
      </div>

      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href="/daily"
        >
          Daily Submit
        </Link>
        <Link
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href="/track"
        >
          ViewLog
        </Link>

      </div>
    </section>
  );
}
