const input = document.getElementsByClassName("search-input")[0];
const submitBtn = document.getElementsByClassName("search-btn")[0];
const recipeWrapper = document.getElementsByClassName("recipe-wrapper")[0];
console.log(submitBtn);

submitBtn.addEventListener("click", getData);

let accessPoint =
  "https://api.edamam.com/api/recipes/v2?type=public&app_id=fc51bed8&app_key=824f531904f7233c3adfdd524a1bc774";

let max = 0;
let recipes = {
  name: [],
  link: [],
  img: [],
};

async function getData() {
  try {
    recipeWrapper.innerHTML = "";
    recipes.img = [];
    recipes.name = [];
    recipes.link = [];
    let response = await fetch(accessPoint + "&q=" + input.value);
    let data = await response.json();
    console.log(data);
    let recipeArray = data["hits"];
    for (let i = 0; i < 6; i++) {
      recipes["name"].push(recipeArray[i]["recipe"].label);
      recipes["link"].push(recipeArray[i]["recipe"].url);
      recipes["img"].push(recipeArray[i]["recipe"]["image"]);
    }
    createRecipe();
  } catch (e) {
    console.log(e);
  }
}

function createRecipe() {
  for (var i = 0; i < recipes["name"].length; i++) {
    const recipeContainer = document.createElement("div");
    const recipeImg = document.createElement("img");
    const recipeTitle = document.createElement("h6");
    const recipeLink = document.createElement("a");

    recipeTitle.innerHTML = recipes["name"][i];
    recipeImg.src = recipes["img"][i];
    recipeLink.innerHTML = "See the recipe ";
    recipeLink.href = recipes["link"][i];

    recipeContainer.classList.add("recipe-container");
    recipeContainer.classList.add("flex");
    recipeImg.classList.add("recipe-img");
    recipeLink.classList.add("read-recipe");
    recipeContainer.appendChild(recipeImg);
    recipeContainer.appendChild(recipeTitle);
    recipeContainer.appendChild(recipeLink);
    recipeWrapper.appendChild(recipeContainer);
  }
}
