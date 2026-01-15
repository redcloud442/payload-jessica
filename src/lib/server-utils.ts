import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";

// Set FFmpeg path for local development
if (ffmpegStatic) {
  ffmpeg.setFfmpegPath(ffmpegStatic);
}

export async function extractFirstFrame(
  inputPath: string,
  outputPath: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    ffmpeg()
      .input(inputPath)
      .videoFilters("select=eq(n\\,0)") // Select first frame
      .frames(1) // Only extract 1 frame
      .output(outputPath)
      .outputOptions(["-q:v", "2"]) // High quality
      .on("end", () => {
        console.log("Thumbnail generated successfully");
        resolve();
      })
      .on("error", (err) => {
        console.error("FFmpeg Error:", err);
        reject(err);
      })
      .run();
  });
}
