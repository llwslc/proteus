import { NavigationMenu as BaseNav } from "@base-ui/react/navigation-menu";
import { cx } from "../cx";
import type { MouseEvent, ReactNode } from "react";
import { ChevronDownIcon } from "../icons";
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
    <BaseNav.Root className={cx("nocturne-navmenu", className)} {...props}>
      <BaseNav.List className="nocturne-navmenu__list">
        {items.map((item, i) =>
          item.links ? (
            <BaseNav.Item key={i} value={String(i)}>
              <BaseNav.Trigger
                className="nocturne-seg__btn nocturne-navmenu__trigger"
                disabled={item.disabled}
                data-disabled={item.disabled || undefined}
              >
                {item.label}
                <span className="nocturne-navmenu__chevron">
                  <ChevronDownIcon />
                </span>
              </BaseNav.Trigger>
              <BaseNav.Content className="nocturne-navmenu__content">
                <div className="nocturne-navmenu__grid">
                  {item.links.map((link, j) => (
                    <BaseNav.Link
                      key={j}
                      href={link.href ?? "#"}
                      className="nocturne-navmenu__link"
                      onClick={onLinkClick}
                    >
                      <span className="nocturne-navmenu__link-label">{link.label}</span>
                      {link.description != null && (
                        <span className="nocturne-navmenu__link-desc">
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
                className="nocturne-seg__btn nocturne-navmenu__trigger"
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
          className="nocturne-elevation nocturne-navmenu__positioner"
          align="start"
          sideOffset={10}
          collisionPadding={16}
        >
          <BaseNav.Popup className="nocturne-surface nocturne-unveil nocturne-popup nocturne-navmenu__popup">
            <BaseNav.Viewport className="nocturne-navmenu__viewport" />
          </BaseNav.Popup>
          <BaseNav.Arrow className="nocturne-connector" />
        </BaseNav.Positioner>
      </BaseNav.Portal>
    </BaseNav.Root>
  );
}
