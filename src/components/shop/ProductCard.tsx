import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  return (
    <Card className="bg-card/60 backdrop-blur border-white/10 hover:border-white/20 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{product.name}</span>
          {product.featured && (
            <span className="text-xs px-2 py-1 rounded-full bg-accent-gradient text-accent-foreground">Featured</span>
          )}
        </CardTitle>
        <CardDescription>{product.category || "PSD Template"}</CardDescription>
      </CardHeader>
      <CardContent>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={`${product.name} preview with hologram style`}
            className="w-full h-40 object-cover rounded-md mb-4"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-40 rounded-md mb-4 bg-secondary/10 hologram" />
        )}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">${product.price.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">PSD + Hologram details</p>
          </div>
          {onSelect && (
            <Button variant="accent" onClick={() => onSelect(product)}>Select</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
