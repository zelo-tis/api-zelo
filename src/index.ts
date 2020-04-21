import App from './app';

const port = process.env.PORT || 3000;

App.listen(port, () => {
  console.warn(`App listening on port ${port}`);
});
