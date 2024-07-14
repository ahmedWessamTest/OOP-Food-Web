import { Ui } from "./ui.module.js";

export class Details {
  constructor(id) {
    // ==== global ====
    this.id = id;
    this.$loading = $("#loading");
    this.ui = new Ui();
    this.dataManager();
  }
  async dataManager() {
    this.toggleLoading(true);
    try {
      const apiData = await this.fetchDetails();
      this.ui.displayDetailsData(apiData);
    } catch (error) {
      console.error("error when get details: ", error);
    } finally {
      this.toggleLoading(false);
    }
  }
  async fetchDetails() {
    try {
      const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.id}`
      );
      return await api.json();
    } catch (error) {
      console.error("error when get details: ", error);
      return {};
    }
  }
  toggleLoading(show) {
    this.$loading.toggle(show);
  }
}
