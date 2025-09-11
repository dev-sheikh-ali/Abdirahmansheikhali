export const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0d1117]">
      {/* SVG Background Pattern */}
      <div className="absolute inset-0">
        <img
          src="/assets/hero.svg"
          alt="Background Pattern"
          className="absolute left-0 top-5 w-[16%] aspect-square opacity-50"
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1f2e]/40 via-[#0d1117]/50 to-[#0d1117]/60"></div>

      {/* Dot pattern overlay */}
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[radial-gradient(#2C313D_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
      </div>
    </div>
  );
};
