import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";

export function PageShell({ children, eyebrow, lead, title }) {
  return (
    <main className="mx-auto max-w-[1728px] bg-parktek-cream px-4 pb-4 pt-4 sm:px-6 md:px-6 md:pb-6 md:pt-6 min-[1440px]:px-0 min-[1440px]:pb-0 min-[1440px]:pt-0">
      <div className="md:hidden">
        <Header />
      </div>

      <div className="hidden md:block min-[1440px]:hidden">
        <Header compact />
      </div>

      <div className="hidden min-[1440px]:block min-[1440px]:px-[40px] min-[1440px]:pt-[40px]">
        <Header className="mx-auto w-full max-w-[1648px]" forceDesktop />
      </div>

      <section className="mx-auto mt-5 max-w-[1237px] rounded-[40px] bg-white px-6 py-10 shadow-card md:mt-6 md:px-10 md:py-12 min-[1440px]:mt-[72px] min-[1440px]:p-[48px]">
        {eyebrow ? (
          <p className="font-clash text-sm uppercase tracking-[0.16em] text-[#1D4ED8]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 max-w-[18ch] font-clash text-[44px] leading-[0.96] text-parktek-ink md:text-[60px] min-[1440px]:text-[72px]">
          {title}
        </h1>
        {lead ? (
          <p className="mt-5 max-w-[50ch] text-[21px] leading-[1.45] text-parktek-muted md:text-[24px]">
            {lead}
          </p>
        ) : null}

        <div className="mt-10 min-[1440px]:mt-[56px]">{children}</div>
      </section>

      <div className="min-[1440px]:hidden">
        <Footer className="mt-10" />
      </div>

      <div className="hidden min-[1440px]:block">
        <Footer className="mt-[104px]" forceDesktop />
      </div>
    </main>
  );
}
