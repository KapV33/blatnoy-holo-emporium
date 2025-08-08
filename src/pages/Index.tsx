import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import heroImage from "@/assets/hero-hologram.jpg";
import { Button } from "@/components/ui/button";

import { ProductCard } from "@/components/shop/ProductCard";
import { PaymentPanel } from "@/components/shop/PaymentPanel";
import type { Product } from "@/types/product";

const initialProducts: Product[] = [
  {
    id: "DL-2025-UHQ",
    name: "USA DRIVER LICENSE TEMPLATES - UPDATED 2025 HG JAVA",
    description: "Detailed UHQ PSD/GIMP templates with holograms to make the most realistic cards.",
    price: 250,
    category: "Driver License Templates",
    featured: true,
  },
];

const Index = () => {
  const [products] = useState<Product[]>(initialProducts);
  const [selected, setSelected] = useState<Product | null>(initialProducts[0]);

  return (
    <HelmetProvider>
      <div className="dark min-h-screen bg-app-gradient text-foreground">
        <Helmet>
          <title>Blatnoy – 2025 USA Driver License Templates</title>
          <meta name="description" content="UHQ 2025 USA driver license PSD/GIMP templates with holograms. Buy now with BTC, USDT (TRC20), or ETH." />
          <link rel="canonical" href="/" />
          <meta property="og:title" content="2025 USA Driver License Templates – Blatnoy" />
          <meta property="og:description" content="Detailed UHQ PSD/GIMP driver license templates with holograms. Pay with BTC, USDT (TRC20), or ETH." />
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "Blatnoy",
            url: typeof window !== 'undefined' ? window.location.href : "",
            description: "2025 USA driver license UHQ PSD/GIMP templates with holograms",
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
          </nav>
          <a href="#payment">
            <Button variant="hero" size="lg">BUY NOW</Button>
          </a>
        </header>

        <main>
          <section className="container grid lg:grid-cols-2 gap-10 items-center py-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">2025 USA DRIVER LICENSES FOR ALL STATES</h1>
              <p className="text-lg text-muted-foreground mb-8">Detailed UHQ PSD/GIMP templates with holograms to make the most realistic cards.</p>
              <div className="flex flex-wrap items-center gap-4">
                <a href="#payment"><Button variant="hero" size="xl">BUY NOW</Button></a>
                
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
