"use strict";

import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Search {
  constructor(searchValue) {
    // ==== global ====
    this.searchValue = searchValue;
    this.$loading = $("#loading");
    this.$searchLoading = $("#searchLoading");
    this.$notFound = $("#notFound");
    this.$searchByNameInput = $("#searchByNameInput");
    this.$searchByLetterInput = $("#searchByLetterInput");
    this.$allSections = $("section");
    this.ui = new Ui();

    // ==== events ====
    this.initEvents();
  }

  // ==== functions ====

  initEvents() {
    this.$searchByNameInput.on("input", (event) => this.handleSearch(event));
    this.$searchByLetterInput.on("input", (event) => this.handleSearch(event));
  }

  handleSearch(event) {
    const searchValue = $(event.target).val();
    const searchType = event.target.id === "searchByNameInput" ? "s" : "f";
    this.searchItems(searchType, searchValue).then(() => {
      $("#search .foodItem").on("click", (e) => {
        const elementId = e.currentTarget.dataset.id;
        new Details(elementId);
        this.pagesNavigator("details");
      });
    });
  }

  pagesNavigator(section) {
    this.$allSections.hide(0);
    $(`#${section}`).show(0);
  }

  async searchItems(searchType, searchValue) {
    try {
      this.resetSearchResults();
      const aptResult = await this.fetchData(searchType, searchValue);
      this.ui.displayFoodData(aptResult, "search");
    } catch (error) {
      this.handleSearchError();
    } finally {
      this.$searchLoading.hide(0);
    }
  }

  resetSearchResults() {
    $(".foodItem").remove();
    this.$notFound.hide(0);
    this.$searchLoading.show(0);
  }

  handleSearchError() {
    this.$notFound.show(0);
  }

  async landingData() {
    this.$loading.show(0);
    try {
      const apiResult = await this.fetchData();
      this.ui.displayFoodData(apiResult, "landing");
    } catch (error) {
      console.error("Error fetching landing data", error);
    } finally {
      this.$loading.hide(0);
    }
  }

  async fetchData(searchType = "s", searchValue = "") {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?${searchType}=${searchValue}`
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching data", error);
      throw error;
    }
  }
}
