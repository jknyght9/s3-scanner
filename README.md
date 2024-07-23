# S3 Scanner

## Description

Scans target S3 bucket for all objects and outputs them to a JSON file. Files have specific functionality:

| Name                | Description                    |
| ------------------- | ------------------------------ |
| s3-scan.ts          | Scans target bucket            |
| convert-json2csv.ts | Converts scan JSON file to CSV |

## Requirements

Must have `node.js` version 20 installed along with the npm or yarn package manager. Once this is installed, run the following command:

```shell
npm install
```

## Usage

To run the scanner, you will need to configure credentials in your AWS CLI profile. This is typically done in `.aws/credentials` and `.aws/config`. It is highly recommended that a profile `PROFILE` is created and used in this scan.

You will also need the target S3 bucket name `S3_BUCKET` (e.g., my-s3-bucket) and the AWS region `AWS_REGION` (e.g., us-east-1). Use all of these variables as arguments in the scan.

```shell
# Using npm
npm run scan -- AWS_REGION S3_BUCKET PROFILE

# Using node
node --loader ts-node/esm s3-scan.ts AWS_REGION S3_BUCKET PROFILE

```

This will output the file `s3_objects.json`.

```shell
# Run converter using npm
npm run convert --

# Run converter using node
node --loader ts-node/esm convert-json2csv.ts
```

## Legal

This software is distributed free of cost and does not provide support or warranty to the end user or developer.
