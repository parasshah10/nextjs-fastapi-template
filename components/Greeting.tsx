"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = ["English", "Spanish", "French", "German", "Japanese", "Russian", "Polish", "Italian"];

export default function Greeting() {
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("Emily");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isGenerating, setIsGenerating] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const generateButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const generateGreeting = () => {
    setIsGenerating(true);
    setGreeting("");

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    eventSourceRef.current = new EventSource(
      `http://localhost:8000/api/greet?name=${encodeURIComponent(name)}&language=${encodeURIComponent(selectedLanguage)}`
    );

    eventSourceRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received chunk:", data.message);
      setGreeting((prev) => prev + data.message);
    };

    eventSourceRef.current.onerror = (error) => {
      console.error("EventSource failed:", error);
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      setIsGenerating(false);
    };

    eventSourceRef.current.addEventListener('done', () => {
      console.log("Streaming completed");
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      setIsGenerating(false);
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      generateButtonRef.current?.click();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8 w-full">
      <Input
        type="text"
        placeholder="Enter a name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleKeyPress}
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
        ref={generateButtonRef}
        onClick={generateGreeting}
        disabled={isGenerating}
        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded"
      >
        {isGenerating ? "Generating..." : "Generate Greeting"}
      </Button>

      {greeting && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-xl">
          <p className="text-gray-800 whitespace-pre-wrap">{greeting}</p>
        </div>
      )}
    </div>
  );
}