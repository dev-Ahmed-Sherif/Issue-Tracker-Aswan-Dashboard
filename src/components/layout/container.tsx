"use client";
function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1920px] w-screen mx-auto xl:px-20 px-4 py-4">
      {children}
    </div>
  );
}

export default Container;
