import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { SectionProps } from "@/types/blocks";

export function Section({
                          subHeading,
                          heading,
                          links , // Default to an empty array to prevent undefined errors
                        }: Readonly<SectionProps>) {
  return (
      <section className="container h-full flex flex-col items-center gap-10 pb-10 pt-20 sm:gap-14 lg:flex-row">
        <div className="flex flex-1 flex-col items-center gap-8 lg:items-start lg:gap-10">
          <div className="flex items-center gap-1 rounded-full border bg-secondary px-3 py-0.5 hover:bg-secondary/60">
          <span className="text-sm text-secondary-foreground">
            {subHeading}
          </span>
          </div>
          <h1 className="max-w-2xl text-center font-heading text-4xl font-semibold sm:text-5xl sm:leading-tight lg:text-left">
            {heading}
          </h1>

          <div className="grid grid-cols-2 gap-3">
            {links && links.map((link, index) => (
                <Button
                    key={index}
                    size="lg"
                    asChild
                    variant="outline"
                    className="h-12 cursor-pointer border-border text-base sm:h-14 sm:px-10"
                >
                  <Link
                      href={link.href}
                      target={link.isExternal ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      prefetch
                  >
                    {link.label}
                  </Link>
                </Button>
            ))}
          </div>
        </div>
      </section>
  );
}