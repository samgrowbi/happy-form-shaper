import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { BeforeAfterCard } from "./BeforeAfterCard";
import { useTreatment } from "@/context/TreatmentContext";
import { AccentWord } from "./ui/AccentWord";
import face1Before from "@/assets/before-after/new-face-halves/face-result-1-before.webp.asset.json";
import face1After from "@/assets/before-after/new-face-halves/face-result-1-after.webp.asset.json";
import face2Before from "@/assets/before-after/new-face-halves/face-result-2-before.webp.asset.json";
import face2After from "@/assets/before-after/new-face-halves/face-result-2-after.webp.asset.json";
import face3Before from "@/assets/before-after/new-face-halves/face-result-3-before.webp.asset.json";
import face3After from "@/assets/before-after/new-face-halves/face-result-3-after.webp.asset.json";
import face4Before from "@/assets/before-after/new-face-halves/face-result-4-before.webp.asset.json";
import face4After from "@/assets/before-after/new-face-halves/face-result-4-after.webp.asset.json";
import face5Before from "@/assets/before-after/new-face-halves/face-result-5-before.webp.asset.json";
import face5After from "@/assets/before-after/new-face-halves/face-result-5-after.webp.asset.json";

const defaultResults = [
  { id: 1, before: face1Before.url, after: face1After.url, label: "Facial Lifting", name: "Catherine", age: 38, objectPosition: "center center" },
  { id: 2, before: face2Before.url, after: face2After.url, label: "Facial Lifting", name: "Margaret", age: 41, objectPosition: "center center" },
  { id: 3, before: face3Before.url, after: face3After.url, label: "Facial Lifting", name: "Elaine", age: 62, objectPosition: "center center" },
  { id: 4, before: face4Before.url, after: face4After.url, label: "Facial Lifting", name: "Brianna", age: 34, objectPosition: "center center" },
  { id: 5, before: face5Before.url, after: face5After.url, label: "Facial Lifting", name: "Rosalind", age: 42, objectPosition: "center center" },
];


export function Results() {
  const treatment = useTreatment();
  const results = treatment.beforeAfterResults || defaultResults;
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrentIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const scrollTo = (index: number) => api?.scrollTo(index);

  return (
    <section id="results" className="pt-4 md:pt-6 pb-6 md:pb-10 bg-white relative overflow-hidden" dir="ltr">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-50/50 rounded-full blur-3xl -z-10 pointer-events-none opacity-60" />

      <div className="container mx-auto px-5 pt-0 md:pt-0">
        <div className="text-center mb-8 lg:mb-12 space-y-1 lg:space-y-2">
          <h2 className="hidden sm:block text-4xl lg:text-5xl xl:text-6xl font-serif font-normal text-gray-900 leading-tight">
            <span className="text-gray-900">Real People.</span> <AccentWord>Real Results.</AccentWord>
          </h2>
        </div>

        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              dragFree: false,
              containScroll: "trimSnaps",
              duration: 40,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full mx-auto"
          >
            <CarouselContent className="-ml-6">
              {results.map((item: any) => (
                <CarouselItem key={item.id} className="basis-[85%] md:basis-1/2 pl-6">
                  {item.composite ? (
                    <div className="group" dir="ltr">
                      <div className="relative w-full overflow-hidden rounded-2xl shadow-lg bg-white transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:-translate-y-1">
                        <div className="w-full aspect-[4/3] lg:aspect-[3/2] overflow-hidden bg-gray-100">
                          <img
                            src={item.composite}
                            alt={`${item.label} before and after treatment result${item.name ? ` for ${item.name}` : ""}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                          />
                        </div>
                        <div className="w-full text-center py-2 lg:py-3 bg-white">
                          {item.name ? (
                            <>
                              <span className="text-sm lg:text-lg xl:text-xl font-medium text-gray-800">{item.name}</span>
                              {item.age && <span className="text-sm lg:text-lg xl:text-xl text-gray-500">, {item.age}</span>}
                            </>
                          ) : (
                            <span className="text-sm lg:text-lg xl:text-xl font-medium text-transparent select-none">.</span>
                          )}
                        </div>
                        <div className="flex w-full text-center text-sm lg:text-base font-medium tracking-wide uppercase">
                          <div className="w-1/2 py-2.5 lg:py-3.5 bg-gray-100 text-gray-500 border-r border-white transition-colors duration-300 group-hover:bg-gray-200">
                            Before
                          </div>
                          <div className="w-1/2 py-2.5 lg:py-3.5 bg-blue-500 text-white shadow-inner transition-colors duration-300 group-hover:bg-blue-600">
                            After
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <BeforeAfterCard
                      beforeImg={item.before}
                      afterImg={item.after}
                      label={item.label}
                      name={item.name}
                      age={item.age}
                      objectPosition={item.objectPosition}
                    />
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden md:flex -left-12 w-12 h-12 border-none bg-white shadow-lg hover:bg-blue-50 text-gray-800 hover:text-blue-500" />
            <CarouselNext className="hidden md:flex -right-12 w-12 h-12 border-none bg-white shadow-lg hover:bg-blue-50 text-gray-800 hover:text-blue-500" />
          </Carousel>

          <div className="flex justify-center items-center gap-2 mt-6">
            {results.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-blue-500 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <p className="hidden sm:block text-center text-gray-900 text-xs lg:text-base xl:text-lg mt-4 lg:mt-6">
            Every result shown is from a real client. Individual results may vary.
          </p>
        </div>
      </div>
    </section>
  );
}
