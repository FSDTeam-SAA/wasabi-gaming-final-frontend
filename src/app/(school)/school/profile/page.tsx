import SubscriptionGuard from '@/components/shared/SubscriptionGuard'
import SchoolProfile from "@/components/school/SchoolProfile";

export const metadata = {
    title: "School Profile | Aspiring",
    description: "Manage your institution's profile and security settings.",
};

export default function ProfilePage() {
    return (
        <SubscriptionGuard requireSubscription={true} requireLogin={true}>
            <main className="max-w-[1600px] mx-auto">
                <SchoolProfile />
            </main>
        </SubscriptionGuard>
    );
}
