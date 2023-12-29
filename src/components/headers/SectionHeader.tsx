type SectionHeaderProps = {
    text: string;
    size?: string;
}

const SectionHeader = ({text, size = "text-3xl"}: SectionHeaderProps) => {
  return (
    <h1 className={`font-body font-extrabold text-gray-900 ${size}`}>{text}</h1>
  )
}

export default SectionHeader