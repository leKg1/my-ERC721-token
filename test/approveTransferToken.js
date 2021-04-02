const AgkPicToken = artifacts.require("AgkPicToken");

contract("Test approval", async accounts => {
    it("should account[0] mints 2 tokens, account[0] transfer token to account[1] then account[1] approves account[0] to transfer his token", async () => {
        const nft = await AgkPicToken.deployed()

        await nft.mintToken(accounts[0], "ipfs://QmaQMDc5pYbFysstZzaP3whru6TSU4cmTfrbZdsXfRTLQa")
        await nft.mintToken(accounts[0], "ipfs://QmXtNwum82j7NrESmsfCwcmR1R2jhCEEULBuEieMSpM2Vd")

        const ownerOfToken_1 = await nft.ownerOf(1)
        console.log("ownerOfToken_1", ownerOfToken_1)
        const ownerOfToken_2 = await nft.ownerOf(2)
        console.log("ownerOfToken_2", ownerOfToken_2)
        
        await nft.transferFrom(accounts[0], accounts[1], 2)
        const newOwnerOfToken_2 = await nft.ownerOf(2)
        assert.equal(newOwnerOfToken_2, accounts[1])
        
        const approvedAccOfToken2 = await nft.getApproved(2)
        console.log("approvedAccOfToken2: ",approvedAccOfToken2)
        await nft.approve(accounts[0], 2, {from: accounts[1]})
        await nft.transferFrom(accounts[1], accounts[0], 2)
        const lastOwnerOfToken_2 = await nft.ownerOf(2)
        assert.equal(lastOwnerOfToken_2, accounts[0])
    })
})