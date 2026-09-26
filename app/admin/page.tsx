import { ArrowUpRight } from '@/components/admin-icons';

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-76px)] w-full max-w-[1440px] flex-col px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <section className="flex flex-col justify-between gap-6 border-b border-[#ded9d0] pb-8 sm:flex-row sm:items-end dark:border-white/[0.08]">
        <div className="max-w-xl">
          <p className="font-[family-name:var(--font-zimora-code)] text-[11px] uppercase tracking-[0.2em] text-[#ff5a1f]">Admin dashboard</p>
          <h2 className="mt-3 font-[family-name:var(--font-zimora-display)] text-4xl leading-[1.05] tracking-tight text-[#242321] sm:text-5xl dark:text-white">A clear view of your workspace.</h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-[#777269] dark:text-white/45">Manage your Zimora workspace from one focused place. Your dashboard will come to life as activity is added.</p>
        </div>
        <button type="button" className="inline-flex h-11 items-center gap-3 self-start rounded-full bg-[#ff5a1f] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(255,90,31,0.18)] transition-transform hover:-translate-y-0.5 sm:self-auto">
          View public site
          <ArrowUpRight />
        </button>
      </section>

      <section className="flex flex-1 items-center justify-center py-16" aria-labelledby="empty-dashboard-title">
        <div className="flex max-w-md flex-col items-center text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl border border-[#ded9d0] bg-[#fbfaf7] text-2xl text-[#ff5a1f] shadow-sm dark:border-white/[0.1] dark:bg-[#151616]">+</div>
          <h3 id="empty-dashboard-title" className="mt-6 text-xl font-semibold tracking-tight text-[#242321] dark:text-white">Nothing to show yet</h3>
          <p className="mt-2 text-sm leading-6 text-[#777269] dark:text-white/45">There is no dashboard activity yet. Once your workspace has projects, messages, or team activity, it will appear here.</p>
        </div>
      </section>
    </div>
  );
}

