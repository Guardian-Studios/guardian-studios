import type { ComponentProps } from "react";
interface ActionLinkProps extends ComponentProps<"a"> {
  variant?: "solid" | "outline";
}
export function ActionLink({
  variant = "solid",
  className = "",
  ...props
}: ActionLinkProps) {
  return (
    <a
      className={["button", variant === "outline" ? "outline" : "", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
