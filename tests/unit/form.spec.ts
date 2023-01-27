import { expect } from "chai";
import { shallowMount, mount } from "@vue/test-utils";
import Form from "@/components/Form.vue";
import { Label, Placeholder, Status } from "../../src/types";
import apiClient from "../../src/service";

// Validation Part
describe("Test Form component - validate part", () => {
  const formFieldsMocked = [
    {
      value: "testName",
      errors: [],
      settings: {
        type: "text",
        label: Label.NAME,
        placeholder: Placeholder.NAME,
        minLength: 5,
        maxLength: 50,
        isRequired: true,
      },
    },
    {
      value: "testemail@gmail.com",
      errors: [],
      settings: {
        type: "email",
        label: Label.EMAIL,
        placeholder: Placeholder.EMAIL,
        isRequired: true,
      },
    },
    {
      value: "testSubject",
      errors: [],
      settings: {
        type: "textarea",
        label: Label.SUBJECT,
        placeholder: Placeholder.SUBJECT,
        maxLength: 100,
        rows: 2,
        isRequired: false,
      },
    },
    {
      value: "testMessage",
      errors: [],
      settings: {
        type: "textarea",
        label: Label.MESSAGE,
        placeholder: Placeholder.MESSAGE,
        maxLength: 500,
        rows: 4,
        isRequired: true,
      },
    },
  ];

  it("Test 1: isRequiredError method test -> case true", () => {
    const wrapper = shallowMount(Form);
    const isRequiredError = wrapper.vm.isRequiredError(
      formFieldsMocked[0].settings,
      formFieldsMocked[0].value
    );
    expect(isRequiredError).to.equal(false);
  });

  it("Test 2: isRequiredError method test -> case error true", () => {
    const wrapper = shallowMount(Form);
    const isRequiredError = wrapper.vm.isRequiredError(
      formFieldsMocked[0].settings,
      ""
    );
    expect(isRequiredError).to.equal(true);
  });

  it("Test 3: isMinLengthError method test -> case error false", () => {
    const wrapper = shallowMount(Form);
    const isMinLengthError = wrapper.vm.isMinLengthError(
      formFieldsMocked[0].settings,
      formFieldsMocked[0].value
    );
    expect(isMinLengthError).to.equal(false);
  });

  it("Test 4: isMinLengthError method test -> case error true", () => {
    const wrapper = shallowMount(Form);
    const isMinLengthError = wrapper.vm.isMinLengthError(
      formFieldsMocked[0].settings,
      ""
    );
    expect(isMinLengthError).to.equal(true);
  });

  it("Test 5: isMaxLengthError method test -> case error false", () => {
    const wrapper = shallowMount(Form);
    const isMaxLengthError = wrapper.vm.isMaxLengthError(
      formFieldsMocked[0].settings,
      formFieldsMocked[0].value
    );
    expect(isMaxLengthError).to.equal(false);
  });

  it("Test 6: isMaxLengthError method test -> case error true", () => {
    const wrapper = shallowMount(Form);
    const isMaxLengthError = wrapper.vm.isMaxLengthError(
      formFieldsMocked[0].settings,
      "TestCaseWithMoreThenFiftyCharacteristicsInStringShouldReturnError"
    );
    expect(isMaxLengthError).to.equal(true);
  });

  it("Test 7: isEmailError method test -> case error false", () => {
    const wrapper = shallowMount(Form);
    const isEmailError = wrapper.vm.isEmailError(
      formFieldsMocked[1].settings,
      formFieldsMocked[1].value
    );
    expect(isEmailError).to.equal(false);
  });

  it("Test 8: isEmailError method test -> case error true", () => {
    const wrapper = shallowMount(Form);
    const isEmailError = wrapper.vm.isEmailError(
      formFieldsMocked[1].settings,
      "incorectemailtest"
    );
    expect(isEmailError).to.equal(true);
  });

  it("Test 9: isEmailError method test -> case error true", () => {
    const wrapper = shallowMount(Form);
    const isEmailError = wrapper.vm.isEmailError(
      formFieldsMocked[1].settings,
      "wrong@format@test"
    );
    expect(isEmailError).to.equal(true);
  });

  it("Test 10: isEmailError method test -> case error true", () => {
    const wrapper = shallowMount(Form);
    const isEmailError = wrapper.vm.isEmailError(
      formFieldsMocked[1].settings,
      "wrong@formattest"
    );
    expect(isEmailError).to.equal(true);
  });

  it("Test 11: validateForm method test -> isSomeError is false", () => {
    const wrapper = shallowMount(Form);
    wrapper.vm.formFields = formFieldsMocked;
    wrapper.vm.validateForm();
    expect(wrapper.vm.isSomeError).to.equal(false);
  });

  it("Test 12: validateForm method test -> isSomeError is true (required field not filled)", () => {
    formFieldsMocked[0].value = "";
    const wrapper = shallowMount(Form);
    wrapper.vm.formFields = formFieldsMocked;
    wrapper.vm.validateForm();
    expect(wrapper.vm.isSomeError).to.equal(true);
  });

  it("Test 13: validateForm method test -> isSomeError is true (length < minLength)", () => {
    formFieldsMocked[0].value = "ss";
    const wrapper = shallowMount(Form);
    wrapper.vm.formFields = formFieldsMocked;
    wrapper.vm.validateForm();
    expect(wrapper.vm.isSomeError).to.equal(true);
  });

  it("Test 14: validateForm method test -> isSomeError is true (length > maxLength)", () => {
    formFieldsMocked[0].value =
      "TestCaseWithMoreThenFiftyCharacteristicsInStringShouldReturnError";
    const wrapper = shallowMount(Form);
    wrapper.vm.formFields = formFieldsMocked;
    wrapper.vm.validateForm();
    expect(wrapper.vm.isSomeError).to.equal(true);
  });

  it("Test 15: validateForm method test -> isSomeError is true (wrong email)", () => {
    formFieldsMocked[0].value = "newTestedName";
    formFieldsMocked[1].value = "wrongEmailFormat";
    const wrapper = shallowMount(Form);
    wrapper.vm.formFields = formFieldsMocked;
    wrapper.vm.validateForm();
    expect(wrapper.vm.isSomeError).to.equal(true);
  });
});

// Send message part
describe("Test Form component - sending message part", () => {
  const formFieldsMocked = [
    {
      value: "testName3",
      errors: [],
      settings: {
        type: "text",
        label: Label.NAME,
        placeholder: Placeholder.NAME,
        minLength: 5,
        maxLength: 50,
        isRequired: true,
      },
    },
    {
      value: "testemail3@gmail.com",
      errors: [],
      settings: {
        type: "email",
        label: Label.EMAIL,
        placeholder: Placeholder.EMAIL,
        isRequired: true,
      },
    },
    {
      value: "testSubject3",
      errors: [],
      settings: {
        type: "textarea",
        label: Label.SUBJECT,
        placeholder: Placeholder.SUBJECT,
        maxLength: 100,
        rows: 2,
        isRequired: false,
      },
    },
    {
      value: "testMessage3",
      errors: [],
      settings: {
        type: "textarea",
        label: Label.MESSAGE,
        placeholder: Placeholder.MESSAGE,
        maxLength: 500,
        rows: 4,
        isRequired: true,
      },
    },
  ];

  it("Test 1: Collect right data which will be send as a payload", () => {
    const wrapper = shallowMount(Form);
    wrapper.vm.formFields = formFieldsMocked;
    const dataToSend = wrapper.vm.getFormDataToSend();
    expect(dataToSend).to.have.all.keys("name", "email", "subject", "message");
    expect(dataToSend.name).to.not.be.empty;
    expect(dataToSend.email).to.not.be.empty;
    expect(dataToSend.subject).to.not.be.empty;
    expect(dataToSend.message).to.not.be.empty;
  });

  it("Test 2: Send request, check response ", async () => {
    const wrapper = shallowMount(Form);
    wrapper.vm.formFields = formFieldsMocked;
    const dataToSend = wrapper.vm.getFormDataToSend();
    wrapper.vm.changeStatus(Status.LOADING);
    await apiClient.post("/message", dataToSend).then((response) => {
      expect(response.data).to.have.all.keys(
        "name",
        "email",
        "subject",
        "message",
        "id",
        "createdAt",
        "avatar"
      );
    });
  });
});

// Rest functions part
describe("Test Form component - rest", () => {
  it("Test 1: check change status emmit", async () => {
    const wrapper = mount(Form);
    wrapper.vm.changeStatus(Status.SUCCESS);
    expect(wrapper.emitted().status[0])
      .to.be.an("array")
      .that.includes(Status.SUCCESS);
  });

  it("Test 2: check change status emmit", async () => {
    const wrapper = mount(Form);
    wrapper.vm.setSomeError(true);
    expect(wrapper.vm.isSomeError).to.equal(true);
  });
});
