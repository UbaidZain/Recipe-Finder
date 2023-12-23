const input = document.getElementsByClassName("search-input")[0];
const submitBtn = document.getElementsByClassName("search-btn")[0];
const recipeWrapper = document.getElementsByClassName("recipe-wrapper")[0];
const ring = Array.from(document.getElementsByClassName("lds-ring-div"));
const loadMore = document.getElementsByClassName("load-more")[0];
submitBtn.addEventListener("click", loadData);
let max = 6;
let recipes = [];

loadMore.addEventListener("click", loadMoreToggle);

async function loadData() {
  recipes = [];
  recipeWrapper.innerHTML = "";
  max = 6;
  try {
    animate();
    let response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=fc51bed8&app_key=824f531904f7233c3adfdd524a1bc774&q=${input.value}`
    );

    let data = await response.json();
    let recipeArray = data["hits"];
    for (let i = 0; i < max; i++) {
      if (recipeArray[i] !== undefined) {
        let object = {};
        object.name = recipeArray[i]["recipe"].label;
        object.link = recipeArray[i]["recipe"].url;
        object.img = recipeArray[i]["recipe"].image;

        recipes.push(object);
      }
    }
  } catch (e) {
    console.log(e);
  }
  createRecipe();
  enterData();
}

function createRecipe() {
  animate();
  for (var i = 0; i < max; i++) {
    const recipeContainer = document.createElement("div");
    const recipeImg = document.createElement("img");
    const recipeTitle = document.createElement("h6");
    const recipeLink = document.createElement("a");
    recipeContainer.classList.add("recipe-container");
    recipeContainer.classList.add("flex");
    recipeImg.classList.add("recipe-img");
    recipeTitle.classList.add("skeleton");
    recipeTitle.classList.add("recipe-title");
    recipeTitle.classList.add("skeleton-txt");
    recipeImg.classList.add("skeleton");
    recipeLink.classList.add("read-recipe");
    recipeLink.classList.add("skeleton");
    recipeLink.classList.add("skeleton-txt");
    recipeContainer.appendChild(recipeImg);
    recipeContainer.appendChild(recipeTitle);
    recipeContainer.appendChild(recipeLink);
    recipeWrapper.appendChild(recipeContainer);
  }
}

function animate() {
  ring.forEach((ring) => {
    ring.classList.toggle("is-active");
  });
}
function loadToggle() {
  loadMore.classList.toggle("is-active");
}
function enterData() {
  const recipeImg = Array.from(document.getElementsByClassName("recipe-img"));
  const recipeTitle = Array.from(
    document.getElementsByClassName("recipe-title")
  );
  const recipeLink = Array.from(document.getElementsByClassName("read-recipe"));
  for (let i = 0; i < recipeTitle.length; i++) {
    recipeTitle[i].classList.remove("skeleton");
    recipeTitle[i].classList.remove("skeleton-txt");
    recipeTitle[i].innerHTML = recipes[i].name;
    recipeImg[i].src = recipes[i].img;
    recipeLink[i].classList.remove("skeleton");
    recipeLink[i].classList.remove("skeleton-txt");
    recipeLink[i].innerHTML = "See the recipe ";
    recipeLink[i].href = recipes[i].link;
  }
  loadToggle();
}

async function loadMoreToggle() {
  max += 4;
  if (recipes.length < 20) {
    try {
      animate();
      let response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=fc51bed8&app_key=824f531904f7233c3adfdd524a1bc774&q=${input.value}`
      );

      let data = await response.json();
      let recipeArray = data["hits"];
      if (recipes.length < 20) {
        if (max > 6) {
          let x = max / 2;
          recipeArray.splice(0, x);
          for (let i = 0; i < max; i++) {
            if (recipeArray[i] !== undefined) {
              let object = {};
              object.name = recipeArray[i]["recipe"].label;
              object.link = recipeArray[i]["recipe"].url;
              object.img = recipeArray[i]["recipe"].image;
              recipes.push(object);
            }
          }
        } else {
          for (let i = 0; i < max; i++) {
            if (recipeArray[i] !== undefined) {
              let object = {};
              object.name = recipeArray[i]["recipe"].label;
              object.link = recipeArray[i]["recipe"].url;
              object.img = recipeArray[i]["recipe"].image;

              recipes.push(object);
            }
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
    createRecipe();
    enterData();
  } else {
    loadToggle();
  }
}
