import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Ingredients {
  constructor() {
    // ==== global ====
    this.$loading = $("#loading");
    this.$allSections = $("section");
    this.ui = new Ui();
    // ==== events ====
    this.initEvents();
  }
  async initEvents() {
    await this.loadIngridData();
    $("#ingredients .ingrid-item").on("click", (event) => {
      this.ingridManager(event);
    });
  }
  ingridManager(element) {
    this.toggleLoading(true);
    const ingValue = element.currentTarget.dataset.target;
    try {
      this.fetchIngridItems(ingValue).then((data) => {
        this.pagesNavigator("landing");
        this.ui.displayFoodData(data, "landing");
        this.$loading.hide(0);
        $("#landing .foodItem").on("click", (e) => {
          this.$loading.show(0);
          const elementId = e.currentTarget.dataset.id;
          const details = new Details(elementId);
          this.pagesNavigator("details");
          this.$loading.hide(0);
        });
      });
    } catch (error) {
      console.error("error when get ingredients: ", error);
    } finally {
      this.toggleLoading(false);
    }
  }
  async loadIngridData() {
    this.toggleLoading(true);
    try {
      const apiResult = await this.fetchIngrid();
      this.ui.displayIngrid(apiResult);
    } catch (error) {
      console.error("error when get ingredients: ", error);
    } finally {
      this.toggleLoading(false);
    }
  }

  async fetchIngrid() {
    try {
      const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
      );
      return await api.json();
    } catch (error) {
      console.error("error when get: ", error);
      return {};
    }
  }
  async fetchIngridItems(areaName) {
    try {
      const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${areaName}`
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
