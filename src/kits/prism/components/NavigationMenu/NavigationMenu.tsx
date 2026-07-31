import { NavigationMenu as BaseNav } from "@base-ui/react/navigation-menu";
import { cx } from "../cx";
import type { MouseEvent, ReactNode } from "react";
import { ChevronDown } from "../icons";
import "./NavigationMenu.css";

export interface NavMenuLink {
  label: ReactNode;
  href?: string;
  description?: ReactNode;
}

export interface NavMenuItem {
  label: string;
  href?: string;
  links?: NavMenuLink[];
  disabled?: boolean;
}

export interface NavigationMenuProps extends Omit<
  React.ComponentProps<typeof BaseNav.Root>,
  "children" | "className"
> {
  items: NavMenuItem[];
  onLinkClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export function NavigationMenu({
  items,
  onLinkClick,
  className,
  ...props
}: NavigationMenuProps) {
  return (
    <BaseNav.Root className={cx("prism-navmenu", className)} {...props}>
      <BaseNav.List className="prism-navmenu__list">
        {items.map((item, i) =>
          item.links ? (
            <BaseNav.Item key={i} value={String(i)}>
              <BaseNav.Trigger
                className="prism-navmenu__trigger"
                disabled={item.disabled}
                data-disabled={item.disabled || undefined}
              >
                {item.label}
                <span className="prism-navmenu__chevron">
                  <ChevronDown />
                </span>
              </BaseNav.Trigger>
              <BaseNav.Content className="prism-navmenu__content">
                <div className="prism-navmenu__grid">
                  {item.links.map((link, j) => (
                    <BaseNav.Link
                      key={j}
                      href={link.href ?? "#"}
                      className="prism-navmenu__link"
                      onClick={onLinkClick}
                    >
                      <span className="prism-navmenu__link-label">{link.label}</span>
                      {link.description != null && (
                        <span className="prism-navmenu__link-desc">
                          {link.description}
                        </span>
                      )}
                    </BaseNav.Link>
                  ))}
                </div>
              </BaseNav.Content>
            </BaseNav.Item>
          ) : (
            <BaseNav.Item key={i} value={String(i)}>
              <BaseNav.Link
                className="prism-navmenu__trigger"
                href={item.href ?? "#"}
                onClick={onLinkClick}
              >
                {item.label}
              </BaseNav.Link>
            </BaseNav.Item>
          ),
        )}
      </BaseNav.List>
      <BaseNav.Portal>
        <BaseNav.Positioner
          className="prism-lift prism-navmenu__positioner"
          align="start"
          sideOffset={10}
          collisionPadding={16}
        >
          <BaseNav.Popup className="prism-surface prism-pop prism-popup prism-navmenu__popup">
            <BaseNav.Viewport className="prism-navmenu__viewport" />
          </BaseNav.Popup>
        </BaseNav.Positioner>
      </BaseNav.Portal>
    </BaseNav.Root>
  );
}
