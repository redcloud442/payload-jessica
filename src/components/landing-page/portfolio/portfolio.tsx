import { getPayload } from "payload";
import config from "@/payload.config";
import PortfolioView from "./portfolioview";
import { Project, ProjectCategory } from "@/payload-types";

export default async function Portfolio() {
  const payload = await getPayload({ config });

  const { docs: projects } = await payload.find({
    collection: "projects",
    depth: 2,
    limit: 100,
    sort: "createdAt",
  });

  const ORDER = ["ugc", "vsl", "podcast", "static"] as const;

  const projectsByCategory = projects.reduce(
    (
      acc: Record<string, { title: string; projects: Project[] }> = {},
      project: Project
    ) => {
      const category = project.category as ProjectCategory;
      if (!category) return acc;
      acc[category.slug] = {
        title: category.title,
        projects: [...(acc[category.slug]?.projects || []), project],
      };
      return acc;
    },
    {} as Record<string, { title: string; projects: Project[] }>
  );

  const orderedProjectsByCategory = ORDER.map((slug) => {
    const category = projectsByCategory[slug];
    if (!category) return null;

    return {
      slug,
      title: category.title,
      projects: category.projects,
    };
  }).filter(Boolean);

  return <PortfolioView projectsByCategory={orderedProjectsByCategory} />;
}
