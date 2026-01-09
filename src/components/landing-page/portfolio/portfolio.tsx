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

  const projectsByCategory = projects.reduce(
    (acc: Record<string, { title: string; projects: any[] }>, project: any) => {
      const category = project.category;
      if (!category) return acc;

      const key = category.slug;

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

  const orderedProjectsByCategory = ORDER.map((slug) => {
    const group = projectsByCategory[slug];
    if (!group) return null;

    return {
      slug,
      title: group.title,
      projects: group.projects,
    };
  }).filter(Boolean);

  return <PortfolioView projectsByCategory={orderedProjectsByCategory} />;
}
