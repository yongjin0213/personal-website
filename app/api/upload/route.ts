import { NextResponse, NextRequest } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const publicBaseUrl = process.env.AWS_PUBLIC_URL;

if (!bucketName || !publicBaseUrl) {
  throw new Error("AWS_S3_BUCKET or AWS_S3_PUBLIC_URL is not set");
}

const normalizedPublicBaseUrl = publicBaseUrl.replace(/\/$/, "");

type UploadRequest = {
  fileName: string;
  contentType: string;
  folder?: string;
};

export async function POST( request: NextRequest ) {
    const payload = await request.json()
    const key = uuidv4();

    if (!payload?.contentType){
        return NextResponse.json(
            { error: "contentType is required" },
            { status: 400 }
        );
    }
    
    const client = new S3Client({ region: region });
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        ContentType: payload.contentType
    });

    const uploadUrl = await getSignedUrl(client, command, { expiresIn: 60 });
    const publicUrl = `${normalizedPublicBaseUrl}/${key}`;

    return NextResponse.json({ uploadUrl, publicUrl });
}