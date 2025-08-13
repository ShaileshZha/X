"use client";

import { useEffect } from "react";

type AdProps = React.HTMLAttributes<HTMLDivElement> & {
  client: string;
  slot: string;
  format?: string;
  layoutKey?: string;
  layout?: string;
  fullWidth?: boolean;
};

export function AdUnit({ client, slot, format = "auto", layoutKey, layout, fullWidth, ...rest }: AdProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // no-op
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", ...(layout === "in-article" ? { textAlign: "center" } : {}), ...(fullWidth ? { width: "100%" } : {}) }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      {...(layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
      {...(layout ? { "data-ad-layout": layout } as any : {})}
      {...(fullWidth ? { "data-full-width-responsive": "true" } : {})}
      {...rest}
    />
  );
}


