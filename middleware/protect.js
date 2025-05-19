function verifytoken(req, res, next){
    const token = req.headers['authization'];
if(!token){
    return res.status(403).send('no token');
}
try{
    const decoded = jwt.verify(token,'123456');
    req.user = decoded;
} catch (err){
    return res.status(401).send('invälid token');
}
return next();
}

app.use(session({
    secret: uuidv4(),
    resave: 'false',
    saveUninitialized: true,
    httpOnly: true,
    sameSite: 'strict',
    cookie: { maxAge: 60 * 1000}
  }));
  
  app.use((req,res,next) =>{
    req.session.activityTimestamp = Date.now();
    next()
  });
  
  app.use((req,res,next) =>{
    const now = Date.now();
    if(req.session.activityTimestamp && (now - req.session.activityTimestamp > 60*1000)){
      req.session.destroy((err)=>{
        if(err){
          return next(err);
        }
        return res.status(403).send('session expired')
      })
    } else {
      next();
    }
  })

  if(!req.session.activiyTimestamp){
    req.session.activiyTimestamp = Däte.now();
}

