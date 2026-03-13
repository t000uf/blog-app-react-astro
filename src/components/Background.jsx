export const Background = () => {
  return (
    <div className="from-bg-main/75 pointer-events-none fixed inset-0 -z-10 size-full min-h-screen overflow-hidden bg-linear-to-b to-[#cfc6b7]/75">
      <div className="absolute -top-40 -left-40 -z-11 h-[500px] w-[500px] rounded-full bg-amber-200/30 blur-[140px]"></div>
      <div className="absolute top-60 -right-40 -z-11 h-[500px] w-[500px] rounded-full bg-emerald-200/25 blur-[160px]"></div>
    </div>
  );
};
