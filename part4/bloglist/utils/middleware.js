const logger = require('./logger');
const jwt = require('jsonwebtoken');


const reqLogger = (req, res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'});
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);
  if (error.name === 'CastError') {
    return res.status(400).send({error: 'malformatted id'});
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({error: error.message});
  }else if (error.name ==='JsonWebTokenError') { 
    return res.status(401).json({error: error.message});
  }

  next(error);
};

const tokenHandler = (req,res,next) => {
  const authorization = req.get('authorization');
  if(authorization && authorization.toLowerCase().startsWith('bearer')){
    req.token = authorization.substring(7);
    console.log
  }
  next();
}

const userHandler = (req, res, next) => {
  const token = req.token;
  const decodedToken = jwt.verify(token,process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  req.user = decodedToken.id;
  next();
};

module.exports = {
  reqLogger,
  unknownEndpoint,
  errorHandler,
  tokenHandler,
  userHandler,
};
