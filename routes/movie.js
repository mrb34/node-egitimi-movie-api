const express = require('express');
const router = express.Router();
//Models
const Movie=require('../Models/Movie');

////////////////////LIST ALL METHOD///////////////////////////////////////////////
router.get('/',(req,res)=>{
const promise=Movie.aggregate([
  {
    $lookup:{
      from:'directors',
      localField:'director_id',
      foreignField:'_id',
      as:'director'
    }
  }
  ,
  {
    $unwind:'$director'
  }
]);
promise.then((data)=>{
  res.json(data);
}).catch((err)=>{
  res.json(err);
})
});
//////////////////////TOP10//////////////////////////////////////////
router.get('/top10',(req,res)=>{
  const promise=Movie.find({ }).limit(10).sort({imdb_score:-1});
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);

  })
});
////////////////////BETWEEN////////////////////////////////////
router.get('/between/:start_year/:end_year',(req,res)=>{
  const {start_year,end_year}=req.params;
  const promise=Movie.find({
    year:{"$gte":parseInt(start_year),"$lte":parseInt(end_year)}
    //gte great and equal
    //lte little and equal
    //gt great
    //lt little

  });
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
});
///////////////////////////UPDATE METHOD///////////////////////////////////////
router.put('/:movie_id',(req,res,next)=>{
  const  promise=Movie.findByIdAndUpdate(
      req.params.movie_id,
      req.body,
      {
        new:true
      }
);
  promise.then((movie)=>{
    if (!movie){
      next({message:'The movie was not found',code:2});
    }else {
      res.json(movie);
     // res.json({status:1});
    };
  }).catch((err)=>{
    res.json(err);
  });
});
////////////////////////LİST WITH ID METHOD//////////////////////////////////////////////

router.get('/:movie_id',(req,res,next)=>{
  const  promise=Movie.findById(req.params.movie_id);
  promise.then((movie)=>{
    if (!movie){
      next({message:'The movie was not found',code:1});
    }else {
      res.json(movie);
    };
  }).catch((err)=>{
    res.json(err);
  });
});

////////////////ADD METHOD//////////////////////////////////
router.post('/', (req, res, next)=> {
  //const {title,imdb_score,category,country,year}=req.body;
/*  const movie=new Movie({
    title:title,
    imdb_score:imdb_score,
    category:category,
    country:country,
    year:year
  });
  */

  const movie=new Movie(req.body);
/*  movie.save((err,data)=>{
    if (err)
      res.json(err);
   // res.json(data);
    res.json(data); //res.json({status:1});
  });*/
const promise=movie.save();
promise.then((data)=>{
 // res.json({status:1});
  res.json(data);
}).catch((err)=>{
  res.json(err);
});

});
//////////////////DELETE METHOD//////////////////////////////////////////

router.delete('/:movie_id',(req,res,next)=>{
  const  promise=Movie.findByIdAndRemove(req.params.movie_id);
  promise.then((movie)=>{
    if (!movie){
      next({message:'The movie was not found',code:3});
    }else {
      res.json(movie);
      // res.json({status:1});
    };
  }).catch((err)=>{
    res.json(err);
  });
});



module.exports = router;
