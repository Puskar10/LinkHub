"use client";

import { useSearchParams } from "next/navigation";

export default function GenerateContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <div>
      <h1>Generate Page</h1>
      <p>Search param: {name}</p>
    </div>
  );
}
