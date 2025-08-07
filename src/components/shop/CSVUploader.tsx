import React, { useRef } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import type { Product } from "@/types/product";

interface CSVUploaderProps {
  onProductsParsed: (products: Product[]) => void;
}

const REQUIRED_FIELDS = ["id", "name", "description", "price"] as const;

export const CSVUploader: React.FC<CSVUploaderProps> = ({ onProductsParsed }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as Record<string, string>[];

        const invalid = rows.some((row) =>
          REQUIRED_FIELDS.some((f) => !(f in row) || row[f].trim() === "")
        );
        if (invalid) {
          toast({ title: "Invalid CSV", description: "Missing required columns or empty values." });
          return;
        }

        const products: Product[] = rows.map((r) => ({
          id: String(r.id),
          name: r.name,
          description: r.description,
          price: Number(r.price),
          category: r.category || undefined,
          imageUrl: r.imageUrl || undefined,
          featured: String(r.featured || "").toLowerCase() === "true",
        }));

        onProductsParsed(products);
        toast({ title: "Products imported", description: `${products.length} products added.` });
      },
      error: () => {
        toast({ title: "Parse error", description: "Could not parse your CSV." });
      },
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
      <Button
        variant="accent"
        size="lg"
        onClick={() => fileInputRef.current?.click()}
      >
        Import products with CSV
      </Button>
      <a
        href="/products-template.csv"
        download
        className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground hover:opacity-90"
      >
        Download CSV template
      </a>
    </div>
  );
};
