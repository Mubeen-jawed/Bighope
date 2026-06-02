"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const QuoteModalDialog = dynamic(() => import("./QuoteModalDialog"), {
  ssr: false,
});

interface QuoteModalProps {
  buttonClassName?: string;
  buttonLabel?: string;
  defaultCategory?: string;
}

export default function QuoteModal({
  buttonClassName,
  buttonLabel = "Get a Free Quote",
  defaultCategory = "",
}: QuoteModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={buttonClassName}
      >
        {buttonLabel}
      </button>

      {open && (
        <QuoteModalDialog
          defaultCategory={defaultCategory}
          hideButton
          initiallyOpen
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
