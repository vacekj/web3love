# Web3Love

# Send message flow

1. Upload card image to IPFS
2. Create JSON metadata of the NFT including: message as metadata "message" property, IPFS URL of the card image JPEG, some name, date, and type - has to conform to OpenSea metadata standard
3. Upload the JSON metadata to IPFS
4. Call the mint function on frontend with the current address as caller and the IPFS JSON metadata link as tokenUri.
5. Backend verifies that the signed transaction is OK and publishes it, returning the status.
