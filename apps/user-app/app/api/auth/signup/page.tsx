"use client";

import { Button } from "@repo/ui/button";
import { Heading } from "@repo/ui/heading";
import { InputBox } from "@repo/ui/inputbox";
import { SubHeading } from "@repo/ui/subheading";
import { useState, useEffect } from "react";
import { createUser } from "../../../lib/actions/createUser";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react"; // Import NextAuth methods
import { BottomWarning } from "@repo/ui/bottomwarning";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [isUserCreated, setIsUserCreated] = useState(false); // New state for user creation flag
  const router = useRouter();
  const { data: session, status } = useSession(); // Check session status

  // Password strength check function
  const validatePassword = (password: string) => {
    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    setIsPasswordValid(strongPasswordRegex.test(password));
  };

  const handleSignup = async () => {
    if (!name || !email || !number || !password) {
      toast.error("Please fill all the fields.");
      return;
    }

    if (!isPasswordValid) {
      toast.error(
        "Password must be at least 8 characters long and contain both letters and numbers."
      );
      return;
    }

    setIsLoading(true); // Set loading to true when the signup starts

    const response = await createUser({ name, email, number, password });

    setIsLoading(false); // Set loading to false once the response is received

    if (response && response.status >= 400) {
      toast.error(response.message);
    } else if (response && response.status === 201) {
      setIsUserCreated(true); // Set the flag for user creation
      toast.success("User created successfully, logging you in...");
    } else if (!response) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  // After user is created, sign them in and redirect
  useEffect(() => {
    if (isUserCreated) {
      // Sign in the user after creation using phone number and password
      signIn("credentials", {
        phone: number, // Using phone number for sign-in
        password, // Using password for sign-in
        redirect: false, // Don't auto-redirect, we'll handle that ourselves
      }).then((response) => {
        if (response?.ok) {
          // Wait for the session to be established and redirect to dashboard
          router.push("/dashboard"); // Redirect to dashboard after successful sign-in
        } else {
          toast.error("Sign-in failed. Please try again.");
        }
      });
    }
  }, [isUserCreated, number, password, router]);

  // If session is ready, redirect to dashboard
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard"); // Redirect if already authenticated
    }
  }, [status, router]);

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-900 via-black to-blue-600">
      {/* Sign Up Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 lg:p-8 min-h-screen rounded-lg shadow-md">
        <div className="w-full sm:w-96">
          <Heading
            label={"Create Account"}
            className="text-3xl font-semibold text-gray-800 mb-4 text-center"
          />
          <SubHeading
            label={"Please enter your details to get started"}
            className="text-gray-500 mb-6 text-center"
          />

          <InputBox
            placeholder="Enter your full name"
            label={"Full Name"}
            onChange={(e) => setName(e.target.value)}
            className="input-field mb-4"
          />

          <InputBox
            placeholder="Enter your email address"
            label={"Email Address"}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field mb-4"
          />

          <InputBox
            placeholder="Enter your phone number"
            label={"Phone Number"}
            onChange={(e) => setNumber(e.target.value)}
            className="input-field mb-4"
          />

          <InputBox
            placeholder="Enter your password"
            label={"Password"}
            inputType="password"
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            className="input-field mb-4"
          />
          <p
            className={`text-sm ${isPasswordValid ? "text-green-600" : "text-red-600"} mb-4`}
          >
            {isPasswordValid
              ? "Password is strong"
              : "Password must be at least 8 characters long and contain both letters and numbers."}
          </p>

          <div className="pt-4">
            <Button
              onClick={handleSignup}
              className="w-full py-3 bg-green-600 text-white rounded-md shadow-lg hover:bg-green-700 transition duration-200 ease-in-out"
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <div className="loader"></div>
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </div>

          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Log In"}
            to={"/api/auth/signin"}
            className="mt-6 text-center text-gray-600"
          />
        </div>
      </div>

      {/* Enhanced Quote Section with Animation */}
      <div className="w-full lg:w-1/2 flex items-center justify-center text-white p-8 space-y-4 relative min-h-screen">
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-3xl font-semibold tracking-wide leading-tight animate-text-fade">
            "Empower your financial future with every transaction."
          </h2>
          <p className="text-lg opacity-80 animate-text-fade-delay">
            "Start your journey towards seamless payments, secure transfers, and
            unlimited possibilities."
          </p>
        </div>

        {/* Floating Background Circles */}
        <div className="absolute w-full h-full top-0 left-0 pointer-events-none">
          <div className="floating-circle bg-blue-500 opacity-30 w-16 h-16 rounded-full absolute top-10 left-20 animate-float" />
          <div className="floating-circle bg-blue-300 opacity-40 w-24 h-24 rounded-full absolute top-32 right-24 animate-float-slow" />
          <div className="floating-circle bg-white opacity-20 w-20 h-20 rounded-full absolute bottom-20 left-10 animate-float" />
          <div className="floating-circle bg-blue-700 opacity-10 w-18 h-18 rounded-full absolute bottom-32 right-16 animate-float-slow" />
        </div>
      </div>
    </div>
  );
}
