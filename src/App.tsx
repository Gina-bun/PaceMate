import { BrowserRouter, Route, Routes } from "react-router-dom";
import {LoginScreen} from "./features/auth/LoginScreen";
import { SplashScreen } from "./features/auth/SplashScreen";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/select-grade" element={<SelectGradeScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
