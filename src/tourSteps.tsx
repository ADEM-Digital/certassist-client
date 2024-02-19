import { StepType } from "@reactour/tour";

export const dashboardTourSteps: StepType[] = [
  {
    selector: "#root",
    content:
      "Welcome to CertAssist! This tour will guide you through the different features of the application.",
    styles: {
      maskArea: () => ({}),
      popover: (base) => ({
        ...base,
        maxWidth: "min-content",

        padding: 0,
        background: "none",
        boxShadow: "none",
      }),
    },
  },
  {
    selector: ".desktop-sidebar",
    content:
      "This sidebar includes navigation links to all the relevant places inside the application.",
    styles: {
      popover: (base) => ({
        ...base,
        maxWidth: "min-content",
        background: "none",
        boxShadow: "none",
      }),
    },
    position: "center",
  },
  {
    selector: '[href="/"]',
    content:
      "This link will navigate to the dashboard where you will find aggregated analytics calculated from all the test taken.",
    styles: {
      popover: (base) => ({
        ...base,
        maxWidth: "min-content",
        background: "none",
        boxShadow: "none",
      }),
    },
  },
  {
    selector: '[href="/tests"]',
    content:
      "This link will navigate to the tests section where you'll be able to manage all test related activities.",
    styles: {
      popover: (base) => ({
        ...base,
        maxWidth: "min-content",
        background: "none",
        boxShadow: "none",
      }),
    },
  },
  {
    selector: '[href="/settings"]',
    content:
      "This link will navigate to the settings section where you'll be able to customize your experience and manage billing settings.",
    styles: {
      popover: (base) => ({
        ...base,
        maxWidth: "min-content",
        background: "none",
        boxShadow: "none",
      }),
    },
  },
  {
    selector: ".logout-button",
    content:
      "By clicking this button you will be able to logout from your account.",
    styles: {
      popover: (base) => ({
        ...base,
        maxWidth: "min-content",
        background: "none",
        boxShadow: "none",
      }),
    },
  },
  {
    selector: ".overall-performance",
    content:
      "This card tracks an average of all you scores from all the tests taken in CertAssist. It also provide insight on the usage of the question bank.",
    styles: {
      popover: (base) => ({
        ...base,
        maxWidth: "min-content",
        background: "none",
        boxShadow: "none",
      }),
    },
  },
  {
    selector: ".performance-difficulty",
    content:
      "This card provides insight on your performance according to the difficulty of the questions taken.",
    styles: {
      popover: (base) => ({
        ...base,
        maxWidth: "min-content",
        background: "none",
        boxShadow: "none",
      }),
    },
  },
  {
    selector: ".performance-topic",
    content:
      "The questions in our Qbank are organized by topic and subtopic. We use this data to provide insights on your performance by topic and subtopic to help in tackling those lowest performance knowledge areas.",
    styles: {
      maskArea: () => ({}),
      popover: (base) => ({
        ...base,
        maxWidth: "min-content",
        background: "none",
        boxShadow: "none",
      }),
    },
  },
  {
    selector: ".performance-topic",
    content: "This card will aggregate your results by topic.",
    styles: {
      maskArea: () => ({}),
      popover: (base) => ({
        ...base,
        maxWidth: "min-content",
        background: "none",
        boxShadow: "none",
      }),
    },
  },
  {
    selector: ".performance-subtopic",
    content: "This card will aggregate your results by subtopic.",
    styles: {
      maskArea: () => ({}),
      popover: (base) => ({
        ...base,
        maxWidth: "min-content",
        background: "none",
        boxShadow: "none",
      }),
    },
  },
];

export const testsTourSteps: StepType[] = [
  {
    selector: ".tests-container",
    content:
      "In this section you will find information on your tests. Here you can review previous tests or create new ones.",
    position: "center",
    bypassElem: true,
    styles: {
      maskArea: () => ({}),
    },
  },
  {
    selector: ".tests-container",
    content: () => (
      <>
        <p>
          In the table in the main section. Your available tests will be
          displayed on the table with relevant information about them.
        </p>
        <img src="/images/tour/tests/tests-table.png" alt="" />
      </>
    ),
    position: "center",
    styles: {
      maskArea: () => ({}),
      popover: (base) => ({
        ...base,
        maxWidth: (window.innerWidth / 5) * 2,

        padding: 0,
        boxShadow: "none",
      }),
    },
  },
  {
    selector: ".create-test-button",
    content:
      "To create a new test you can press the 'Create Test' button. This will open up a form where you will be asked to set up the parameters you want for your test.",
  },
  {
    selector: ".tests-container",
    content: () => (
      <>
        <p>
          To start a test you can click on the <strong>test name</strong> in the
          tests table.
        </p>
        <img src="/images/tour/tests/tests-name.png" alt="" />
      </>
    ),
    position: "center",
    styles: {
      maskArea: () => ({}),
      popover: (base) => ({
        ...base,
        maxWidth: (window.innerWidth / 5) * 2,

        padding: 0,
        boxShadow: "none",
      }),
    },
  },
  {
    selector: ".tests-container",
    content: () => (
      <>
        <p>
          After a test in completed, on the left side of the test table you'll
          see your <strong>grade</strong> and an <strong>Action Column</strong>.
        </p>
        <img src="/images/tour/tests/tests-actions.png" alt="" />
      </>
    ),
    position: "center",
    styles: {
      maskArea: () => ({}),
      popover: (base) => ({
        ...base,
        maxWidth: (window.innerWidth / 5) * 2,

        padding: 0,
        boxShadow: "none",
      }),
    },
  },
  {
    selector: ".tests-container",
    content: () => (
      <>
        <p>
          After your test is completed, you can click on the{" "}
          <strong>graph icon</strong> in the <strong>Action Column</strong> to
          review the results of the test.
        </p>
        <img src="/images/tour/tests/tests-analytics.png" alt="" />
      </>
    ),
    position: "center",
    styles: {
      maskArea: () => ({}),
      popover: (base) => ({
        ...base,
        maxWidth: (window.innerWidth / 5) * 2,

        padding: 0,
        boxShadow: "none",
      }),
    },
  },
  {
    selector: ".tests-container",
    content: () => (
      <>
        <p>
          The <strong>Action Column</strong> also has an{" "}
          <strong>options menu</strong> where you can perform operations related
          to the test. For now the only operation available is{" "}
          <strong>Delete</strong> but more operations could be added in future
          versions.
        </p>
        <img src="/images/tour/tests/tests-options.png" alt="" />
      </>
    ),
    position: "center",
    styles: {
      maskArea: () => ({}),
      popover: (base) => ({
        ...base,
        maxWidth: (window.innerWidth / 5) * 2,

        padding: 0,
        boxShadow: "none",
      }),
    },
  },
];
