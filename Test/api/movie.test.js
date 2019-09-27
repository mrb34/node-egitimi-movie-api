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
});
describe('/Posr movie',()=>{
    it('it should be post a movie',  (done)=> {
        const movie={
           title:'udemy',
           director_id:'5d8a5d25a27d4649a8d303e3',
            category:'komedi',
            country:'türkiye',
            year:1950,
            imdb_score:6

        };
    chai.request(server)
        .post('/api/movies')
        .send(movie)
        .set('x-access-token',token)
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title');
            res.body.should.have.property('director_id');
            res.body.should.have.property('category');
            res.body.should.have.property('country');
            res.body.should.have.property('year');
            res.body.should.have.property('imdb_score');

            done();
        });
    });

});

});

