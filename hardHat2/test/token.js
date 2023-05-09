const { expect } = require("chai");
//this test filr we use moucha hooks
//chai library ke function ki links 
//https://ethereum-waffle.readthedocs.io/en/latest/matchers.html
describe("Token Contract", function(){
    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;
    //beforeEach ek kkok hai jo moucha framework provide karta hai
    //iska kaam ye hoga ke hum koi bhi test run kiya jaise hume 4 test run kiye to beforeEch ke ander ki line run kar jayegi isse ye hoka hum koi bhi test likenge to hume ye line baar baar nahilikhna padegi
    beforeEach(async function () {
        Token = await ethers.getContractFactory("Token");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        hardhatToken=await Token.deploy();
    })
    describe("Deployment", function () {
        //is it me hum ye check karenge ke jo constructor(Token.sol) me hum owner set kar rahe hai wo sahi se set ho raha hai ke nahi
        it("should set the right owner", async function () {
            expect(await hardhatToken.owner()).to.equal(owner.address);
        })
        it("should assign the total supply of tokens to the owner", async function () {
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        })
    })

    describe("Transaction", function () {
         it("Should transfer tokens between accounts",async function(){
            //owner ke account se addr1.address ko transfer ho raha hai
            await hardhatToken.transfer(addr1.address,5);
            //ab hum check karenge ke 5 token owner ke acc se addr1 ke acc me transfer hue hai ke nahi
            const addr1Balance=await hardhatToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(5);

            await hardhatToken.connect(addr1).transfer(addr2.address,5);
            const addr2Balance=await hardhatToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(5);
         });

         it("SHould fail if sender doesnt have enough token",async function(){
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);//jo ki hai 10000
            //initially addr1 ke pass hai 0 token bcoz totalSupply owner ke pass hai
            //jo jab hum ye transfer initae karenge to transfer function call hoga jisme require balance ki condition lagi hui hai
            //joki fail hogi so wo return karega uska message jo ki hoga "not have enough token" vo apne revert se match karke  is await ko true kar dega
            //phir apan next line pr jayenge or hum check karege ki owner ke pass ko intial balance tha vo hai ke nahi
            await expect (hardhatToken.connect(addr1).transfer(owner.address,1)).to.be.revertedWith("not have enough token");
            expect (await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
         });

         it("Should update balances after transaction",async function(){
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await hardhatToken.transfer(addr1.address,5);
            await hardhatToken.transfer(addr2.address,10);

            const finalOwnerBalance=await hardhatToken.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance-15);

            const addr1Balance =await hardhatToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(5);

            const addr2Balance =await hardhatToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(10);
         })

    })

})
