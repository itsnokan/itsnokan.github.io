"use client";

import Image from "next/image";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import {
  Bath,
  BedDouble,
  Beef,
  CalendarCheck,
  Check,
  ChefHat,
  Clock,
  Copy,
  ExternalLink,
  Gift,
  GlassWater,
  Heart,
  Home,
  MapPin,
  MessageCircle,
  Navigation,
  PartyPopper,
  Shirt,
  ShoppingBag,
  Sparkles,
  Utensils,
  Waves
} from "lucide-react";
import { ComponentType, FormEvent, useMemo, useState } from "react";

type GiftItem = {
  name: string;
  note: string;
  stores: string[];
  category: "Cozinha" | "Mesa" | "Casa" | "Banho" | "Quarto";
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
};

const weddingDate = new Date("2026-08-21T20:00:00+01:00");

const giftItems: GiftItem[] = [
  {
    name: "Panela de arroz eletrica",
    note: "Uma ajuda pratica para o dia a dia, de 1L a 1.8L.",
    stores: ["Worten", "Continente", "Auchan"],
    category: "Cozinha",
    icon: ChefHat
  },
  {
    name: "Pratos",
    note: "Conjunto raso, fundo ou sobremesa em branco, azul ou dourado.",
    stores: ["Homa", "Continente", "IKEA"],
    category: "Mesa",
    icon: Utensils
  },
  {
    name: "Faqueiro",
    note: "Conjunto para 6 ou 12 pessoas, inox simples e elegante.",
    stores: ["Continente", "Homa", "El Corte Ingles"],
    category: "Mesa",
    icon: Utensils
  },
  {
    name: "Copos",
    note: "Copos altos, baixos ou conjunto misto para receber a familia.",
    stores: ["Homa", "Continente", "IKEA"],
    category: "Mesa",
    icon: GlassWater
  },
  {
    name: "Tacas",
    note: "Para agua, vinho ou espumante, em conjunto de 4 ou 6.",
    stores: ["Worten", "Homa", "Continente"],
    category: "Mesa",
    icon: GlassWater
  },
  {
    name: "Panelas",
    note: "Caçarolas, frigideiras ou conjunto antiaderente.",
    stores: ["Worten", "Continente", "Auchan"],
    category: "Cozinha",
    icon: ChefHat
  },
  {
    name: "Sanduicheira",
    note: "Compacta, facil de limpar e perfeita para pequenos-almocos.",
    stores: ["Worten", "Continente", "Radio Popular"],
    category: "Cozinha",
    icon: ChefHat
  },
  {
    name: "Churrasqueira",
    note: "Eletrica ou de varanda, conforme preferir oferecer.",
    stores: ["Worten", "Leroy Merlin", "Continente"],
    category: "Cozinha",
    icon: Beef
  },
  {
    name: "Conjunto de facas",
    note: "Facas de cozinha com suporte ou conjunto essencial.",
    stores: ["Worten", "Homa", "Continente"],
    category: "Cozinha",
    icon: Utensils
  },
  {
    name: "Potes",
    note: "Hermeticos, de vidro ou organizadores para mantimentos.",
    stores: ["Homa", "IKEA", "Loja chinesa"],
    category: "Cozinha",
    icon: Home
  },
  {
    name: "Pano de prato",
    note: "Conjuntos lisos ou bordados para uso diario.",
    stores: ["Homa", "Continente", "Loja chinesa"],
    category: "Cozinha",
    icon: Shirt
  },
  {
    name: "Toalha de banho",
    note: "Toalhas macias em tons claros, azul, branco ou neutro.",
    stores: ["Homa", "Zara Home", "Continente"],
    category: "Banho",
    icon: Bath
  },
  {
    name: "Lencol de cama de casal",
    note: "Jogo completo, preferencialmente algodao ou toque macio.",
    stores: ["Homa", "IKEA", "Continente"],
    category: "Quarto",
    icon: BedDouble
  },
  {
    name: "Colcha",
    note: "Para cama de casal, em tons leves que combinem com tudo.",
    stores: ["Homa", "Zara Home", "IKEA"],
    category: "Quarto",
    icon: BedDouble
  },
  {
    name: "Tapete de casa de banho",
    note: "Antiderrapante, conjunto simples ou tapete unico.",
    stores: ["Homa", "Continente", "Loja chinesa"],
    category: "Banho",
    icon: Waves
  },
  {
    name: "Toalha de mesa retangular",
    note: "Para dias especiais em familia, lisa, rendada ou estampada.",
    stores: ["Homa", "Continente", "Zara Home"],
    category: "Mesa",
    icon: Home
  }
];

const categories = ["Todos", "Cozinha", "Mesa", "Casa", "Banho", "Quarto"] as const;

function useCountdown() {
  const [now] = useState(() => new Date());
  const diff = Math.max(weddingDate.getTime() - now.getTime(), 0);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return [
    { label: "dias", value: days },
    { label: "horas", value: hours },
    { label: "min", value: minutes }
  ];
}

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 }
};

export default function HomePage() {
  const [category, setCategory] = useState<(typeof categories)[number]>("Todos");
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [copied, setCopied] = useState(false);
  const countdown = useCountdown();
  const { scrollYProgress } = useScroll();
  const heroLift = useTransform(scrollYProgress, [0, 0.25], [0, -42]);

  const visibleGifts = useMemo(
    () => giftItems.filter((item) => category === "Todos" || item.category === category),
    [category]
  );

  const rsvpMessage = `Ola, Antonio e Jucivania! Confirmo a minha presenca no casamento no dia 21.08.2026. Nome: ${guestName || "________"}. Pessoas: ${guestCount || "1"}.`;

  async function copyRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await navigator.clipboard.writeText(rsvpMessage);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <main className="overflow-hidden bg-porcelain text-ink">
      <Hero heroLift={heroLift} countdown={countdown} />
      <section id="detalhes" className="paper-grain relative px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -left-8 -top-8 h-32 w-32 border border-gold/40" />
            <Image
              src="/convite-detalhes.png"
              alt="Convite de casamento com flores azuis"
              width={768}
              height={1080}
              className="relative w-full rounded-[4px] border border-petal/20 bg-white shadow-soft"
              priority
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-8"
          >
            <p className="font-sans text-sm font-semibold uppercase text-gold">Cerimonia e celebracao</p>
            <div className="space-y-4">
              <h2 className="font-display text-4xl leading-tight text-royal sm:text-5xl">
                Deus uniu nossos caminhos
              </h2>
              <p className="max-w-2xl font-serif text-2xl leading-relaxed text-ink/80">
                E nos, sob a sua bencao, uniremos nossas vidas para sempre. Sera uma alegria
                imensa viver este momento ao lado de quem faz parte da nossa historia.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: CalendarCheck, label: "Data", value: "21.08.2026" },
                { icon: Clock, label: "Horario", value: "20h00" },
                { icon: MapPin, label: "Local", value: "Rua Jose Antonio Morao 12F" }
              ].map((detail) => (
                <div key={detail.label} className="border-l border-gold/50 bg-white/65 p-5 shadow-sm">
                  <detail.icon className="mb-4 h-6 w-6 text-gold" strokeWidth={1.7} />
                  <p className="font-sans text-xs font-semibold uppercase text-petal">{detail.label}</p>
                  <p className="mt-2 font-serif text-xl font-semibold text-ink">{detail.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#confirmar"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-sans text-sm font-semibold text-white shadow-gold transition hover:-translate-y-0.5 hover:bg-royal"
              >
                <Check className="h-4 w-4" />
                Confirmar presenca
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Rua%20Jose%20Antonio%20Morao%2012F"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-white px-6 py-3 font-sans text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-gold hover:text-royal"
              >
                <Navigation className="h-4 w-4" />
                Como chegar
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <GiftSection category={category} setCategory={setCategory} visibleGifts={visibleGifts} />
      <RsvpSection
        guestName={guestName}
        setGuestName={setGuestName}
        guestCount={guestCount}
        setGuestCount={setGuestCount}
        copyRsvp={copyRsvp}
        rsvpMessage={rsvpMessage}
        copied={copied}
      />
      <Footer />
    </main>
  );
}

function Hero({
  heroLift,
  countdown
}: {
  heroLift: MotionValue<number>;
  countdown: { label: string; value: number }[];
}) {
  return (
    <section className="relative px-5 pb-20 pt-8 sm:px-8 lg:min-h-[92svh] lg:px-12">
      <div className="floral-crown" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-porcelain to-transparent" />
      <nav className="relative z-20 mx-auto flex max-w-6xl items-center justify-between py-4 font-sans text-sm font-semibold text-ink">
        <a href="#" className="font-display text-2xl text-royal">
          A <span className="font-serif text-petal">&</span> J
        </a>
        <div className="hidden items-center gap-7 sm:flex">
          <a href="#detalhes" className="hover:text-gold">Detalhes</a>
          <a href="#presentes" className="hover:text-gold">Presentes</a>
          <a href="#confirmar" className="hover:text-gold">Confirmar</a>
        </div>
      </nav>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 pt-20 sm:pt-28 lg:grid-cols-[0.92fr_0.78fr] lg:items-center lg:pt-24">
        <motion.div style={{ y: heroLift }} className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 border border-gold/40 bg-white/70 px-4 py-2 font-sans text-xs font-semibold uppercase text-gold backdrop-blur"
          >
            <Sparkles className="h-4 w-4" />
            Convite digital
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="space-y-4"
          >
            <h1 className="max-w-3xl font-display text-5xl leading-none text-royal sm:text-7xl lg:text-7xl xl:text-8xl">
              Antonio
              <span className="block font-serif text-4xl text-gold sm:text-5xl">e</span>
              Jucivania
            </h1>
            <p className="max-w-lg font-serif text-2xl leading-relaxed text-ink/80 sm:text-3xl">
              Com carinho, convidam para a cerimonia do seu casamento.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid max-w-lg grid-cols-3 divide-x divide-gold/30 border-y border-gold/40 bg-white/80 py-5 text-center backdrop-blur"
          >
            {countdown.map((item) => (
              <div key={item.label} className="px-3">
                <p className="font-serif text-4xl font-semibold text-royal">{item.value}</p>
                <p className="font-sans text-xs font-semibold uppercase text-petal">{item.label}</p>
              </div>
            ))}
          </motion.div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#presentes"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-sans text-sm font-semibold text-white shadow-gold transition hover:-translate-y-0.5 hover:bg-royal"
            >
              <Gift className="h-4 w-4" />
              Ver lista de presentes
            </a>
            <a
              href="#confirmar"
              className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-white/80 px-6 py-3 font-sans text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-gold hover:text-royal"
            >
              <MessageCircle className="h-4 w-4" />
              Confirmar presenca
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.14 }}
          className="relative mx-auto w-full max-w-[460px]"
        >
          <div className="absolute -right-7 -top-7 h-36 w-36 border border-gold/50" />
          <div className="absolute -bottom-7 -left-7 h-40 w-40 bg-champagne/70" />
          <Image
            src="/foto-casal.jpeg"
            alt="Antonio e Jucivania"
            width={873}
            height={1164}
            className="relative aspect-[3/4] w-full rounded-[4px] border border-white object-cover shadow-soft"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

function GiftSection({
  category,
  setCategory,
  visibleGifts
}: {
  category: (typeof categories)[number];
  setCategory: (category: (typeof categories)[number]) => void;
  visibleGifts: GiftItem[];
}) {
  return (
    <section id="presentes" className="relative bg-white px-5 py-20 sm:px-8 lg:px-12">
      <div className="absolute left-1/2 top-0 h-px w-[min(72rem,92vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-sans text-sm font-semibold uppercase text-gold">Lista de presentes</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-royal sm:text-5xl">
            Sugestoes para quem desejar oferecer
          </h2>
          <p className="mt-5 font-serif text-2xl leading-relaxed text-ink/75">
            A vossa presenca ja e o maior presente. Para quem pediu ideias, reunimos algumas
            sugestoes uteis para a nova etapa. Nao e obrigatorio escolher apenas desta lista:
            qualquer gesto, lembranca ou oferta no dia da festa sera recebida com carinho.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full border px-4 py-2 font-sans text-sm font-semibold transition ${
                category === item
                  ? "border-ink bg-ink text-white shadow-gold"
                  : "border-petal/25 bg-porcelain text-ink hover:border-gold hover:text-royal"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleGifts.map((item, index) => (
            <GiftCard key={item.name} item={item} index={index} />
          ))}
        </motion.div>

        <div className="mt-12 grid gap-4 border border-gold/30 bg-mist/35 p-6 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-gold shadow-sm">
            <ShoppingBag className="h-7 w-7" />
          </div>
          <p className="font-serif text-xl leading-relaxed text-ink/80">
            Boas lojas para procurar: Continente, Worten, Homa, IKEA, Auchan, Radio Popular,
            Leroy Merlin, Zara Home, El Corte Ingles e lojas chinesas locais. O mais importante e
            que seja algo escolhido com carinho.
          </p>
        </div>
      </div>
    </section>
  );
}

function GiftCard({ item, index }: { item: GiftItem; index: number }) {
  const Icon = item.icon;
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(`${item.name} ${item.stores[0]} Portugal`)}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.025, 0.2) }}
      className="gift-card group border border-petal/20 bg-porcelain p-5 shadow-sm transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-soft"
    >
      <div className="gift-icon mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white text-royal shadow-sm transition duration-300">
        <Icon className="h-8 w-8" strokeWidth={1.6} />
      </div>
      <p className="font-sans text-xs font-semibold uppercase text-gold">{item.category}</p>
      <h3 className="mt-2 font-serif text-2xl font-semibold text-ink">{item.name}</h3>
      <p className="mt-3 min-h-16 font-sans text-sm leading-relaxed text-ink/70">{item.note}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.stores.map((store) => (
          <span key={store} className="rounded-full border border-petal/20 bg-white px-3 py-1 font-sans text-xs font-semibold text-petal">
            {store}
          </span>
        ))}
      </div>
      <a
        href={searchUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-2 font-sans text-sm font-semibold text-royal transition group-hover:text-gold"
      >
        Procurar sugestao
        <ExternalLink className="h-4 w-4" />
      </a>
    </motion.article>
  );
}

function RsvpSection({
  guestName,
  setGuestName,
  guestCount,
  setGuestCount,
  copyRsvp,
  rsvpMessage,
  copied
}: {
  guestName: string;
  setGuestName: (value: string) => void;
  guestCount: string;
  setGuestCount: (value: string) => void;
  copyRsvp: (event: FormEvent<HTMLFormElement>) => void;
  rsvpMessage: string;
  copied: boolean;
}) {
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(rsvpMessage)}`;

  return (
    <section id="confirmar" className="relative px-5 py-20 sm:px-8 lg:px-12">
      <div className="absolute inset-0 bg-[url('/convite-acoes.png')] bg-bottom bg-no-repeat opacity-[0.08]" />
      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <p className="font-sans text-sm font-semibold uppercase text-gold">Confirmacao</p>
          <h2 className="font-display text-4xl leading-tight text-royal sm:text-5xl">
            Ajude-nos a preparar este dia com todo carinho
          </h2>
          <p className="max-w-2xl font-serif text-2xl leading-relaxed text-ink/75">
            Preencha o seu nome e o numero de pessoas. O botao gera uma mensagem pronta para
            enviar pelo WhatsApp, simples e sem complicar a vida de ninguem.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Heart, label: "Cerimonia", value: "21 de Agosto" },
              { icon: PartyPopper, label: "Hora", value: "20h00" },
              { icon: MapPin, label: "Morada", value: "Rua Jose Antonio Morao 12F" }
            ].map((item) => (
              <div key={item.label} className="bg-white/75 p-5 shadow-sm">
                <item.icon className="mb-3 h-5 w-5 text-gold" />
                <p className="font-sans text-xs font-semibold uppercase text-petal">{item.label}</p>
                <p className="mt-1 font-serif text-xl font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={copyRsvp}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="border border-gold/35 bg-white p-6 shadow-soft sm:p-8"
        >
          <label className="block font-sans text-sm font-semibold uppercase text-petal" htmlFor="guest-name">
            Nome
          </label>
          <input
            id="guest-name"
            value={guestName}
            onChange={(event) => setGuestName(event.target.value)}
            placeholder="Escreva o seu nome"
            className="mt-2 w-full border border-petal/25 bg-porcelain px-4 py-3 font-serif text-xl text-ink outline-none transition focus:border-gold"
          />

          <label className="mt-5 block font-sans text-sm font-semibold uppercase text-petal" htmlFor="guest-count">
            Numero de pessoas
          </label>
          <input
            id="guest-count"
            value={guestCount}
            onChange={(event) => setGuestCount(event.target.value)}
            inputMode="numeric"
            className="mt-2 w-full border border-petal/25 bg-porcelain px-4 py-3 font-serif text-xl text-ink outline-none transition focus:border-gold"
          />

          <div className="mt-6 rounded-[4px] border border-petal/20 bg-mist/35 p-4 font-sans text-sm leading-relaxed text-ink/75">
            {rsvpMessage}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-sans text-sm font-semibold text-white transition hover:bg-royal"
            >
              <Copy className="h-4 w-4" />
              {copied ? "Mensagem copiada" : "Copiar mensagem"}
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-gold/60 bg-white px-5 py-3 font-sans text-sm font-semibold text-ink transition hover:border-gold hover:text-royal"
            >
              <MessageCircle className="h-4 w-4" />
              Abrir WhatsApp
            </a>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink px-5 py-12 text-white sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-3xl">A & J</p>
          <p className="mt-2 font-serif text-xl text-white/75">Antonio e Jucivania · 21.08.2026</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="#detalhes" className="rounded-full border border-white/20 px-4 py-2 font-sans text-sm font-semibold text-white/80 hover:text-white">
            Detalhes
          </a>
          <a href="#presentes" className="rounded-full border border-white/20 px-4 py-2 font-sans text-sm font-semibold text-white/80 hover:text-white">
            Presentes
          </a>
          <a href="#confirmar" className="rounded-full border border-white/20 px-4 py-2 font-sans text-sm font-semibold text-white/80 hover:text-white">
            Confirmar
          </a>
        </div>
      </div>
    </footer>
  );
}
