import React from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";


interface HeadingProps {
    heading: string;
    subHeading?: string;
    text?: string;
    links?: {
        label: string;
        href: string;
        isExternal?: boolean;
    }[]; // `links` is marked optional here
}

export function Heading({ heading, subHeading, text, links }: Readonly<HeadingProps>) {
    return (
        <section className="container flex flex-col items-center gap-6 pt-24 pb-6 sm:gap-7">
            <div className="flex flex-col gap-3">
                {subHeading && (
                    <span className="font-bold uppercase text-primary text-center">
                        {subHeading}
                    </span>
                )}
                <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-center">
                    {heading}
                </h2>
            </div>
            {text && (
                <p className="text-lg text-muted-foreground max-w-2xl text-center">
                    {text}
                </p>
            )}
            <div className="grid grid-cols-2 gap-3">
                {links && links.map((link, index) => {
                        return (
                            <Button
                                key={index}
                                size="lg"
                                asChild
                                variant="outline"
                                className="h-12 bg-pink-700 cursor-pointer border-border text-base sm:h-14 sm:px-10"
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
                        );
                    })
                }
            </div>
        </section>
    );
}