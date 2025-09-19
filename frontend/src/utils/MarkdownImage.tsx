import Image from "next/image";

export const MarkdownImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  if (!props.src)
    return null;
  const srcStr = String(props.src);
  return (
    <div className="relative w-full h-64 my-4 rounded-lg overflow-hidden">
      <Image src={srcStr} alt={props.alt || ""} fill className="object-contain" />
    </div>
  );
};
