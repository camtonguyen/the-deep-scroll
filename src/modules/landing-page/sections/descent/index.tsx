import { DescentDesktop } from "./descent-desktop";
import { DescentMobile } from "./descent-mobile";
import { placeItems } from "./place-items";

/** The descent, surface to seafloor: to scale on desktop, stacked on phones. */
export function Descent() {
  const items = placeItems();
  return (
    <>
      <DescentDesktop items={items} />
      <DescentMobile items={items} />
    </>
  );
}
