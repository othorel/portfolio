import Link from "next/link";

type NavButtonProps = {
    href: string;
    label: string;
};

export default function NavButton({ href, label }: NavButtonProps) {
     return (
    <Link
      href={href}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      {label}
    </Link>
  );
}
