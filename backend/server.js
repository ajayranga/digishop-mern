import app from './app.js';

const port = process.env.PORT || 5000;
app.listen(port, () =>
   console.log(
      `Backend running in ${process.env.NODE_ENV} environment on port ${port}`
   )
);
