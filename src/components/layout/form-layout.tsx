export function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id='form-layout' className="w-full h-full flex justify-center" >
      <div id='form-layout-child' className="w-full lg:w-4/5 xl:w-3/5">
        {children}
      </div>
    </div>
  )
}