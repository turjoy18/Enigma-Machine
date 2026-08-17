export default function Home() {
  return (
    <div className="flex flex-1 flex-col justify-between px-8 py-10 sm:px-16 sm:py-14">
      <header className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.28em] text-brass">
        <span>Wehrmacht I</span>
        <span>sit down</span>
      </header>

      <main className="flex flex-1 flex-col justify-center">
        <p className="mb-8 text-[11px] uppercase tracking-[0.35em] text-muted">
          Made for keys, lamps, and everything between.
        </p>
        <h1 className="font-sans text-[18vw] leading-[0.8] tracking-tight text-foreground sm:text-[8rem]">
          ENIGMA
        </h1>
        <h2 className="mt-2 font-sans text-[12vw] leading-[0.8] tracking-tight text-brass sm:text-[5.5rem]">
          machine
        </h2>
        <p className="mt-10 max-w-md text-sm leading-7 text-muted">
          A letter goes in. Cables swap it. Wheels scramble it. A lamp lights.
          The Java CLI still lives in{" "}
          <code className="text-lamp">src/</code>; this is the instrument.
        </p>
      </main>

      <footer className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.28em] text-brass">
        <span>&amp; make cipher</span>
        <span>A–Z only</span>
      </footer>
    </div>
  );
}
