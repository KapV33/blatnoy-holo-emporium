import React, { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import QRCode from "react-qr-code";
import { toast } from "@/hooks/use-toast";
import type { Product } from "@/types/product";

const WALLETS = {
  BTC: "bc1q-your-btc-address-change-me",
  ETH: "0xYourEthereumAddressChangeMe",
  USDT_TRC20: "TDYourTronAddressChangeMe",
  USDT_ERC20: "0xYourEthUsdtAddressChangeMe",
};

type Asset = "BTC" | "ETH" | "USDT_TRC20" | "USDT_ERC20";

interface PaymentPanelProps {
  selectedProduct?: Product | null;
}

export const PaymentPanel: React.FC<PaymentPanelProps> = ({ selectedProduct }) => {
  const [asset, setAsset] = useState<Asset>("BTC");
  const [amountUSD, setAmountUSD] = useState<number>(selectedProduct?.price || 250);

  const address = useMemo(() => {
    switch (asset) {
      case "BTC":
        return WALLETS.BTC;
      case "ETH":
        return WALLETS.ETH;
      case "USDT_TRC20":
        return WALLETS.USDT_TRC20;
      case "USDT_ERC20":
        return WALLETS.USDT_ERC20;
    }
  }, [asset]);

  return (
    <section id="payment" className="mt-16">
      <div className="max-w-3xl mx-auto p-6 rounded-xl border border-white/10 bg-card/60 backdrop-blur">
        <h2 className="text-2xl font-bold mb-2">Checkout</h2>
        <p className="text-muted-foreground mb-6">We accept BTC, USDT (TRC20 & ERC20), and ETH only. Send the USD equivalent to the selected address.</p>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            {selectedProduct ? (
              <div className="p-3 rounded-md bg-secondary/10">
                <div className="text-sm text-muted-foreground">Selected</div>
                <div className="font-medium">{selectedProduct.name}</div>
                <div className="text-sm">${selectedProduct.price.toFixed(2)}</div>
              </div>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                min={1}
                value={amountUSD}
                onChange={(e) => setAmountUSD(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label>Asset</Label>
              <Select value={asset} onValueChange={(v) => setAsset(v as Asset)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="USDT_TRC20">USDT (TRC20)</SelectItem>
                  <SelectItem value="USDT_ERC20">USDT (ERC20)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Address</Label>
              <div className="flex items-center gap-2">
                <Input readOnly value={address} />
                <Button
                  variant="accent"
                  onClick={() => {
                    navigator.clipboard.writeText(address);
                    toast({ title: "Address copied" });
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-3">
            <div className="p-4 rounded-lg bg-background border border-white/10">
              <QRCode value={address} size={160} fgColor="#ffffff" bgColor="transparent" />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Scan to pay. Send the USD equivalent (${amountUSD.toFixed(2)}) to the selected address.
            </p>
          </div>
        </div>

        <div className="text-xs text-muted-foreground mt-6">
          After payment, email your TX hash and order details to support@blatnoy.app to receive your files.
        </div>
      </div>
    </section>
  );
};
