import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import CalculatorButton from "./CalculatorButton";

describe("CalculatorButton", () => {
  it("renders operator button with pink color #FF2D9B", () => {
    render(<CalculatorButton label="+" variant="operator" onClick={() => {}} />);
    const btn = screen.getByRole("button", { name: "+" });
    expect(btn).toHaveClass("bg-[#FF2D9B]");
    expect(btn).not.toHaveClass("bg-[#FF9500]");
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<CalculatorButton label="=" variant="operator" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button", { name: "=" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders number button with gray color", () => {
    render(<CalculatorButton label="7" variant="number" onClick={() => {}} />);
    const btn = screen.getByRole("button", { name: "7" });
    expect(btn).toHaveClass("bg-gray-700");
  });

  it("renders action button with light gray color", () => {
    render(<CalculatorButton label="AC" variant="action" onClick={() => {}} />);
    const btn = screen.getByRole("button", { name: "AC" });
    expect(btn).toHaveClass("bg-gray-400");
  });

  it("applies wide style when wide prop is true", () => {
    render(<CalculatorButton label="0" variant="number" onClick={() => {}} wide />);
    const btn = screen.getByRole("button", { name: "0" });
    expect(btn).toHaveClass("col-span-2");
  });
});
