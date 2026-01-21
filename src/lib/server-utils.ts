"use server";

import ffmpeg from 'fluent-ffmpeg'

const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

import fs, { mkdirSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'



export const videoCoverImage = async (data: Buffer): Promise<string> => {

  if (!ffmpegInstaller.path || !fs.existsSync(ffmpegInstaller.path)) {
    throw new Error(`FFmpeg binary NOT FOUND at ${ffmpegInstaller.path}. Please run 'pnpm install @ffmpeg-installer/ffmpeg' or install ffmpeg manually.`);
  }

  ffmpeg.setFfmpegPath(ffmpegInstaller.path);
  const TMP_PATH = "media/tmp";
  if (!fs.existsSync(TMP_PATH)) mkdirSync(TMP_PATH, { recursive: true });

  const id = uuidv4();
  const videoTempPath = path.join(TMP_PATH, `${id}.mp4`);
  const outputPath = path.join(TMP_PATH, `${id}.webp`);

  fs.writeFileSync(videoTempPath, data);

  try {
    await new Promise<void>((resolve, reject) => {
      ffmpeg(videoTempPath)
        .screenshots({
          timestamps: [0], // Take shot at 0 seconds
          filename: path.basename(outputPath),
          folder: path.dirname(outputPath),
        })
        .on('end', () => resolve())
        .on('error', (err) => reject(err));
    });

    // Optional: Delete the temp video file after frame extraction
    fs.unlinkSync(videoTempPath);
    
    return outputPath;
  } catch (error) {
    console.error("Thumbnail generation failed:", error);
    throw error;
  }
};