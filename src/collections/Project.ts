import type { CollectionConfig } from "payload";

export const Project: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "project-categories",
      required: true,
    },
    {
      name: "projectMedia",
      type: "upload",
      relationTo: "media",
      required: true,
      hasMany: true,
    },
  ],
};
