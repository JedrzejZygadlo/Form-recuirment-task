import { expect } from "chai";
import { shallowMount, mount } from "@vue/test-utils";
import Modal from "@/components/Modal.vue";
import { Status, StatusMessage } from "../../src/types";

describe("Test Modal component", () => {
  it("Test 1: Status as default => check computed properties, additional classes, conditional rendered elements", () => {
    const wrapper = mount(Modal, { props: { status: Status.FILLING_FORM } });
    expect(wrapper.vm.isLoading).to.equal(false);
    expect(wrapper.vm.isFailed).to.equal(false);
    expect(wrapper.vm.isSuccess).to.equal(false);
    expect(wrapper.vm.shouldShowModal).to.equal(false);
  });
  it("Test 2: Status as default => check additional classes", () => {
    const wrapper = mount(Modal, { props: { status: Status.FILLING_FORM } });
    expect(wrapper.find(".is-success").exists()).to.equal(false);
    expect(wrapper.find(".is-failed").exists()).to.equal(false);
  });
  it("Test 3: Status as default => check conditional rendered elements", () => {
    const wrapper = mount(Modal, { props: { status: Status.FILLING_FORM } });
    expect(wrapper.find(".close-svg").exists()).to.equal(false);
    expect(wrapper.find(".modal--button").exists()).to.equal(false);
  });
  it("Test 4: Status (came from props) as LOADING (simulate state when form is sending) => check computed properties", () => {
    const wrapper = shallowMount(Modal, { props: { status: Status.LOADING } });
    expect(wrapper.vm.isLoading).to.equal(true);
    expect(wrapper.vm.isFailed).to.equal(false);
    expect(wrapper.vm.isSuccess).to.equal(false);
    expect(wrapper.vm.modalText).to.equal(StatusMessage.LOADING);
    expect(wrapper.vm.shouldShowModal).to.equal(true);
  });
  it("Test 5: Status (came from props) as SUCCESS (simulate state when form is sending) => check computed properties", () => {
    const wrapper = mount(Modal, { props: { status: Status.SUCCESS } });
    expect(wrapper.vm.isLoading).to.equal(false);
    expect(wrapper.vm.isFailed).to.equal(false);
    expect(wrapper.vm.isSuccess).to.equal(true);
    expect(wrapper.vm.modalText).to.equal(StatusMessage.SUCCESS);
    expect(wrapper.vm.shouldShowModal).to.equal(true);
  });
  it("Test 6: Status (came from props) as SUCCESS (simulate state when form is sending) => check additional classes", () => {
    const wrapper = mount(Modal, { props: { status: Status.SUCCESS } });
    expect(wrapper.find(".is-success").exists()).to.equal(true);
    expect(wrapper.find(".is-success").exists()).to.equal(true);
  });

  it("Test 7: Status (came from props) as SUCCESS (simulate state when form is sending) => conditional rendered elements", () => {
    const wrapper = mount(Modal, { props: { status: Status.SUCCESS } });
    expect(wrapper.find(".close-svg").exists()).to.equal(true);
    expect(wrapper.find(".modal--button").exists()).to.equal(true);
  });

  it("Test 8: Status (came from props) as SUCCESS (simulate state when form is sending) => check button click emmit", async () => {
    const wrapper = mount(Modal, { props: { status: Status.SUCCESS } });
    await wrapper.find(".modal--button").trigger("click");
    expect(wrapper.emitted().status[0])
      .to.be.an("array")
      .that.includes(Status.FILLING_FORM);
  });
});
