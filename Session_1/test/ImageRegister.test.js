const ImageRegister = artifacts.require('ImageRegister');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('ImageRegister', (accounts) => {
    let image = undefined;
    const account = accounts[0];

    describe('deployment', async () => {
        it('deployement successfully', async () => {
            image = await ImageRegister.deployed();
            console.log(image.address);

            const address = image.address;

            assert.notEqual(address, '');
            assert.notEqual(address, undefined);
            assert.notEqual(address, null);
        })

        it('uploadImage', async () => {
            image = await ImageRegister.deployed();
            const isSuccess = await image.uploadImage('description 1', 'title 1', 'abc123', {from: '0x6F3E0E9277FfefA8Fdd5CA99181bD0bD900276d4'});
            const count = await image.getImageCount('0x6F3E0E9277FfefA8Fdd5CA99181bD0bD900276d4');
            assert.equal(count, 2);
            // assert.equal(isSuccess, true);

        })
    })
})