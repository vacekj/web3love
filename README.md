
# Hello World

# Send message flow
1. Upload drawing to IPFS
2. Create JSON metadata of the NFT including: message as metadata "message" property, IPFS URL of the drawing JPEG, some name.
3. Upload the JSON metadata to IPFS
4. Call the mint function with the current address as caller and the IPFS JSON metadata link as tokenUri.

# Receive and display messages.
1. Get all NFTs of user belonging to a contract. 
2. Decrypt the messages.


## Contribute

### Commit message format
Git commit messages must follow the following format otherwise they won't be accepted:  

`git commit -m: <type><message body>`
### Possible types:
feat,
fix,
docs,
chore,
style,
refactor,
ci,
test,
perf,
revert,
vercel,
wip
