
type NoDataOverlayPropsType = {
    title?: string;
    description?: string 
}
const NoDataOverlay = ({title = "No test data available", description = "Check back after completing your first test."} : NoDataOverlayPropsType) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-inclined-lines bg-gray-100/50 rounded flex justify-center items-center">
      <div className="bg-white rounded shadow px-4 py-2">
        <span className="font-bold">{title}</span>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default NoDataOverlay;
