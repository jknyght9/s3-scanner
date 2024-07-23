import { S3Client, ListObjectsV2Command, ListObjectsV2CommandOutput } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-providers';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node index.ts ...');
  process.exit(1);
}

const [AWS_REGION, BUCKET_NAME, PROFILE_NAME] = args;
const client = new S3Client({
  region: AWS_REGION,
  credentials: fromIni({ profile: PROFILE_NAME }),
});

export const listAllObjects = async (bucketName: string, prefix: string = ''): Promise<any[]> => {
  let continuationToken: string | undefined = undefined;
  const allObjects: any[] = [];

  do {
    const response: ListObjectsV2CommandOutput = await client.send(
      new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      }),
    );
    response.Contents?.forEach((obj: any) => {
      if (obj.Key && obj.ETag) {
        allObjects.push(obj);
      }
    });
    continuationToken = response.NextContinuationToken;
  } while (continuationToken);
  return allObjects;
};

export const main = async () => {
  try {
    const objects = await listAllObjects(BUCKET_NAME);
    console.log(objects);
    const filePath = resolve(process.cwd(), 's3_objects.json');
    writeFileSync(filePath, JSON.stringify(objects, null, 2));
    console.log(`Data written to ${filePath}`);
  } catch (errors) {
    console.error('Error:', errors);
  }
};

main();
