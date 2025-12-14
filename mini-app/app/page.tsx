import { description, title } from "@/lib/metadata";
import { generateMetadata } from "@/lib/farcaster-embed";
import Game2048 from "@/components/2048-game";
import Background from "@/components/background";
import SendCallsButton from "@/components/SendCallsButton";

export { generateMetadata };

export default function Home() {
  // NEVER write anything here, only use this page to import components
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Background />
      <main className="flex flex-col gap-3 place-items-center place-content-center px-4 grow z-10 relative">
        <span className="text-2xl">{title}</span>
        <span className="text-muted-foreground">{description}</span>
        <Game2048 />
                <SendCallsButton />
      </main>
    </div>
  );
}
