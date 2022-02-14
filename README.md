
# Web3Love

# Send message flow
1. Upload drawing to IPFS
2. Create JSON metadata of the NFT including: message as metadata "message" property, IPFS URL of the drawing JPEG, some name.
3. Upload the JSON metadata to IPFS
4. Call the mint function with the current address as caller and the IPFS JSON metadata link as tokenUri.

# Todo
- Finish postcard and set it as background for the canvas. Somehow restrict the area that the user can draw on.
