import { NavigationMenu as BaseNav } from "@base-ui/react/navigation-menu";
import type { MouseEvent, ReactNode } from "react";
import { ChevronDownIcon, SealIcon } from "../icons";
import "./NavigationMenu.css";

export interface NavMenuLink {
  label: ReactNode;
  description?: ReactNode;
  href?: string;
}

export interface NavMenuItem {
  label: string;
  href?: string;
  links?: NavMenuLink[];
}

export interface NavigationMenuProps {
  items: NavMenuItem[];
  onLinkClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

function MarkerSigil() {
  return <SealIcon className="sumi-navmenu__mark" aria-hidden />;
}

export function NavigationMenu({ items, onLinkClick }: NavigationMenuProps) {
  return (
    <BaseNav.Root className="sumi-navmenu">
      <BaseNav.List className="sumi-navmenu__list">
        {items.map((item) =>
          item.links ? (
            <BaseNav.Item key={item.label}>
              <span className="sumi-navmenu__triggerwrap">
                <BaseNav.Trigger className="sumi-navmenu__trigger">
                  {item.label}
                  <BaseNav.Icon className="sumi-navmenu__chevron">
                    <ChevronDownIcon />
                  </BaseNav.Icon>
                </BaseNav.Trigger>
              </span>
              <BaseNav.Content className="sumi-navmenu__content">
                <ul className="sumi-navmenu__grid">
                  {item.links.map((link, i) => (
                    <li key={i}>
                      <BaseNav.Link
                        href={link.href ?? "#"}
                        className="sumi-navmenu__link"
                        onClick={onLinkClick}
                      >
                        <MarkerSigil />
                        <span className="sumi-navmenu__link-text">
                          <span className="sumi-navmenu__link-title">{link.label}</span>
                          {link.description != null ? (
                            <span className="sumi-navmenu__link-desc">
                              {link.description}
                            </span>
                          ) : null}
                        </span>
                      </BaseNav.Link>
                    </li>
                  ))}
                </ul>
              </BaseNav.Content>
            </BaseNav.Item>
          ) : (
            <BaseNav.Item key={item.label}>
              <BaseNav.Link
                href={item.href ?? "#"}
                className="sumi-navmenu__toplink"
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
          className="sumi-elevation sumi-navmenu__positioner"
          sideOffset={10}
          collisionPadding={16}
        >
          <BaseNav.Popup className="sumi-pop sumi-frame sumi-navmenu__popup">
            <BaseNav.Viewport className="sumi-navmenu__viewport" />
          </BaseNav.Popup>
        </BaseNav.Positioner>
      </BaseNav.Portal>
    </BaseNav.Root>
  );
}
