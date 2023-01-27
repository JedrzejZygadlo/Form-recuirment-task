import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Field from "@/components/Field.vue";
import { Label, Placeholder } from "../../src/types";

describe("Test Field component", () => {
  const formSettingsMock = {
    type: "text",
    label: Label.SUBJECT,
    placeholder: Placeholder.SUBJECT,
    maxLength: 100,
    rows: 2,
    isRequired: false,
  };

  it("Test 1: isValid true case", () => {
    const wrapper = shallowMount(Field, {
      props: {
        isSubmitted: true,
        modelValue: "test",
        errors: [],
        formSettings: formSettingsMock,
      },
    });
    expect(wrapper.vm.isValid).to.equal(true);
  });

  it("Test 2: isValid false case ", () => {
    const wrapper = shallowMount(Field, {
      props: {
        isSubmitted: false,
        modelValue: "test",
        errors: [],
        formSettings: formSettingsMock,
      },
    });
    expect(wrapper.vm.isValid).to.equal(false);
  });

  it("Test 3: Test change status method ", () => {
    const wrapper = shallowMount(Field, {
      props: {
        isSubmitted: true,
        modelValue: "test",
        errors: ["ErrorExample"],
        formSettings: formSettingsMock,
      },
    });
    expect(wrapper.vm.isValid).to.equal(false);
  });

  it("Test 4: isInput true case and isTextArea false case and is input shown ", async () => {
    const wrapper = shallowMount(Field, {
      props: {
        isSubmitted: true,
        modelValue: "test",
        errors: [],
        formSettings: formSettingsMock,
      },
    });
    expect(wrapper.vm.isInput).to.equal(true);
    expect(wrapper.vm.isTextArea).to.equal(false);
    expect(wrapper.find("input").exists()).to.equal(true);
  });

  it("Test 5: isInput false case and isTextArea true case and is texarea shown", async () => {
    formSettingsMock.type = "textarea";
    const wrapper = shallowMount(Field, {
      props: {
        isSubmitted: true,
        modelValue: "test",
        errors: [],
        formSettings: formSettingsMock,
      },
    });
    expect(wrapper.vm.isInput).to.equal(false);
    expect(wrapper.vm.isTextArea).to.equal(true);
    expect(wrapper.find("textarea").exists()).to.equal(true);
  });

  it("Test 6: check additional class is-valid ", () => {
    const wrapper = shallowMount(Field, {
      props: {
        isSubmitted: true,
        modelValue: "test",
        errors: [],
        formSettings: formSettingsMock,
      },
    });
    expect(wrapper.find(".is-valid").exists()).to.equal(true);
  });

  it("Test 7: check additional class is-error ", () => {
    const wrapper = shallowMount(Field, {
      props: {
        isSubmitted: true,
        modelValue: "test",
        errors: ["ErrorExample"],
        formSettings: formSettingsMock,
      },
    });
    expect(wrapper.find(".is-error").exists()).to.equal(true);
  });

  it("Test 7: Input change emmit ", () => {
    formSettingsMock.type = "text";
    const wrapper = shallowMount(Field, {
      props: {
        isSubmitted: true,
        modelValue: "test",
        errors: [],
        formSettings: formSettingsMock,
      },
    });
    const input = wrapper.find("input");
    input.element.value = "test123";
    input.trigger("input");
    expect(wrapper.emitted()["update:modelValue"][0])
      .to.be.an("array")
      .that.includes("test123");
  });
});
