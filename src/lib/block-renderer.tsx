import type { Block } from "@/types";

import { Hero, Heading, CardCarousel, Section } from "@/components/blocks"; // Import Section component

export function blockRenderer(block: Block, index: number) {
  switch (block.__component) {
    case "blocks.hero":
      return <Hero {...block} key={index} />;
    case "blocks.card-carousel":
      return <CardCarousel {...block} key={index} />;
    case "blocks.heading":
      return <Heading {...block} key={index} />;
    case "blocks.section": // Add case for blocks.section
      return <Section {...block} key={index} />;
    default:
      return null;
  }
}