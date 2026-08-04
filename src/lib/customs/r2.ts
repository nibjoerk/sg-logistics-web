import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} missing`);
  return v;
}

export function getR2Client(): S3Client {
  const accountId = requireEnv("R2_ACCOUNT_ID");
  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
      secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
    },
  });
}

export function getR2Bucket(): string {
  return requireEnv("R2_BUCKET_NAME");
}

export function isR2Configured(): boolean {
  return Boolean(
    process.env.R2_ACCOUNT_ID &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_BUCKET_NAME,
  );
}

export async function getR2ObjectStream(key: string): Promise<ReadableStream | null> {
  const client = getR2Client();
  const out = await client.send(
    new GetObjectCommand({
      Bucket: getR2Bucket(),
      Key: key,
    }),
  );
  if (!out.Body) return null;
  if (typeof (out.Body as { transformToWebStream?: () => ReadableStream }).transformToWebStream === "function") {
    return (out.Body as { transformToWebStream: () => ReadableStream }).transformToWebStream();
  }
  return out.Body as unknown as ReadableStream;
}

export async function deleteR2Object(key: string): Promise<void> {
  const client = getR2Client();
  await client.send(
    new DeleteObjectCommand({
      Bucket: getR2Bucket(),
      Key: key,
    }),
  );
}

export async function deleteR2Objects(keys: string[]): Promise<void> {
  const unique = [...new Set(keys.map((k) => k.trim()).filter(Boolean))];
  if (!unique.length) return;
  const client = getR2Client();
  const bucket = getR2Bucket();
  for (let i = 0; i < unique.length; i += 1000) {
    const chunk = unique.slice(i, i + 1000);
    await client.send(
      new DeleteObjectsCommand({
        Bucket: bucket,
        Delete: {
          Objects: chunk.map((Key) => ({ Key })),
          Quiet: true,
        },
      }),
    );
  }
}

export async function putR2Object(
  key: string,
  body: Buffer,
  contentType = "application/pdf",
): Promise<{ key: string; url: string }> {
  const client = getR2Client();
  const bucket = getR2Bucket();
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
  return {
    key,
    url: `r2://${bucket}/${key}`,
  };
}

export async function headR2Object(key: string): Promise<{ key: string; size?: number } | null> {
  try {
    const client = getR2Client();
    const out = await client.send(
      new HeadObjectCommand({
        Bucket: getR2Bucket(),
        Key: key,
      }),
    );
    return { key, size: out.ContentLength };
  } catch (err) {
    const status = (err as { $metadata?: { httpStatusCode?: number } })?.$metadata?.httpStatusCode;
    if (status === 404) return null;
    throw err;
  }
}
