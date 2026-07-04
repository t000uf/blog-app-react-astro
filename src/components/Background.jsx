export const Background = () => {
  return (
    <div className="-z-9 pointer-events-none fixed inset-0 size-full overflow-hidden">
      <div className="from-bg/75 bg-linear-to-b to-bg-deep/75 min-w-screen relative -z-10 size-full backdrop-blur-md">
        <div className="bg-teal/20 -z-11 absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full blur-[140px]"></div>
        <div className="bg-pink/30 -z-11 absolute -bottom-10 -right-40 h-[500px] w-[500px] rounded-full blur-[160px]"></div>
      </div>
    </div>
  );
};
