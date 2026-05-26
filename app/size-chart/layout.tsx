import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Size Chart",
};

export default function SizeChartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
