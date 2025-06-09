import Banner from "@/components/Banner";
import CreateAccountBanner from "@/components/CreateAccountBanner";
import FindBySpeciality from "@/components/FindBySpeciality";
import TopDoctors from "@/components/TopDoctors";

export default function Home() {
  return (
    <>
      <Banner />
      <FindBySpeciality />
      <TopDoctors/>
      <CreateAccountBanner/>
    </>
  );
}
