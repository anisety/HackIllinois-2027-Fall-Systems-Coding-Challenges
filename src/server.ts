import a from "./app";

const port = 3000;

a.listen(port, () => {
  console.log(`App ok on port ${port}`);
});
