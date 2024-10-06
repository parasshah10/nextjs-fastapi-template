import Image from "next/image";
import Greeting from "@/components/Greeting";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-8 pt-8 sm:p-20 sm:pt-12">
      <main className="flex flex-col items-center gap-6 w-full max-w-2xl">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={120}
          height={25}
          priority
        />
        <Greeting />
      </main>
    </div>
  );
}