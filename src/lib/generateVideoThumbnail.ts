import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import path from "path";
import fs from "fs";

ffmpeg.setFfmpegPath(ffmpegPath!);

export async function generateVideoThumbnail(
  videoPath: string,
  outputPath: string
) {
  return new Promise<void>((resolve, reject) => {
    ffmpeg(videoPath)
      .screenshots({
        timestamps: ["1"],
        filename: path.basename(outputPath),
        folder: path.dirname(outputPath),
        size: "1280x720",
      })
      .on("end", () => resolve())
      .on("error", reject);
  });
}
