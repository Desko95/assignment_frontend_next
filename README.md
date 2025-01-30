This project is a modern web application built using [Next.js](), a React-based framework that provides server-side rendering, static site generation, and flexibility to build performant applications. It is structured with reusable blocks and dynamically rendered components that adapt based on backend API data. The project also takes advantage of tools and libraries like `TypeScript`, `Tailwind CSS`, and `Strapi` for a clean development experience.
### Features
- **Dynamic Block-Based Architecture**: The app uses a modular structure to render different components dynamically based on API responses (e.g., Hero, Heading, Card Carousel, and Section blocks).
- **Powered by Next.js**: Leverages Next.js capabilities like server-side rendering (SSR), static site generation (SSG), and API routes.
- **TypeScript Integration**: Provides scalable and strongly-typed development.
- **Strapi CMS**: Used for managing backend content and APIs, enabling the seamless integration of dynamic data.
- **Tailwind CSS**: Highly customizable utility-first CSS framework.

### Installation
To set up the project locally:
1. Clone the repository:
``` bash
   git clone <repository-url>
   cd <project-directory>
```
1. Install dependencies:
``` bash
   npm install
   # or
   yarn install
```
1. Create a `.env` file in the root directory and add the following environment variable for Strapi API access (update the value accordingly):
``` 
   NEXT_PUBLIC_STRAPI_API_TOKEN=your-strapi-api-token
```
1. Run the development server:
``` bash
   npm run dev
   # or
   yarn dev
```
1. Open the app in your browser at [http://localhost:3000]().

### Folder Structure
The essential project folders and files are organized as follows:
``` 
├── app/
│   ├── page.tsx            # Main entry file for rendering the home page
├── components/
│   ├── blocks/             # Reusable block components (Hero, Heading, Section, etc.)
│   ├── ui/                 # UI components (Button, Card, etc.)
│   ├── custom/             # Custom components (e.g., StrapiImage for handling images)
├── lib/
│   ├── fetch-api.ts        # Helper function to fetch content from the API
│   ├── utils.ts            # Utility functions (e.g., Strapi URL builder)
├── types/
│   ├── blocks.ts           # Type definitions for blocks (e.g., Hero, Heading, Section)
│   ├── base.ts             # Shared types (e.g., LinkProps, ImageProps)
├── public/                 # Static assets
├── styles/                 # Global and Tailwind CSS styles
├── .env                    # Environments for API keys or configuration variables
```
### Dynamic Block Rendering
This project uses a dynamic `blockRenderer` function to determine which component to render based on the data provided by Strapi's API. Each block is mapped to a reusable React component and can be extended in the `blockRenderer.tsx`.
#### Adding a New Block
To add additional blocks to your project:
1. **Create a New Component**: Add a new component in the `/components/blocks` directory.
``` tsx
   // Example: NewBlock.tsx
   export function NewBlock({ content }: { content: string }) {
     return <div className="new-block">{content}</div>;
   }
```
1. **Define the Block Type**: Add the block type to your `types/blocks.ts` file.
``` typescript
   export interface NewBlockProps extends Base<"blocks.new-block"> {
     content: string;
   }

   // Add it to the Block union type
   export type Block = HeroProps | HeadingProps | CardCarouselProps | SectionProps | NewBlockProps;
```
1. **Update the `blockRenderer` Function**: Map the component to the new block's `__component` type in `block-renderer.tsx`.
``` tsx
   import { NewBlock } from "@/components/blocks";

   export function blockRenderer(block: Block, index: number) {
     switch (block.__component) {
       case "blocks.new-block":
         return <NewBlock {...block} key={index} />;
       default:
         return null;
     }
   }
```
Strapi will now populate this block dynamically, and it will render as part of the page.
### API Integration
This project uses Strapi CMS as the source for dynamic content. API queries are defined in `page.tsx` using [qs]() for building query strings.
#### Example Query:
``` typescript
const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "blocks.hero": { populate: { image: true, links: true } },
        "blocks.section": true,
      },
    },
  },
});
```
This query ensures all relevant blocks are fetched with their nested data such as images and links.
#### Fetch Function:
The helper function `fetchAPI` in `lib/fetch-api.ts` is used to streamline API requests:
``` typescript
export async function fetchAPI(url: string, options: RequestInit & { authToken?: string }) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (options.authToken) {
    headers.append("Authorization", `Bearer ${options.authToken}`);
  }

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) throw new Error("Failed to fetch data.");
  return response.json();
}
```
### Using Tailwind CSS
This project uses [Tailwind CSS]() for styling. Global styles and custom configurations are stored in the `styles/` directory and the `tailwind.config.js` file, respectively.
#### Example:
Button components leverage Tailwind’s utility-first structure:
``` tsx
<Button
  size="lg"
  asChild
  variant="outline"
  className="h-12 cursor-pointer border-border text-base sm:h-14 sm:px-10"
>
  <Link href="/example">Click Me</Link>
</Button>
```
Feel free to customize classes for consistent UI elements.
### Deployment
Deploy your application on [Vercel](), the recommended platform for Next.js:
1. Push your changes to a GitHub repository.
2. Log in to Vercel and create a new project.
3. Connect your repository to Vercel.
4. Add the `NEXT_PUBLIC_STRAPI_API_TOKEN` environment variable in Vercel's settings.

Your app will be live and accessible via a Vercel-generated URL.
### Troubleshooting
- If the `links.map` error occurs in the `Section` component, ensure `links` is not `undefined`. Either provide a default value, or gracefully handle edge cases where data might be incomplete.
- Ensure Strapi is populated with the correct data schema for each block type to avoid API errors.

### Future Enhancements
- **New Block Types**: Add more reusable visual components like sliders, testimonials, etc.
- **Localization**: Integrate Strapi’s i18n capabilities for multilingual support.
- **Caching and Performance**: Implement caching with incremental static regeneration (ISR) or a tool like [SWR]().
