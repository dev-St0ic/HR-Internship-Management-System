import { navigation } from "../../../common/config/navigation";
import SharedSidebar from "../../../common/components/layout/Sidebar";

export default function Sidebar({ links }) {
  const sidebarLinks = links ?? navigation.intern;

  return (
    <SharedSidebar links={sidebarLinks} />
  );
}
