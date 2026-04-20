import Header from "../../../common/components/layout/Header";
import ProfileView from "../../../common/components/profile/ProfileView";
import { useAuth } from "../../../contexts/AuthContext";
import { useLocation } from "react-router-dom";

export default function Profile() {
  const { currentUser } = useAuth();
  const location = useLocation();

  //If you are coming from MyInterns, use selected intern
  const selectedIntern = location.state?.intern;

  //If no selected intern, this will fallbaack to the logged in user
  const user = selectedIntern || currentUser;

  //This will Determine the Mode
  const mode = selectedIntern ? currentUser?.role : "INTERN";

  return (
    <>
      <div className="px-6 pb-3">
        <ProfileView user={user} mode={mode} />
      </div>
    </>
  );
}
