"use client";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <>
      <div>Error 😵</div>
      <button onClick={reset}>Try again</button>
    </>
  );
}
