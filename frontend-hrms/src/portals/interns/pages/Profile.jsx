import Header from "../../../common/components/layout/Header";
import ProfileView from "../../../common/components/profile/ProfileView";

export default function Profile() {
  {
    /* Temporary User Data */
  }
  const user = {
    id: 1,
    name: "John Doe",
    role: "Intern",
    email: "johndoe@gmail.com",

    personal: {
      firstName: "John",
      lastName: "Doe",
      phone: "0912345678",
      email: "companyemail@gmail.com",
      birth: "01/01/2000",
      status: "Single",
      gender: "Male",
      nationality: "Filipino",
      address: "Address",
      city: "City",
      zip: "Zip Code",
    },

    school: {
      university: "FEU",
      course: "Bachelore of Science in Computer Science",
      hours: "120 hours",
      duration: "Feb 16, 2026 - May 30, 2026",
      year: "4th Year",
      graduation: "July 2026",
    },

    documents: [
      "Resume.pdf",
      "MOA.pdf",
      "NDA.pdf",
      "ID.pdf",
      "Endoresement letter.pdf",
      "Certificate of Acceptance.pdf",
    ],
  };

  return (
    <>
      <Header title="Profile" subtitle="Profile Overview" />

      <div className="p-6">
        <ProfileView user={user} mode="intern" />
      </div>
    </>
  );
}
