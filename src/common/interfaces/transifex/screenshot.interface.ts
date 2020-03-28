export interface ScreenshotUpload {
  name?: string;
  screenshot: Buffer;
}

export interface ScreenshotMapping {
  source_string_hash: string;
  resource_slug: string;
}
