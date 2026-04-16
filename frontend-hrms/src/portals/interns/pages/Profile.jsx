import Header from "../../../common/components/layout/Header";
import ProfileView from "../../../common/components/profile/ProfileView";
import { useAuth } from "../../../contexts/AuthContext";

export default function Profile() {
  const { currentUser } = useAuth();

  if (!currentUser) return <p>Loading...</p>;

  return (
    <>
      <Header title="Profile" subtitle="Profile Overview" />

      <div className="p-6">
        <ProfileView user={currentUser} mode="intern" />
      </div>
    </>
  );
}
