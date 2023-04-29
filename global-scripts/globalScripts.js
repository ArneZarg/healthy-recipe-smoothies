export function extractData(data) {
  data = data.replace(/\n/g, "");
  data = data.replace(/"/g, ""); // removes double quotes
  data = data.replace(/`/g, '"');
  data = data.split("<!--Recipe-JSON-Start-->");
  data = data[1];
  data = data.split("<!--Recipe-JSON-End-->");
  data = data[0];
  data = data.replace(/<script[^>]*>/gi, "").replace(/<\/script>/gi, "");
  data = data.split("var recipeArticlesJSON =");
  data = data[1];
  console.log("data: ", data);
  data = JSON.parse(data);
  return data;
}
