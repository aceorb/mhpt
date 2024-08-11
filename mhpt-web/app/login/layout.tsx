
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className='flex flex-col items-center h-screen'
    >
      {children}
    </div>
  );
}
