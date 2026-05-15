export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white" style={{ fontFamily: "Manrope, sans-serif" }}>
      {children}
    </div>
  );
}
