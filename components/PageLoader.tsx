"use client";
import { useState } from "react";
import Loader from "./Loader";

export default function PageLoader() {
  const [done, setDone] = useState(false);
  if (done) return null;
  return <Loader onComplete={() => setDone(true)} />;
}
