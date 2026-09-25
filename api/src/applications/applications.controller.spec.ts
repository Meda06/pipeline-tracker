import { ApplicationsController } from "./applications.controller";

const prism ={
    application:{
        create: jest.fn()
    }
}

describe('ApplicationsController', ()=>{
    let controller: ApplicationsController;

    describe('create', () => {
        it('creates a new row', async() => {
            const created = { id: 'a1'}
        })
    })
})