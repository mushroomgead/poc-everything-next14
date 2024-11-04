import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Page Component", () => {
  it("renders a heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });

  it("renders About Link", () => {
    render(<Page />);

    const link = screen.getByRole("link", { name: /About/i });

    expect(link).toBeInTheDocument();
  });

  it("renders link has correct href", () => {
    render(<Page />);

    const link = screen.getByRole("link", { name: /About/i });

    expect(link).toHaveAttribute("href", "/about");
  });
});
