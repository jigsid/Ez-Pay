"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState, useRef, useEffect } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { toast } from "react-toastify";

interface Contact {
  id: number;
  name: string | null;
  number: string;
}

export function SendCard() {
  const [number, setNumber] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showContacts, setShowContacts] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const contactsRef = useRef<HTMLDivElement | null>(null); // Ref for contacts div

  const handleTransfer = async () => {
    try {
      const result = await p2pTransfer(number, Number(amount) * 100);
      if (result.statusCode === 200) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("An unexpected error occurred: " + error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleViewContacts = async () => {
    setLoading(true); // Set loading state
    try {
      const response = await fetch("/api/contacts"); // Fetch contacts from the API
      if (!response.ok) throw new Error("Failed to fetch contacts");

      const fetchedContacts: Contact[] = await response.json();
      setContacts(fetchedContacts);
      setShowContacts(true);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to fetch contacts: " + error.message);
      } else {
        toast.error("Failed to fetch contacts");
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleBackToSend = () => {
    setShowContacts(false);
    setContacts([]); // Clear contacts when going back
  };

  // Handle click outside of the contacts div
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contactsRef.current &&
        !contactsRef.current.contains(event.target as Node)
      ) {
        handleBackToSend();
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <Card
        title={showContacts ? "Contact List" : "Send Money"}
        className="w-full max-w-md p-6 shadow-lg"
      >
        <div className="min-w-72 pt-2">
          {!showContacts ? (
            <>
              <TextInput
                placeholder={"Number"}
                label="Number"
                onChange={(value) => setNumber(value)}
                className="mb-4"
              />
              <TextInput
                placeholder={"Amount"}
                label="Amount"
                onChange={(value) => setAmount(value)}
                className="mb-4"
              />
              <div className="pt-4 flex justify-between">
                <Button onClick={handleTransfer} className="flex-1 mr-2">
                  Send
                </Button>
                <Button onClick={handleViewContacts} className="flex-1 ml-2">
                  View Contacts
                </Button>
              </div>
            </>
          ) : (
            <div ref={contactsRef} className="mt-4">
              <div className="flex justify-center mb-4">
                <Button onClick={handleBackToSend}>Back to Send</Button>
              </div>
              <h3 className="text-lg font-semibold mb-2">Your Contacts:</h3>
              {loading ? (
                <p>Loading...</p> // Loading indicator
              ) : (
                <ul>
                  {contacts.map((contact) => (
                    <li
                      key={contact.id}
                      className="py-1 border-b last:border-b-0"
                    >
                      {contact.name || "Unnamed"} - {contact.number}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
