"use client";

import { title } from "@/components/primitives";
import LogTrack from "@/components/log-track/log-track";
import useCheckAuth from "@/services/hook";

export default function TrackPage() {
  useCheckAuth();
  return (
    <div>
      <h1 className={title()}>View Track Log</h1>
      <LogTrack/>
    </div>
  );
}
