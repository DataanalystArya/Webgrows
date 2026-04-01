"use client";

import { useEffect } from "react";

/**
 * Suppresses the notorious "Missing property" console.error that comes from
 * @splinetool/runtime when running in Turbopack development mode during HMR.
 */
export default function ErrorSuppressor() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const originalConsoleError = console.error;

    console.error = (...args) => {
      // Filter out specific error messages
      const isMissingProperty = args.some(
        arg => typeof arg === "string" && arg.includes("Missing property")
      ) || (args[0] && args[0].message && args[0].message.includes("Missing property"));

      if (isMissingProperty) {
        // Silently ignore
        return;
      }

      originalConsoleError.apply(console, args);
    };

    const handleWindowError = (e: ErrorEvent) => {
      if (
        (e.message && e.message.includes("Missing property")) ||
        (e.error && e.error.message && e.error.message.includes("Missing property"))
      ) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };

    window.addEventListener("error", handleWindowError, true);

    return () => {
      console.error = originalConsoleError;
      window.removeEventListener("error", handleWindowError, true);
    };
  }, []);

  return null;
}
