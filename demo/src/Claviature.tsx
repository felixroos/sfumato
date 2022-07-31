import { getClaviature } from "claviature";

export default function Claviature({
  options,
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
}: any) {
  const svg = getClaviature({
    options,
    onClick,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
  });
  return (
    <svg {...svg.attributes}>
      {svg.children.map((el, i) => {
        const TagName = el.name;
        return (
          <TagName key={`${el.name}-${i}`} {...el.attributes}>
            {el.value}
          </TagName>
        );
      })}
    </svg>
  );
}
