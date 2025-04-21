export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl w-full mx-auto max-2xl:px-10 max-sm:px-5">
      {children}
    </div>
  );
}
