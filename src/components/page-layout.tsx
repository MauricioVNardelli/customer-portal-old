export function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id='PageLayout' className="h-full w-full items-center p-10">      
      {children}
    </div>
  )
}