import React from "react";

type Brand = {
    imageSrc: string;
    altText: string;
    link: string;
  };

const brandsData = [
  {
    imageSrc:
      "https://utfs.io/f/43d17587-78bc-4e7f-ab28-8bf6ecb89efd-2ka.png",
    altText: "graygrids",
    link: "#",
  },
  {
    imageSrc:
      "https://utfs.io/f/5bb7c57c-4b04-4af7-9f26-41dd7f99ec87-ui7n8f.png",
    altText: "lineicons",
    link: "#",
  },

  {
    imageSrc: "https://utfs.io/f/183d2961-710a-4223-9727-16e7318ee5f0-cfeki2.jpg",
    altText: "ayroui",
    link: "#",
  },
];

export default function Brands() {
  return (
    <section className="bg-white text-slate-800 py-10 lg:py-[60px]">
        <h2 className="text-center pb-6 scroll-m-20 text-3xl font-semibold tracking-tight">Trusted by</h2>
        <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="flex flex-wrap items-center justify-center">
              {brandsData.map((brand, i) => (
                <SingleImage key={i} brand={brand} />
              ))}
            </div>
          </div>
        </div>
        </div>
    </section>
  );
}

const SingleImage: React.FC<{ brand: Brand }> = ({ brand }) => {
  const { link, imageSrc, altText } = brand;
  return (
    <a
      href={link}
      className="mx-4 flex w-[150px] items-center justify-center py-5 2xl:w-[180px]"
    >
      <img src={imageSrc} alt={altText} className="h-10 w-full dark:hidden" />
      <img
        src={imageSrc}
        alt={altText}
        className="hidden h-10 w-full dark:block"
      />
    </a>
  );
};
