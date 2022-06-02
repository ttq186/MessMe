import { BlobServiceClient } from '@azure/storage-blob';

const containerName = process.env.REACT_APP_CONTAINER_NAME;
const sasToken = process.env.REACT_APP_STORAGE_SAS_TOKEN;
const storageAccountName = process.env.REACT_APP_STORAGE_RESOURCE_NAME;

const createBlobInContainer = async (containerClient, file) => {
  const fileNameSplit = file.name.split('.');
  const blobNameAfterUploading = `${fileNameSplit[0]}-${file.size}.${fileNameSplit[1]}`;

  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(blobNameAfterUploading);
  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };
  // upload file
  await blobClient.uploadData(file, options);
  const blobUrl = blobClient.url?.split('?')[0];
  return blobUrl;
};

export const uploadFileToBlob = async (file) => {
  if (!file) return [];
  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );
  // get Container - full public read access
  const containerClient = blobService.getContainerClient(containerName);
  // upload file
  const blobUrl = await createBlobInContainer(containerClient, file);
  return blobUrl;
};
