const { assert } = require('chai');

const BNFToken = artifacts.require("BNFToken");
const BrandNewSwap = artifacts.require("BrandNewSwap");

require('chai').use(require('chai-as-promised')).should()

function tokens(n){
    return web3.utils.toWei(n, 'ether')
}

contract('BrandNewSwap', ([deployer, investor]) => {
    let token, swap

    before(async() => {
        token = await BNFToken.new()
        swap = await BrandNewSwap.new(token.address)

        await token.transfer(swap.address, tokens('1000000'))
    })

    describe('BrandNewSwap deployment', async () => {
        it('contract has a name', async() => {
            const name = await token.name()
            assert.equal(name, 'Brand New Flavor Token')
        })
    })

    describe('BrandNewSwap deployment', async () => {
        it('contract has a name', async() => {
            const name = await swap.name()
            assert.equal(name, 'Brand New Swap')
        })

        it('contract has tokens', async() => {
            let balance = await token.balanceOf(swap.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })

    describe('buyTokens()', async() => {
        let result

        before(async() => {
            //Purchase tokens before each test
            result = await swap.buyTokens({from: investor, value: web3.utils.toWei('1', 'ether')})
        
        })
        it('Allows user to purchase tokens from the swap', async() => {
            //Check investor balance after purchase
            let investorBalance = await token.balanceOf(investor)
            assert.equal(investorBalance.toString(), tokens('100'))

            //Check the swap balance
            let swapBalance 
            swapBalance = await token.balanceOf(swap.address)
            assert.equal(swapBalance.toString(), tokens('999900'))
            swapBalance = await web3.eth.getBalance(swap.address)
            assert.equal(swapBalance.toString(), web3.utils.toWei('1', 'ether'))

            // Check event
            const event = result.logs[0].args
            assert.equal(event.account, investor)
            assert.equal(event.token, token.address)
            assert.equal(event.amount.toString(), tokens('100').toString())
            assert.equal(event.rate.toString(), '100')

        })
    })

    describe('sellTokens()', async() => {
        let result

        before(async() => {
            await token.approve(swap.address, tokens('100'), {from: investor})
            result = await swap.sellTokens(tokens('100'), {from: investor})
        })
        it('Allows user to sells tokens to the swap', async() => {
            // Check balance of investor and deployer
            let swapBalance 
            swapBalance = await token.balanceOf(swap.address)
            assert.equal(swapBalance.toString(), tokens('1000000'))
            swapBalance = await web3.eth.getBalance(swap.address)
            assert.equal(swapBalance.toString(), web3.utils.toWei('0', 'ether'))
        
            // Check event
            const event = result.logs[0].args
            assert.equal(event.account, investor)
            assert.equal(event.token, token.address)
            assert.equal(event.amount.toString(), tokens('100').toString())
            assert.equal(event.rate.toString(), '100')

            // FAIL: Investor can't sell more tokens than they have
            await swap.sellTokens(tokens('500'), {from: investor}).should.be.rejected
        })
    })
})