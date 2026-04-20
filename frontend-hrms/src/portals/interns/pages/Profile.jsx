import Header from "../../../common/components/layout/Header";
import ProfileView from "../../../common/components/profile/ProfileView";
import { useAuth } from "../../../contexts/AuthContext";

export default function Profile() {
  const { currentUser } = useAuth();

  if (!currentUser) return <p>Loading...</p>;

  return (
    <>
      <div className="px-6 pb-3">
        <ProfileView user={currentUser} mode="intern" />
      </div>
    </>
  );
}
