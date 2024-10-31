import clsx from "clsx";

type PageLayoutProps = {
  title?: string;
  children: React.ReactNode;
};

export function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <div id="page-layout">
      {title ? (
        <div id="page-layout_title" className="max-w-fit h-10 mt-8">
          <p
            className={clsx(
              "pl-2 pr-10 py-2 rounded-r-lg font-bold bg-gray-200",
              //dark
              "dark:bg-gray-800 dark:text-gray-200"
            )}
          >
            {title}
          </p>
        </div>
      ) : (
        <></>
      )}

      <div id="page-layout_content" className="h-full w-full items-center p-10">
        {children}
      </div>
    </div>
  );
}
