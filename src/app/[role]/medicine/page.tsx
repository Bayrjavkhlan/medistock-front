"use client";

import AbilityGuard from "@/components/AbilityGuard";
import StateView from "@/components/core/StateView";

export default function MedicinePage() {
  return (
    <AbilityGuard action="read" subject="Pharmacy_Medicine">
      <StateView
        title="Өгөгдөл байхгүй байна"
        description="Одоогоор харагдах эмийн мэдээлэл алга."
      />
    </AbilityGuard>
  );
}
