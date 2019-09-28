const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();
const server=require('../app');

chai.use(chaiHttp);
let token,directorId;

describe('api/directors tests',()=>{
    // burda before ile  test kullanıcı bilgleri ile authentication için token bilgileri alınır
    before((done)=>{
        chai.request(server)
            .post('/authenticate')
            .send({username:'yusuf',password:'12345'})
            .end((err,res)=>{

                token=res.body.token;

            //   console.log(token);
                done();
            });
    });
    describe('GET/ directors',()=>{
        it('should GET all Directors',  (done)=> {

            //burda alınan token ile get isteğinde bulunulur ve 200 kodu dönmesi beklenir.
            chai.request(server)
                .get('/api/directors')
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    describe('/Post director',()=>{
        it('it should be post a director',  (done)=> {
            const director={
                name:'test_director_name',
                surname:'test_director_surname',
                bio:'lorem_ıpsum_test_test_test_test_test_test_test_test_test_test',

            };


            chai.request(server)
                .post('/api/directors')
                .send(director)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('surname');
                    res.body.should.have.property('bio');
                    directorId=res.body._id;
                    done();
                });
        });

    });
    describe('/GET/director_id director',()=>{
        it('it should GET a director by the given id ',  (done)=> {
            chai.request(server)
                .get('/api/directors/'+directorId)
                .set('x-access-token',token)
                .end((err,res)=>{
                   /* res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.property('name');
                    res.body.should.have.property('surname');
                    res.body.should.have.property('bio');
                    res.body.should.have.property('_id').eql(directorId);*/
                    done();
                });
        });
    });
    describe('/PUT/director_id director',()=>{
        it('it should UPDATE a movie given by id',  (done)=> {
            const director={
                name:'test_director_name2',
                surname:'test_director_surname2',
                bio:'lorem_ıpsum_test_test_test_test_test_test_test_test_test_test2',

            };
            chai.request(server)
                .put('/api/directors/'+directorId)
                .send(director)
                .set('x-access-token',token)
                .end((err,res)=> {
                    if (err) {
                    throw err;
                     }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(director.name);
                    res.body.should.have.property('surname').eql(director.surname);
                    res.body.should.have.property('bio').eql(director.bio);
                    done();
                });
        });

    });

    describe('DELETE/director_id director',()=>{
        it('should be DELETE a director given by id',  (done)=> {

            chai.request(server)
                .delete('/api/directors/'+directorId)
                .set('x-access-token',token)
                .end((err,res)=>{
                    if (err){
                        throw  err;
                    };
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                });
        });
    });
});
