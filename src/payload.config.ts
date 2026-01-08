import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig, getPayload } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { s3Storage } from "@payloadcms/storage-s3";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Project } from "./collections/Project";
import { Profile } from "./collections/Profile";
import { Experience } from "./collections/Experience";
import { Education } from "./collections/Education";
import { ProjectCategory } from "./collections/ProjectCategory";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Project,
    ProjectCategory,
    Profile,
    Experience,
    Education,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),

  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: "media",
        },
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        forcePathStyle: true, // Important for using Supabase
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
      },
    }),
  ],
});
