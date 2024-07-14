"use strict";

export class ContactUs {
  constructor() {
    // ==== global ====
    this.rePass = "";

    // ==== when start ====
    this.initForm();

    // ==== events ====
    $("#contactUs input").on("input", (event) => this.handleInput(event));
  }

  initForm() {
    $("#contactUs input").val("").removeClass("invalid");
  }

  handleInput(event) {
    const input = event.target;
    if (input.id === "userPasswordInput") {
      this.rePass = input.value;
    }
    this.mainValidation(input);
    this.checkInputs();
  }

  mainValidation(input) {
    const regex = {
      userNameInput: /^[A-Za-z]+$/,
      userEmailInput: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      userPhoneInput: /^(\+2|2)?01(2|1|0)\d{8}$/,
      userAgeInput: /^(1[2-9]|[2-8][0-9]|90)$/,
      userPasswordInput: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    };

    const text = input.value;
    let isValid = false;

    if (input.id === "userRePasswordInput") {
      isValid = text === this.rePass;
    } else if (regex[input.id]) {
      isValid = regex[input.id].test(text);
    }

    $(input).toggleClass("invalid", !isValid);
    return isValid;
  }

  checkInputs() {
    const inputs = [
      "userNameInput",
      "userEmailInput",
      "userPhoneInput",
      "userAgeInput",
      "userPasswordInput",
    ];

    const allValid = inputs.every((id) => {
      const input = $(`#${id}`).val();
      return this.mainValidation({ id, value: input });
    });

    const rePassValid = $("#userRePasswordInput").val() === this.rePass;

    $("#submitBtn").prop("disabled", !(allValid && rePassValid));
  }
}
