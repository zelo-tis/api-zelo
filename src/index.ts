import App from './app';

const port = process.env.PORT || 8080;

App.listen(port, () => {
  console.warn(`App listening on port ${port}`);
});
