import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";

export default function NewsPage() {
  const items = [1, 2, 3, 4].map((i) => ({ title: `Headline #${i}`, desc: "Source and summary." }));
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100">
      <Section title="News" description="Latest Base and creator ecosystem updates.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((it) => (
            <Card key={it.title} className="p-4">
              <h3 className="font-medium text-slate-200">{it.title}</h3>
              <p className="text-sm text-slate-400">{it.desc}</p>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}