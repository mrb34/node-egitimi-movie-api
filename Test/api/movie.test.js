const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();
const server=require('../../app');

chai.use(chaiHttp);
let token;

describe('api/movies tests',()=>{
    // burda before ile  test kullnıcı bilgleri ile authentication için token bilgileri alınır
before((done)=>{
    chai.request(server)
        .post('/authenticate')
        .send({username:'yusuf',password:'12345'})
        .end((err,res)=>{
        token=res.body.token;

        done();
        });

});
describe('GET/ movies',()=>{
    it('it should GET all movies',(done)=>{
        //burda alınan token ile get isteğinde bulunulur ve 200 kodu dönmesi beklenir.
        chai.request(server)
            .get('/api/movies')
            .set('x-access-token',token)
            .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
            });
    });
})

});

