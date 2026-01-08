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

  const projectsByCategory = projects.reduce((acc: any, project: any) => {
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
  }, {});

  return <PortfolioView projectsByCategory={projectsByCategory} />;
}
