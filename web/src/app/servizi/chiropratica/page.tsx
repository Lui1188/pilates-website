import { client } from "@/sanity/lib/client";

const QUERY = `*[_type=="course" && category=="Chiropratica"]|order(order asc){
  _id,
  title,
  description,
  duration,
  price,
  highlights,
  subServices
}`;

export default async function ChiropraticaPage() {
  const services = await client.fetch(QUERY);

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-semibold">Chiropratica</h1>
      <p className="mt-2 max-w-2xl text-sm opacity-80">
        Trattamenti e percorsi personalizzati.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {services.map((s: any) => (
          <div key={s._id} className="rounded-2xl border p-5">
            <div className="text-xl font-medium">{s.title}</div>
            {s.description && <p className="mt-2 text-sm opacity-80">{s.description}</p>}

            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              {s.duration && <span className="rounded-full border px-3 py-1">{s.duration}</span>}
              {s.price && <span className="rounded-full border px-3 py-1">{s.price}</span>}
            </div>

            {Array.isArray(s.highlights) && s.highlights.length > 0 && (
              <ul className="mt-4 list-disc pl-5 text-sm">
                {s.highlights.map((h: string, i: number) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
