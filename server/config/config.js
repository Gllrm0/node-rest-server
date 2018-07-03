

// Puerto 
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDb 

if ( process.env.NODE_ENV === 'dev' ) {
    urlDb = 'mongodb://localhost:27017/cafe';
} else {
    urlDb = 'mongodb://gllrm:andr3519@ds125871.mlab.com:25871/cafe-gllrm';
}

process.env.urlDB = urlDb