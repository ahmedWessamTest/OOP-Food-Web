import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Category {
  constructor() {
    // ==== global ====
    this.$loading = $("#loading");
    this.$allSections = $("section");
    this.ui = new Ui();

    // ==== events ====
    this.initEvents();
  }
  async initEvents() {
    await this.loadCategoryData();
    $("#category .category-item").on("click", (event) => this.categoryManager(event));
  }
  categoryManager(element) {
    this.toggleLoading(true);
    const catValue = element.currentTarget.dataset.target;
    try{
      this.fetchCategoryItems(catValue).then((data) => {
        this.pagesNavigator("landing");
        this.ui.displayFoodData(data, "landing");
        this.$loading.hide(0);
        $("#landing .foodItem").on("click", (e) => {
          this.toggleLoading(true);
          const elementId = e.currentTarget.dataset.id;
          const details = new Details(elementId);
          this.pagesNavigator("details");
          this.toggleLoading(false);
        });
      });
    }catch (error){
      console.error('error when get category: ', error)
    } finally {
      this.toggleLoading(false)
    }
  }
  async loadCategoryData() {
    this.toggleLoading(true);
    try{
     const apiResult = await this.fetchCategory();
     this.ui.displayCategory(apiResult);
    } catch (error) {
      console.error("error when get category: ", error);
    } finally {
      this.toggleLoading(false)
    }
    
  }

  async fetchCategory() {
    try {
      const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/categories.php`
      );
      return await api.json();
    } catch (error) {
      console.error("error when get category: ", error);
      return {};
    } finally {
      this.toggleLoading(false)
    }
  }
  async fetchCategoryItems(categoryName) {
    try {
      const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
      );
      return await api.json();
    } catch (error) {
      console.error("error when get: ", error);
      return {};
    }
  }
  pagesNavigator(section) {
    this.$allSections.hide(0);
    $(`#${section}`).show(0);
  }

  toggleLoading(show) {
    this.$loading.toggle(show);
  }
}
