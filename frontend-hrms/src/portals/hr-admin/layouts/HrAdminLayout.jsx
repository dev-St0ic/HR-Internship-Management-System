import LayoutTemplate from "../../../common/components/layout/LayoutTemplate";
import { hrAdminHeaderConfig } from "../../hr-admin/configs/hrAdminHeaderConfig";

export default function HrAdminLayout() {
  return <LayoutTemplate headerConfig={hrAdminHeaderConfig} />;
}
