// components/UserInitializer.tsx
"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useUserStore } from "@/store/userStore";
import { useAppContext } from "@/context/app";

const UserInitializer = () => {
  const { user, isSignedIn } = useUser();
  const { setUser, clearUser } = useUserStore();
  const { setLoading } = useAppContext();

  useEffect(() => {
    if (isSignedIn && user) {
      setUser({
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
        name: user.fullName || "",
        avatarUrl: user.imageUrl,
      });
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    if (!user) {
      clearUser();
    }
  }, [isSignedIn, user]);

  return null;
};

export default UserInitializer;
