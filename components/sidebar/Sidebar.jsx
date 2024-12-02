import SidebarHeader from "@/components/sidebar/SidebarHeader";
import SidebarLinks from "@/components/navigation/SidebarLinks";

const Sidebar = () => {
  return (
    <div className="px-4 min-h-full bg-base-200 py-12 grid grd-rows-[auto,1fr,auto]">
      <SidebarHeader />

      <SidebarLinks />
    </div>
  );
};

export default Sidebar;
