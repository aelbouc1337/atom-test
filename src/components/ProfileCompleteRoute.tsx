// components/ProfileCompleteRoute.tsx
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "@/store";
import { useEffect, ReactNode } from "react";

interface ProfileCompleteRouteProps {
  children: ReactNode;
}

const ProfileCompleteRoute: React.FC<ProfileCompleteRouteProps> = ({
  children,
}) => {
  const router = useRouter();
  const userProfile = useSelector((state: RootState) => state.auth.userProfile);

  const isProfileComplete =
    userProfile.firstName &&
    userProfile.lastName &&
    userProfile.address &&
    userProfile.phoneNumber;

  useEffect(() => {
    if (!isProfileComplete) {
      router.push("/Profil");
    }
  }, [isProfileComplete, router]);

  return isProfileComplete ? <>{children}</> : null;
};

export default ProfileCompleteRoute;
