"use strict";
export class Ui {
  constructor() {
    // ==== global ====
    this.initElements();
    //= details =
  }
  // ==== functions ====
  initElements() {
    this.$detailsThumbnail = $("#detailsThumbnail");
    this.$detailsTitle = $("#detailsTitle");
    this.$detailsDescription = $("#detailsDescription");
    this.$detailsArea = $("#detailsArea");
    this.$detailsCategory = $("#detailsCategory");
    this.$detailRecipes = $("#detailRecipes");
    this.$detailsTags = $("#detailsTags");
    this.$DetailsSource = $("#DetailsSource");
    this.$detailsYoutube = $("#detailsYoutube");
  }
  displayFoodData(data, section) {
    if (data && data.meals) {
      const { meals } = data;
      const limitData = meals.slice(0, 20);
      let box = ``;
      limitData.forEach((element) => {
        box += `
              <div data-id="${element.idMeal}" class="rounded-lg overflow-hidden relative group cursor-pointer foodItem">
                  <img src="${element.strMealThumb}" alt="" />
                  <div
                    class="ps-4 absolute inset-0 bg-white/50 flex items-center translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  >
                    <h3 class="text-[28px] font-medium line-clamp-4">${element.strMeal}</h3>
                  </div>
                </div>
              `;
      });
      $(`#${section} .FoodContainer`).html(box);
    }
  }
  displayDetailsData(data) {
    const {
      meals: [item],
    } = data;
    this.$detailsThumbnail.attr(
      "src",
      item?.strMealThumb ?? "./images/logo.jpg"
    );
    this.$detailsTitle.text(item?.strMeal ?? "title not available");
    this.$detailsDescription.text(
      item?.strInstructions ?? "description not available"
    );
    this.$detailsArea.text(item?.strArea ?? "area not available");
    this.$detailsCategory.text(item?.strCategory ?? "category not available");
    this.$detailRecipes.html(this.fillRecipes(item ?? {}));
    this.$detailsTags.html(this.fillTags(item) ?? {});
    this.$DetailsSource.attr("href", item?.strSource ?? "#");
    this.$detailsYoutube.attr("href", item?.strYoutube ?? "#");
  }

  fillTags(item) {
    try {
      if (item.strTags) {
        const targetArray = item.strTags.split(",");
        let box = ``;
        targetArray.forEach((element) => {
          box += `
          <span class="block px-2 py-1 rounded-lg text-base bg-[#F8D7DA] font-normal text-[#842029]">
            ${element}
          </span>
          `;
        });
        return box;
      }
    } catch (error) {
      console.error("error in details Tags: ", error);
      return [];
    }
  }
  fillRecipes(item) {
    try {
      if (item) {
        const changedVar = this.dynamicVar(item, "strIngredient", 20);
        let box = ``;
        changedVar.forEach((element) => {
          box += `
            <span class="block px-2 py-1 rounded-lg text-base bg-[#CFF4FC] font-normal text-[#055160]">
            ${element}
            </span>
          `;
        });
        return box;
      }
    } catch (error) {
      console.error("error in details recipes");
    }
  }
  dynamicVar(object, dynamicName, count) {
    let box = [];
    for (let i = 1; i <= count; i++) {
      if (object[`${dynamicName}${i}`]) {
        box.push(object[`${dynamicName}${i}`]);
      } else {
        break;
      }
    }
    return box;
  }

  displayCategory(data) {
    if (typeof data == "object") {
      const { categories } = data;
      const limitData = categories.slice(0, 20);
      let box = ``;
      limitData.forEach((element) => {
        box += `
              <div data-target="${
                element?.strCategory ?? ""
              }" class=" rounded-lg overflow-hidden relative group cursor-pointer category-item">
                <img src="${
                  element?.strCategoryThumb ?? "./images/dessert.png"
                }" alt="food category thumb nail" />
                <div
                  class="ps-4 absolute inset-0 bg-white/50 translate-y-[110%] group-hover:translate-y-0 transition-transform duration-500 text-center"
                >
                  <h3 class="text-[28px] mb-2 font-medium">${
                    element?.strCategory ?? "not have name"
                  }</h3>
                  <p class="line-clamp-4">
                    ${element?.strCategoryDescription ?? "not have description"}
                  </p>
                </div>
              </div>
              `;
      });
      $(`#category .CategoryContainer`).html(box);
    }
  }
  displayArea(data) {
    if (typeof data == "object") {
      const { meals } = data;
      const limitData = meals.slice(0, 20);
      let box = ``;
      limitData.forEach((element) => {
        box += `
              <div data-target="${
                element?.strArea ?? ""
              }" class="text-white text-center cursor-pointer area-item">
                <span class="block text-[64px]">
                  <i class="fa-solid fa-house-laptop"></i>
                </span>
                <h3 class="text-[28px] font-medium">${
                  element?.strArea ?? "anonymous area"
                }</h3>
              </div>
              `;
      });
      $(`#area .AreaContainer`).html(box);
    }
  }
  displayIngrid(data) {
    if (typeof data == "object") {
      const { meals } = data;
      const limitData = meals.slice(0, 20);
      let box = ``;
      limitData.forEach((element) => {
        console.log(element.strArea);
        box += `
              <div data-target="${element.strIngredient}" class="ingrid-item text-white text-center cursor-pointer">
                <span class="block text-[64px]">
                  <i class="fa-solid fa-drumstick-bite"></i>
                </span>
                <h3 class="text-[28px] font-medium text-nowrap">${element.strIngredient}</h3>
                <p class="text-[#f9f6f6] line-clamp-4 text-balance">
                  ${element.strDescription}
                </p>
              </div>
              `;
      });
      $(`#ingredients .IngridContainer`).html(box);
    }
  }
}
