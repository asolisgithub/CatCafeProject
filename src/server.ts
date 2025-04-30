import app from "./app";
const port = 3000;
app.listen(port, () => {
  console.log(`🐱 Cat Café API is running at http://localhost:${port}`);
  console.log(
    `📜 API documentation available at http://localhost:${port}/api-docs`
  );
  console.log(
    `📄 Swagger JSON available at http://localhost:${port}/swagger.json`
  );
});
