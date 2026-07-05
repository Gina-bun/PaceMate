// layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav";

export function MainLayout() {
  return (
    <div className="flex h-screen">
      <div className="hidden md:flex">
        <Nav variant="side" />
      </div>

      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

        <div className="md:hidden">
          <Nav variant="bottom" />
        </div>
      </div>
    </div>
  );
}