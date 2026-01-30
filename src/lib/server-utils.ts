import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import fs, { mkdirSync } from "fs";
import { v4 as uuidv4 } from "uuid";

ffmpeg.setFfmpegPath(ffmpegStatic!);

export const videoCoverImage = async (data: Buffer): Promise<string> => {
  const TMP_PATH = "media/tmp";
  mkdirSync(TMP_PATH, { recursive: true });

  const videoTempPath = `${TMP_PATH}/${uuidv4()}.mp4`;
  const outputPath = `${TMP_PATH}/${uuidv4()}.webp`;

  fs.writeFileSync(videoTempPath, data);

  await new Promise<void>((resolve, reject) => {
    ffmpeg(videoTempPath)
      .videoFilters("select=eq(n\\,1.5)")
      .output(outputPath)
      .on("end", () => resolve())
      .on("error", (error) => reject(error))
      .run();
  });

  return outputPath;
};
