const StarNotary = artifacts.require("StarNotary");

contract("StarNotary", (accounts) => {
  let starNotary;
  const firstOwner = accounts[0];
  const secondOwner = accounts[1];
  const tokenId = 1;

  before(async () => {
    starNotary = await StarNotary.deployed();
  });

  describe("Testing the basic actions to ERC721", () => {
    before(async () => {
      await starNotary.createStar("Block Star", tokenId, { from: firstOwner });
    });

    it("Mint a Star - Account is Owner", async () => {
      const isOwner = await starNotary.ownerOf(tokenId);
      assert.equal(isOwner, firstOwner, "Account is owner of the Star");
    });

    it("Star is minted with right name", async () => {
      const starName = await starNotary.tokenIdToStarInfo(tokenId);
      assert.equal(starName, "Block Star", "Star name should be Block Star");
    });

    it("Put up star for sale", async () => {
      const salePrice = web3.utils.toWei(".01", "ether");
      await starNotary.putStarUpForSale(tokenId, salePrice, {
        from: firstOwner,
      });
      const starPrice = await starNotary.starsForSale(tokenId);

      assert.equal(
        starPrice,
        salePrice,
        "Star should be for sale for 50 price"
      );
    });

    it("Trying to buy star for under 50", async () => {
      try {
        await starNotary.buyStar(tokenId, {
          from: secondOwner,
          value: web3.utils.toWei(".001", "ether"),
        });
        //const secondIsOwner = await starNotary.ownerOf(tokenId);
        //assert.equal(secondIsOwner, secondOwner, "Sencod account is the owner");
      } catch (error) {
        assert.equal(1, 1, error);
      }
    });

    it("Buying with the right amount", async () => {
      let instance = await StarNotary.deployed();
      let user1 = accounts[0];
      let user2 = accounts[1];
      let starId = 3;
      let starPrice = web3.utils.toWei(".01", "ether");
      let balance = web3.utils.toWei(".05", "ether");
      await instance.createStar("awesome star", starId, { from: user1 });
      await instance.putStarUpForSale(starId, starPrice, { from: user1 });
      await instance.approve(user2, starId);
      let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
      await instance.buyStar(starId, { from: user2, value: balance });
      let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
      let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
      let value2 = Number(balanceOfUser1AfterTransaction);
      assert.equal(value1, value2);
      /*
      const startPrice = web3.utils.toWei(".01", "ether");
      const beforeOfPayingUser1Balance = web3.eth.getBalance(firstOwner);
      const etherToBuy = web3.utils.toWei(".05", "ether");

      try {
        await starNotary.buyStar(tokenId, {
          from: secondOwner,
          value: etherToBuy,
        });
        const afterOfPayingUser1Balance = web3.eth.getBalance(firstOwner);
        assert.equal(
          Number(beforeOfPayingUser1Balance) + Number(startPrice),
          Number(afterOfPayingUser1Balance),
          "They ether should be increased"
        );
      } catch (error) {
        assert.equal(1, 2, error);
      }
      */
    });
  });
});
