export function normalizeAvatar(path?: string | null) {
  if (!path)
    return "/avatars/default.png";
  if (path.startsWith("http://") || path.startsWith("https://"))
    return path;
  const cleaned = path.startsWith("/") ? path.slice(1) : path;
  return `${process.env.NEXT_PUBLIC_API_URL}/${cleaned}`;
}
