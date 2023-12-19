type SectionHeaderProps = {
    text: string;
}

const SectionHeader = ({text}: SectionHeaderProps) => {
  return (
    <h1 className=" font-body font-extrabold text-gray-900 text-3xl">{text}</h1>
  )
}

export default SectionHeader