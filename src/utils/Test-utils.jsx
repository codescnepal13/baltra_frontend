import { cleanup, render } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

function CustomRender(ui, options = {}) {
  return render(ui, {
    wrapper: ({ children }) => children,
    ...options,
  });
}
export * from "@testing-library/react";
export { default as useEvent } from "@testing-library/user-event";
export { CustomRender as render };
