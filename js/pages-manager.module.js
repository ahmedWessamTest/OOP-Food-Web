"use strict";

import { Area } from "./area.module.js";
import { Category } from "./categories.module.js";
import { ContactUs } from "./contact-us.module.js";
import { Details } from "./details.module.js";
import { Ingredients } from "./Ingredients.module.js";
import { Search } from "./search.module.js";

export class PagesManager {
  constructor() {
    // ==== global ====
    this.$navListItems = $("#mainNavList li");
    this.$sideNavList = $("#sideNavList");
    this.$allSections = $("section");
    this.navBtnEvent = null;
    this.listAnimation = true;
    // ==== when start ====
    this.pagesNavigator("landing");
    this.initLandingPage();
    this.initEvents();
  }
  // ==== functions ====
  async initLandingPage() {
    await this.start();
    $("#landing .foodItem").on("click", (e) => {
      const elementId = e.currentTarget.dataset.id;
      new Details(elementId);
      this.pagesNavigator("details");
    });
  }
  initEvents() {
    $("#navBtn").on("click", (e) => {
      this.navBtnEvent = e;
      this.navClickAction(e);
      this.navListAnimation();
    });
    $("#mainNavList button").on("click", async (e) => {
      const value = $(e.target).val();
      this.pagesNavigator(value);
      this.navClickAction(this.navBtnEvent);
      this.navListAnimation();
      this.loadSection(value);
    });
  }
  navListAnimation() {
    const animationValue = this.listAnimation ? "0" : "250";
    this.$navListItems.animate({top: animationValue},0)
    this.listAnimation = !this.listAnimation;
  }

  loadSection(section) {
    switch (section) {
      case "category":
        new Category();
        break;
      case "area":
        new Area();
        break;
      case "ingredients":
        new Ingredients();
        break;
      case "contactUs":
        new ContactUs();
      default:
        break;
    }
  }

  navClickAction(e) {
    $(e.currentTarget).toggleClass("close");
    this.$sideNavList.animate({ width: "toggle" });
  }
  pagesNavigator(section) {
    this.$allSections.hide(0);
    $(`#${section}`).show(0);
  }
  async start() {
    const search = new Search();
    await search.landingData();
  }
}
