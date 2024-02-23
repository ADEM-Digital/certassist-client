import { CheckIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../utils/utils";
import Logo from "../../components/logo/Logo";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAuth0 } from "@auth0/auth0-react";

const tiers = [
  {
    name: "Monthly",
    id: "monthly",
    priceId: `${import.meta.env.VITE_USMLE_MONTHLY}`,
    priceMonthly: "$29.99",
    description: "Basic one moth access",
    features: [
      "Qbank",
      "More than to 2,200 questions",
      "Basic analytics",
      "24-hour support response time",
    ],
    mostPopular: false,
  },
  {
    name: "3-Month",
    id: "quarterly",
    priceId: `${import.meta.env.VITE_USMLE_QUARTERLY}`,
    priceMonthly: "$79.99",
    description: "Basic three month access",
    features: [
      "Qbank access",
      "More than to 2,200 questions",
      "Basic analytics",
      "3-hour support response time",
      "10% discount on base price",
    ],
    mostPopular: true,
  },
  {
    name: "6-Month",
    id: "halfyear",
    priceId: `${import.meta.env.VITE_USMLE_HALFYEAR}`,
    priceMonthly: "$149.99",
    description: "Basic six month access",
    features: [
      "Qbank access",
      "More than to 2,200 questions",
      "Basic analytics",
      "3-hour support response time",
      "20% discount on base price",
    ],
    mostPopular: false,
  },
];

const handleBuyPlan = async (priceId: string, isTrial?: boolean, email?: string) => {
  try {
    let response: AxiosResponse<any> = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-subscription-checkout-session`,
      {
        priceId,
        isTrial,
        email
      }
    );

    if (response.status === 200) {
      window.location = response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export default function PricingSelection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth0();
  return (
    <div className="bg-white py-10 sm:py-10">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 md:hidden">
            <Logo width={30} />
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {/* <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
          </div> */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-900"
            >
              <span>Log out</span>{" "}
              <ArrowRightOnRectangleIcon className="w-4 h-4 stroke-2" />
            </button>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
             
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                {/* <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div> */}
                <div className="py-6">
                  <button
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <div className="flex justify-center flex-col items-center mx-auto max-w-7xl px-6 lg:px-8 mt-10 md:mt-0">
        <div className="flex justify-center flex-col max-w-4xl text-center">
          <div className="hidden md:flex justify-center py-2 items-center gap-1">
            <Logo width={60} />
            <p className=" font-body font-medium text-gray-900 text-3xl">
              CertAssist
            </p>
          </div>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pricing plans
          </p>
          <button
            onClick={() => handleBuyPlan(tiers[0].priceId, true, user?.email)}
            aria-describedby={tiers[0].id}
            className={classNames(
              true
                ? "bg-button-100 text-white shadow-sm hover:bg-button-100/80"
                : "text-button-100 ring-1 ring-inset ring-button-100/50 hover:ring-button-100",
              "mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-100"
            )}
          >
            Start a 7-day trial
          </button>
        </div>
        {/* <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in.
          Explicabo id ut laborum.
        </p> */}
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? "lg:z-10 lg:rounded-b-none" : "lg:mt-8",
                tierIdx === 0 ? "lg:rounded-r-none" : "",
                tierIdx === tiers.length - 1 ? "lg:rounded-l-none" : "",
                "flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.mostPopular ? "text-button-100" : "text-gray-900",
                      "text-lg font-semibold leading-8"
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-button-100/10 px-2.5 py-1 text-xs font-semibold leading-5 text-button-100">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {tier.priceMonthly}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    /month
                  </span>
                </p>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className="h-6 w-5 flex-none text-button-100"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleBuyPlan(tier.priceId, false, user?.email)}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? "bg-button-100 text-white shadow-sm hover:bg-button-100/80"
                    : "text-button-100 ring-1 ring-inset ring-button-100/50 hover:ring-button-100",
                  "mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-100"
                )}
              >
                Buy plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
