type SectionBandProps = {
  children: React.ReactNode;
  variant?: "band1" | "band2";
  className?: string;
};

export default function SectionBand({
  children,
  variant = "band1",
  className = "",
}: SectionBandProps) {
  const bgClass = variant === "band1" ? "band-1" : "band-2";

  return (
    <section className={`${bgClass} ${className}` } >
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-16">
        {children}
      </div>
    </section>
  );
}