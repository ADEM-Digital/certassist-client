type TestInformationLineProps = {
    description: string;
    value: string
}
const TestInformationLine = ({description, value} : TestInformationLineProps) => {
  return (
    <div className=" font-body text-xs flex gap-1 items-center text-center justify-between">
      <div className="font-body flex gap-1 items-center text-center">
        <p className=" font-light leading-normal">{description}</p>
      </div>
      <p className=" font-semibold leading-normal">{value}</p>
    </div>
  );
};

export default TestInformationLine;
