import qs from "qs";
import { notFound } from "next/navigation";

import { fetchAPI } from "@/lib/fetch-api";
import { getStrapiURL } from "@/lib/utils";
import { blockRenderer } from "@/lib/block-renderer";
import { Block } from "@/types";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "blocks.hero": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            links: true,
          },
        },
        "blocks.card-carousel": {
          populate: {
            cards: true,
          },
        },
        "blocks.heading": {
          populate: "*",

        },
      },
    },
  },
});

async function loader() {
  const authToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const BASE_URL = getStrapiURL();
  console.log("base urs: ",BASE_URL);
  const path = "/api/home-page";
  const url = new URL(path, BASE_URL);

  url.search = homePageQuery;

  const data = await fetchAPI(url.href, {
    method: "GET",
    authToken: authToken
  });

  if (!data.data) notFound();

  const blocks = data?.data?.blocks || [];
  return { blocks };
}

export default async function HomeRoute() {
  const data = await loader();
  const blocks = data.blocks;

  // Replace `image.url` with your actual image URL or fetched Strapi image.
  //const backgroundImageUrl = "https://images.prismic.io/encord/Zw1RxIF3NbkBXanh_image-58-.png?auto=format%2Ccompress&fit=max&w=583&h=324&fm=webp";

  return (
      <div>
        {/* Render all blocks */}
        {blocks.map((block: Block, index: number) => {
          return blockRenderer(block, index);
        })}

        {/* Hardcoded CTA Button
        <div className="flex justify-center mt-10">
          <a
              href="https://github.com/Desko95/assignment"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-lg font-semibold text-white bg-pink-700 rounded-lg hover:opacity-80 transition duration-200"
          >
            Sign Up
          </a>
        </div>*/}
      </div>
  );
}