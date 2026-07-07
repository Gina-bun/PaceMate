// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { DashboardScreen } from "./features/dashboard/DashboardScreen";
import {LoginScreen} from "./features/auth/LoginScreen";
import { SplashScreen } from "./features/auth/SplashScreen";
import { SignUpScreen } from "./features/auth/SignUpScreen";
import { SelectGradeScreen } from "./features/auth/SelectGradeScreen";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardScreen />} />
        </Route>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/select-grade" element={<SelectGradeScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
