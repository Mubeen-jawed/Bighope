"use client";

/**
 * Client wrapper for the embedded Sanity Studio. The Sanity config and its
 * plugins use React context, so they must live inside a Client Component
 * (a Server Component cannot import them).
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export default function Studio() {
  return <NextStudio config={config} />;
}
