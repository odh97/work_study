"use client";

import React, { FormEvent, useState } from "react";

export default function SearchPage() {
  const [name, setName] = useState("");
  const onNameChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setName(value);
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(name);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={onNameChange}
          value={name}
          placeholder="name"
        />
        <input type="submit" />
      </form>
    </div>
  );
}
