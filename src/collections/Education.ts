import type { CollectionConfig } from "payload";

export const Education: CollectionConfig = {
  slug: "education",
  admin: {
    useAsTitle: "school",
    defaultColumns: [
      "school",
      "degree",
      "fieldOfStudy",
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
      name: "school",
      type: "text",
      required: true,
    },
    {
      name: "degree",
      type: "text",
      required: true,
      admin: {
        description: "e.g. Bachelor of Science, Master of Arts",
      },
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
      label: "Currently studying here",
      defaultValue: false,
    },
    {
      name: "endYear",
      type: "number",
      min: 1900,
      max: new Date().getFullYear(),
      admin: {
        condition: (_, siblingData) => !siblingData?.isCurrent,
        description: "Leave empty if currently studying",
      },
    },
  ],
};
