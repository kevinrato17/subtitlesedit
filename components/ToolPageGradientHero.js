export default function ToolPageGradientHero({ headline, subheadline }) {
  return (
    <div className="mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-600 px-6 py-14 text-center shadow-lg sm:px-10 sm:py-16">
      <p className="text-3xl font-bold leading-tight text-white md:text-4xl">
        {headline}
      </p>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/95 sm:text-lg">
        {subheadline}
      </p>
    </div>
  );
}
