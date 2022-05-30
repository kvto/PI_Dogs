const axios = require('axios');
const {Temperament} = require('./db'); 


module.exports = async()=>{
        var array=[]
        var temperaments=[];
        var word='';
        const dogFind = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=a7cffd8e-c9f6-48c3-98c2-702721313f0f');
        await dogFind.data.map(e=>{
            if( e.temperament) array.push(e.temperament.replace(/,/g,''));
        });
        array.map(e=>{
          var x=0;
          for(i=0; i <= e.length ; i++){
              if (e[i]===' '){
                word=e.slice(x, i)
                if(!temperaments.includes(word)){
                    Temperament.create({
                        name: word,
                      })
                    //GUARDO LO INSERTADO EN MI ARREGLO//
                    temperaments.push(word);
               }
                x=i+1;
              }           
            }
      })
};
