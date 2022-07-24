const StarNotary = artifacts.require("StarNotary");

contract("StarNotary", (accounts) => {
  let starNotary;
  const firstOwner = accounts[0];
  const secondOwner = accounts[1];
  const tokenId = 1;
  const tokenId2 = 2;

  before(async () => {
    starNotary = await StarNotary.deployed();
  });

  describe("Testing the basic actions to ERC721", () => {
    it("can add the star name and star symbol properly", async () => {
      const tokenName = await starNotary.name();
      assert.equal(tokenName, "StarNotary", "Token name should be StarNotary");

      const tokenSymbol = await starNotary.symbol();
      assert.equal(tokenSymbol, "STN", "Token symbol should be STN");
    });

    before(async () => {
      await starNotary.createStar("Block Star", tokenId, { from: firstOwner });
      await starNotary.createStar("Block Star2", tokenId2, {
        from: secondOwner,
      });
    });

    it("Mint a Star - Account is Owner", async () => {
      const isOwner = await starNotary.ownerOf(tokenId);
      assert.equal(isOwner, firstOwner, "Account is owner of the Star");
    });

    it("Star is minted with right name", async () => {
      const starName = await starNotary.lookUptokenIdToStarInfo(tokenId);
      assert.equal(starName, "Block Star", "Star name should be Block Star");
    });

    it("lets 2 users exchange stars", async () => {
      try {
        await starNotary.exchangeStars(tokenId, tokenId2, { from: firstOwner });
        const ownerOfToken1 = await starNotary.ownerOf(tokenId);
        const ownerOfToken2 = await starNotary.ownerOf(tokenId2);

        assert.equal(
          ownerOfToken1,
          secondOwner,
          "TokenId2 owner should be SecondAccount"
        );
        assert.equal(
          ownerOfToken2,
          firstOwner,
          "TokenId owner should be FirstAccount"
        );
      } catch (error) {
        assert.equal(1, 2, error);
      }
    });

    it("lets a user transfer a star", async () => {
      try {
        await starNotary.transferStar(firstOwner, tokenId, {
          from: secondOwner,
        });
        const ownerOfToken = await starNotary.ownerOf(tokenId);

        assert.equal(
          ownerOfToken,
          firstOwner,
          "TokenId owner should be FirstAccount"
        );
      } catch (error) {
        assert.equal(1, 2, error);
      }
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
        assert.equal(1, 2, "Account should not buy a Token under the 50");
      } catch (error) {
        assert.equal(1, 1, error);
      }
    });

    it("Buying using the right amount", async () => {
      //set the parameters
      let starId = 3;
      let starPrice = web3.utils.toWei(".01", "ether");
      let balance = web3.utils.toWei(".05", "ether");

      //create and put up for sale
      await starNotary.createStar("awesome star", starId, { from: firstOwner });
      await starNotary.putStarUpForSale(starId, starPrice, {
        from: firstOwner,
      });

      //perform the transactions
      let balanceOffirstOwnerBeforeTransaction = await web3.eth.getBalance(
        firstOwner
      );
      await starNotary.buyStar(starId, { from: secondOwner, value: balance });
      let balanceOffirstOwnerAfterTransaction = await web3.eth.getBalance(
        firstOwner
      );

      //validate
      let value1 =
        Number(balanceOffirstOwnerBeforeTransaction) + Number(starPrice);
      let value2 = Number(balanceOffirstOwnerAfterTransaction);
      assert.equal(value1, value2);
    });
  });
});
