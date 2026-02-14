import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.55rem",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <img src="/logo-light.png" alt="" className="site-logo site-logo-light" />
      <img src="/logo.png" alt="" className="site-logo site-logo-dark" />
      silo
    </Link>
  );
}
