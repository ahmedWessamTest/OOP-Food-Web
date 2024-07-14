import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Area {
  constructor() {
    // ==== global ====
    this.$loading = $("#loading");
    this.$allSections = $("section");
    this.ui = new Ui();
    // ==== events ====
    this.initEvents();
  }
  async initEvents() {
    await this.areaData();
    $("#area .area-item").on("click", (element) => this.areaManager(element));
  }
  areaManager(element) {
    this.toggleLoading(true);
    const areaValue = element.currentTarget.dataset.target;
    try {
      this.fetchAreaItems(areaValue).then((data) => {
        this.pagesNavigator("landing");
        this.ui.displayFoodData(data, "landing");
        $("#landing .foodItem").on("click", (e) => {
          this.toggleLoading(true);
          this.$loading.show(0);
          const elementId = e.currentTarget.dataset.id;
          const details = new Details(elementId);
          this.pagesNavigator("details");
          this.toggleLoading(false);
        });
      });
    } catch (error) {
      console.error("error when get area: ", error);
    } finally {
      this.toggleLoading(false);
    }
  }
  async areaData() {
    this.toggleLoading(true);
    try {
      const apiResult = await this.fetchArea();
      this.ui.displayArea(apiResult);
    } catch (error) {
      console.error("error when get area", error);
    } finally {
      this.toggleLoading(false);
    }
  }

  async fetchArea() {
    try {
      const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
      );
      return await api.json();
    } catch (error) {
      console.error("error when get area: ", error);
      return {};
    }
  }
  async fetchAreaItems(areaName) {
    try {
      const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
      );
      return await api.json();
    } catch (error) {
      console.error("error when get area: ", error);
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
