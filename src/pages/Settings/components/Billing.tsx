import MainButton from "../../../components/buttons/MainButton";
import SectionHeader from "../../../components/headers/SectionHeader";

type BillingPropsType = {
  handleManageSubscription: () => Promise<void>;
};

const Billing = ({ handleManageSubscription }: BillingPropsType) => {
  return (
    <div className="flex-1 bg-white shadow px-4 py-4 border border-border-100">
      <div className="border-b border-border-100">
        <SectionHeader text="Manage subscription" size="22" />
      </div>
      <p className="mb-4">
        Update your current subscription settings in the Stripe portal.
      </p>
      <MainButton buttonText="Manage Subscription" onClick={() => handleManageSubscription()}/>
    </div>
  );
};

export default Billing;
