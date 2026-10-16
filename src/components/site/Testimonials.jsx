import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useSite } from "../../context/SiteContext.jsx";
import SectionHeader from "./SectionHeader.jsx";

export default function Testimonials() {
  const { content } = useSite();
  const { testimonials } = content;

  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f8f5ff_100%)] py-16 md:py-24 dark:bg-[linear-gradient(180deg,#0e1624_0%,#141c2c_100%)]">
      <div className="content">
        <SectionHeader
          align="center"
          eyebrow="Client love"
          title={testimonials.title}
          subtitle={testimonials.subtitle}
        />
        <div className="mt-10">
          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            spaceBetween={24}
            slidesPerView={1}
            className="!pb-14"
          >
            {testimonials.items.map((item) => (
              <SwiperSlide key={item.id}>
                <article className="mx-auto max-w-4xl rounded-[32px] border border-fuchsia-100 bg-white px-6 py-12 text-center shadow-[0_25px_60px_rgba(153,41,251,0.08)] md:px-16 dark:border-picto-primary/20 dark:bg-surface dark:shadow-[0_25px_60px_rgba(153,41,251,0.12)]">
                  <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-fuchsia-50 text-2xl text-picto-primary dark:bg-picto-primary/15">
                    ❝
                  </div>
                  <p className="text-lg leading-8 text-ink md:text-xl">{item.message}</p>
                  <p className="mt-6 text-base leading-8 text-muted">“{item.quote}”</p>
                  <div className="mx-auto mt-8 h-px w-16 bg-picto-primary/30" />
                  <h4 className="mt-6 text-lg font-semibold text-ink">{item.name}</h4>
                  <p className="mt-1 text-sm text-soft-dark">{item.role}</p>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
