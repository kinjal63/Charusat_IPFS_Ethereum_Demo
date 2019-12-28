const Meme = artifacts.require('Meme');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Meme', (accounts) => {
    let meme = undefined;
    const account = accounts[0];
    
    describe('deploy', async () => {
        it('deployed successfully', async () => {
            meme = await Meme.deployed();
            
            const account = meme.address;
            console.log(account);
            assert.notEqual(account, 0x0);
            assert.notEqual(account, undefined);
            assert.notEqual(account, null);
            assert.notEqual(account, '');
            console.log('test case is passed');
        })

        it('store hash', async () => {
            meme = await Meme.deployed();
            const memeHash = 'abc123';
            await meme.set(memeHash);
            assert.equal(await meme.get(), memeHash);
        })
    })
})
