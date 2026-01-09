import { getPayload } from "payload";
import config from "@/payload.config";
import PortfolioView from "./portfolioview";

export default async function Portfolio() {
  const payload = await getPayload({ config });

  const { docs: projects } = await payload.find({
    collection: "projects",
    depth: 2,
    limit: 100,
    sort: "createdAt",
  });

  const ORDER = ["UGC", "VSL", "PODCAST", "STATIC"] as const;

  // 1. Group projects by category slug
  const grouped = projects.reduce(
    (acc: Record<string, { title: string; projects: any[] }>, project: any) => {
      const category = project.category;
      if (!category) return acc;

      const key = category.slug; // Ensure this matches "UGC", "VSL", etc.

      if (!acc[key]) {
        acc[key] = {
          title: category.title,
          projects: [],
        };
      }

      acc[key].projects.push(project);
      return acc;
    },
    {}
  );

  // 2. Reorder the categories based on the ORDER array
  // We map through ORDER and only include categories that actually have projects
  const orderedProjectsByCategory = ORDER.reduce(
    (acc, slug) => {
      if (grouped[slug]) {
        acc[slug] = grouped[slug];
      }
      return acc;
    },
    {} as Record<string, { title: string; projects: any[] }>
  );

  return <PortfolioView projectsByCategory={orderedProjectsByCategory} />;
}
