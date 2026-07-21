import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden px-5 sm:px-10 md:px-14 lg:px-20 xl:px-24">
      <div className="max-w-7xl w-full mx-auto">
        <Hero />
      </div>
    </main>
  );
}
