import type { CollectionConfig } from "payload";

export const Profile: CollectionConfig = {
  slug: "profile",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "profilePicture",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "bio",
      type: "textarea",
    },
    {
      name: "experiences",
      type: "relationship",
      relationTo: "experience",
      hasMany: true,
      admin: {
        description: "Experiences linked to this profile",
      },
    },
    {
      name: "educations",
      type: "relationship",
      relationTo: "education",
      hasMany: true,
      admin: {
        description: "Educations linked to this profile",
      },
    },
  ],
};
