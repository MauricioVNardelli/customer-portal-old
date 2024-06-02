export function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id='PageLayout' className="w-full h-full items-center p-10">      
      {children}
    </div>
  )
}