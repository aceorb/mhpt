
export default function OAuthLayout({
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
