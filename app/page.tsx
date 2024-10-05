"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("Emily");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isGenerating, setIsGenerating] = useState(false);

  const languages = ["English", "Spanish", "French", "German", "Japanese", "Russian", "Polish", "Italian"];

  const generateGreeting = async () => {
    if (!name || !selectedLanguage) {
      setGreeting("Please enter a name and select a language.");
      return;
    }

    setIsGenerating(true);
    setGreeting("Generating Greeting...");

    try {
      const response = await fetch("/api/greet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, language: selectedLanguage }),
      });
      const data = await response.json();
      setGreeting(data.greeting);
    } catch (error) {
      console.error("Error generating greeting:", error);
      setGreeting("Failed to generate greeting. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col items-center gap-8 w-full max-w-2xl">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex flex-col items-center gap-4 mt-8 w-full">
          <Input
            type="text"
            placeholder="Enter a name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-xs"
          />

          <Select onValueChange={setSelectedLanguage} defaultValue="English">
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            onClick={generateGreeting}
            disabled={isGenerating}
            className={`w-full max-w-xs bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
              isGenerating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isGenerating ? 'Generating...' : 'Generate Greeting'}
          </Button>
          {greeting && (
            <p className={`text-center text-lg font-semibold mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner ${
              isGenerating ? 'opacity-50' : ''
            }`}>
              {greeting}
            </p>
          )}
        </div>
      </main>
      {/* Footer remains unchanged */}
    </div>
  );
}