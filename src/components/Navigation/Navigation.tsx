import { site } from "../../config/site";
interface NavigationProps {
  label: string;
}
export function Navigation({ label }: NavigationProps) {
  return (
    <nav aria-label={label}>
      {site.navigation.map((item) => (
        <a key={item.href} href={item.href}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
