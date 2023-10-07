"use client";

import React from "react";
import { signOut } from "next-auth/react";

export default function LogoutButton({ children, className }: { children: string, className: string }) {
  return <button className={className} onClick={() => signOut()}>{children}</button>;
}
