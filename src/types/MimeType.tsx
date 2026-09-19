export const MimeType = {
  video: "video/mp4",
  webm: "video/webm",
  image: "image/jpeg",
  gif: "image/gif",
} as const

export type MimeType = typeof MimeType[keyof typeof MimeType]