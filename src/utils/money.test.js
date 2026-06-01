import { it, expect, describe } from "vitest";
import { formatMoney } from "./money";

describe("formatCurrecy", () => {
  it("formats 2999 cents as $29.99", () => {
    expect(formatMoney(2999)).toBe("$29.99");
  });

  it("display 2 decimals", () => {
    expect(formatMoney(1090)).toBe("$10.90");
  });
  it("display 0", () => {
    expect(formatMoney(0)).toBe("$0.00");
  });
  it('display negative', () => {
    expect(formatMoney(-100)).toBe('-$1.00')
  })
});
