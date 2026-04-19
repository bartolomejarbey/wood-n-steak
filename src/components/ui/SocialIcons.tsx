import type { SVGProps } from "react";

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4c.5 2 2 4 5 4" />
    </svg>
  );
}

export function VisaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 16" aria-hidden {...props}>
      <text
        x="0"
        y="13"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="16"
        fill="currentColor"
      >
        VISA
      </text>
    </svg>
  );
}

export function MastercardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 28" aria-hidden {...props}>
      <circle cx="18" cy="14" r="10" fill="#EB001B" />
      <circle cx="30" cy="14" r="10" fill="#F79E1B" />
      <path
        d="M24 6.5c2.4 1.8 4 4.6 4 7.5s-1.6 5.7-4 7.5c-2.4-1.8-4-4.6-4-7.5s1.6-5.7 4-7.5Z"
        fill="#FF5F00"
      />
    </svg>
  );
}

export function ApplePayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 20" aria-hidden {...props}>
      <text
        x="0"
        y="14"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="14"
        fill="currentColor"
      >
         Pay
      </text>
    </svg>
  );
}

export function GooglePayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 20" aria-hidden {...props}>
      <text
        x="0"
        y="14"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="600"
        fontSize="13"
        fill="currentColor"
      >
        G Pay
      </text>
    </svg>
  );
}
