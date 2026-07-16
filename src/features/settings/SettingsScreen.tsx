import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion } from "../../components/Accordion";
import { ArrowLeft } from "lucide-react";

type AppearanceMode = "light" | "dark" | "system";

export function SettingsScreen() {
  const navigate = useNavigate();
  const [appearance, setAppearance] = useState<AppearanceMode>("system");

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="text-sm mb-2">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-xl font-bold text-center">Settings</h1>
      </div>

      <div className="flex flex-col px-4">
        <Accordion title={<span className="font-medium">Account</span>}>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/change-password")}
              className="text-left text-sm text-gray-700"
            >
              Change Password
            </button>
            <button
              onClick={() => {
              }}
              className="text-left text-sm text-red-500 font-medium"
            >
              Delete Account
            </button>
          </div>
        </Accordion>

        <Accordion title={<span className="font-medium">Appearance</span>}>
          <div className="flex flex-col gap-2">
            {(["light", "dark", "system"] as AppearanceMode[]).map((mode) => (
              <label key={mode} className="flex items-center gap-2 text-sm text-gray-700 capitalize">
                <input
                  type="radio"
                  name="appearance"
                  checked={appearance === mode}
                  onChange={() => setAppearance(mode)}
                  className="accent-orange-400"
                />
                {mode}
              </label>
            ))}
          </div>
        </Accordion>

        <Accordion title={<span className="font-medium">About</span>}>
          <div className="flex flex-col gap-3 text-sm text-gray-700">
            <p>App Version: 1.0.0</p>
            <button onClick={() => navigate("/terms")} className="text-left">
              Terms and Privacy
            </button>
          </div>
        </Accordion>
      </div>
    </div>
  );
}