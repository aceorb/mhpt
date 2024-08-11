export default function FromColumn({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-8 w-full max-w-full">{children}</div>
  );
}
