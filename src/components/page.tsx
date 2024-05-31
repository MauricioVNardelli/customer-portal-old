export function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id='PageLayout' className="flex flex-col w-full items-center p-10">      
      {children}
    </div>
  )
}