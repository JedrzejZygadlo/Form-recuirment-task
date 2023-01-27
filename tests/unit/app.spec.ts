import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import App from "../../src/App.vue";
import { Status } from "../../src/types";

describe("Test App component", () => {
  it("Test 1: Test change status method ", () => {
    const wrapper = shallowMount(App);
    wrapper.vm.changeStatus(Status.LOADING);
    expect(wrapper.vm.status).to.equal(Status.LOADING);
  });
});
