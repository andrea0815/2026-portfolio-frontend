export const MimeType = {
  video: "video/mp4",
  image: "image/jpeg",
  gif: "image/gif",
} as const

export type MimeType = typeof MimeType[keyof typeof MimeType]