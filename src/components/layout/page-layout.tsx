type PageLayoutProps = {
  title?: string;
  children: React.ReactNode;
};

export function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <div id="page-layout" className="h-full w-full items-center p-10">
      {title ? (
        <div id="page-layout_title" className="w-full h-10">
          <p className="font-bold dark:text-gray-200">{title}</p>
          <div className="h-px bg-gradient-to-r from-gray-200 from-0% via-gray-200 dark:via-slate-800 via-30% to-white dark:to-slate-950 to-50%" />
        </div>
      ) : (
        <div />
      )}

      <div id="page-layout_content">{children}</div>
    </div>
  );
}
