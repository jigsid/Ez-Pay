import { Button } from "./button";
import { useEffect, useState } from "react";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  const [showingWelcome, setShowingWelcome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowingWelcome(true), 1000); // Show welcome message after 1 second
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 animate-gradient"></div>
      <div className="flex justify-between items-center text-white p-4 relative z-10 shadow-lg rounded-md">
        <div className="text-2xl font-bold flex items-center transition-transform transform hover:scale-110">
          <svg
            className="w-8 h-8 mr-3 transition-transform transform hover:rotate-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8c.837 0 1.657-.24 2.353-.692m1.947-1.268A7.962 7.962 0 0119.5 8.5m0 0A7.963 7.963 0 0115 12M8 16a7.963 7.963 0 00-4.5-3.5M19.5 8.5L12 8m7.5 0l-3.2 5.4a7.963 7.963 0 01-2.353.692m-6.293-6.268A7.962 7.962 0 014.5 8.5m0 0a7.963 7.963 0 015.5 4M8 16c.837 0 1.657-.24 2.353-.692m1.947-1.268A7.962 7.962 0 0012 12m0 0a7.963 7.963 0 014.5 4m-4.5 0a7.963 7.963 0 01-4.5 0m9 0a7.963 7.963 0 01-4.5 0m0 0L12 12"
            ></path>
          </svg>
          Ez Pay
        </div>
        <div className="flex items-center">
          {user && showingWelcome && (
            <div className="mr-4 animate-fade-in">
              <span className="text-lg font-medium">
                Welcome, {user.name || "Guest"}
              </span>
            </div>
          )}
          <Button
            onClick={user ? onSignout : onSignin}
            className="transition duration-300 ease-in-out transform hover:scale-105 bg-white text-purple-600 hover:bg-gray-200 rounded-md px-4 py-2 shadow-md hover:shadow-lg focus:outline-none focus:ring focus:ring-purple-300"
          >
            {user ? "Logout" : "Login"}
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          from {
            background-position: -200% -200%;
          }
          to {
            background-position: -300% -300%;
          }
        }

        .animate-gradient {
          animation: gradient 15s ease infinite;
          background-size: 400% 400%;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
};
