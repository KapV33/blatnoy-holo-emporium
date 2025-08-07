import React, { useMemo, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import heroImage from "@/assets/hero-hologram.jpg";
import { Button } from "@/components/ui/button";
import { CSVUploader } from "@/components/shop/CSVUploader";
import { ProductCard } from "@/components/shop/ProductCard";
import { PaymentPanel } from "@/components/shop/PaymentPanel";
import type { Product } from "@/types/product";

const initialProducts: Product[] = [
  {
    id: "ULT-250",
    name: "Ultimate Package",
    description: "All PSD templates + hologram overlays + priority support",
    price: 250,
    category: "Bundle",
    featured: true,
  },
  {
    id: "PSD-PRO",
    name: "Pro PSD Hologram",
    description: "Advanced PSD template with layered hologram effects",
    price: 79,
    category: "PSD",
  },
  {
    id: "PSD-DELUXE",
    name: "Deluxe PSD Hologram",
    description: "Premium PSD template with multi-angle hologram sheen",
    price: 129,
    category: "PSD",
  },
];

const Index = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const ultimate = useMemo(() => products.find(p => p.name.toLowerCase().includes("ultimate")) || products[0], [products]);
  const [selected, setSelected] = useState<Product | null>(ultimate || null);

  const handleImport = (items: Product[]) => {
    // Merge by id, prefer imported
    const map = new Map<string, Product>(products.map(p => [p.id, p]));
    items.forEach(i => map.set(i.id, i));
    const merged = Array.from(map.values());
    setProducts(merged);
    // Auto-select Ultimate if present
    const ult = merged.find(p => p.name.toLowerCase().includes("ultimate"));
    if (ult) setSelected(ult);
  };

  return (
    <HelmetProvider>
      <div className="dark min-h-screen bg-app-gradient text-foreground">
        <Helmet>
          <title>Blatnoy – USA Authentication software | PSD Templates Shop</title>
          <meta name="description" content="Blatnoy autoshop selling PSD templates with hologram effects. Buy the Ultimate Package for $250. Accepting BTC, USDT (TRC20/ERC20), and ETH." />
          <link rel="canonical" href="/" />
          <meta property="og:title" content="Blatnoy – USA Authentication software" />
          <meta property="og:description" content="PSD templates with hologram effects. Ultimate Package $250. BTC/USDT/ETH accepted." />
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "Blatnoy",
            url: typeof window !== 'undefined' ? window.location.href : "",
            description: "Autoshop selling PSD templates with hologram effects",
            makesOffer: products.map(p => ({
              "@type": "Offer",
              itemOffered: { "@type": "Product", name: p.name, description: p.description },
              price: p.price,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock"
            }))
          })}</script>
        </Helmet>

        <header className="container py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-accent-gradient" aria-hidden />
            <span className="text-xl font-bold tracking-wide">Blatnoy</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6">
            <a href="#products" className="text-sm text-muted-foreground hover:text-foreground">Products</a>
            <a href="#payment" className="text-sm text-muted-foreground hover:text-foreground">Pay</a>
            <a href="/products-template.csv" download className="text-sm text-muted-foreground hover:text-foreground">CSV Template</a>
          </nav>
          <a href="#payment">
            <Button variant="hero" size="lg">Buy Ultimate $250</Button>
          </a>
        </header>

        <main>
          <section className="container grid lg:grid-cols-2 gap-10 items-center py-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">USA Authentication software</h1>
              <p className="text-lg text-muted-foreground mb-8">Premium PSD templates with hologram effects. Import your catalog via CSV and start selling instantly.</p>
              <div className="flex flex-wrap items-center gap-4">
                <a href="#payment"><Button variant="hero" size="xl">Get Ultimate – $250</Button></a>
                <CSVUploader onProductsParsed={handleImport} />
              </div>
            </div>
            <div className="relative">
              <img
                src={heroImage}
                alt="Holographic blue energy wave on a charcoal background"
                className="w-full rounded-xl border border-white/10 shadow-accent-glow"
                loading="eager"
              />
            </div>
          </section>

          <section id="deal" className="container py-6">
            <div className="p-6 rounded-xl border border-white/10 bg-card/60 backdrop-blur flex flex-col md:flex-row items-center justify-between gap-6 hologram">
              <div>
                <h2 className="text-2xl font-bold">Ultimate Package – $250</h2>
                <p className="text-muted-foreground">All templates + hologram overlays + priority support. One-time purchase.</p>
              </div>
              <a href="#payment"><Button variant="accent" size="xl">Buy Now</Button></a>
            </div>
          </section>

          <section id="products" className="container py-10">
            <h2 className="text-2xl font-bold mb-6">Catalog</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} onSelect={(prod) => setSelected(prod)} />
              ))}
            </div>
          </section>

          <section className="container py-10">
            <PaymentPanel selectedProduct={selected} />
          </section>
        </main>

        <footer className="container py-10 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Blatnoy. All rights reserved.
        </footer>
      </div>
    </HelmetProvider>
  );
};

export default Index;
