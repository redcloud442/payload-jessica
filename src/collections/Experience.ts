import type { CollectionConfig } from "payload";

export const Experience: CollectionConfig = {
  slug: "experience",
  admin: {
    useAsTitle: "company",
    defaultColumns: [
      "company",
      "position",
      "startYear",
      "endYear",
      "isCurrent",
    ],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "company",
      type: "text",
      required: true,
    },
    {
      name: "position",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "startYear",
      type: "number",
      required: true,
      min: 1900,
      max: new Date().getFullYear(),
    },
    {
      name: "isCurrent",
      type: "checkbox",
      label: "Currently working here",
      defaultValue: false,
    },
    {
      name: "endYear",
      type: "number",
      min: 1900,
      max: new Date().getFullYear(),
      admin: {
        description: "Leave empty if currently employed",
        condition: (_, siblingData) => !siblingData?.isCurrent,
      },
    },

    {
      name: "companyLogo",
      type: "upload",
      relationTo: "media",
    },
  ],
};
