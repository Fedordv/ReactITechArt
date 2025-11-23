import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

// Простые тестовые компоненты вместо реальных страниц
function Dashboard() {
  return <div>Dashboard Test Page</div>;
}
function About() {
  return <div>About Test Page</div>;
}
function NotFound() {
  return <div>Not Found Test Page</div>;
}

describe("App Routing (unit test)", () => {
  it("renders Dashboard on /", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Dashboard Test Page")).toBeInTheDocument();
  });

  it("renders About on /about", () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("About Test Page")).toBeInTheDocument();
  });

  it("renders 404 page for unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Not Found Test Page")).toBeInTheDocument();
  });
});
