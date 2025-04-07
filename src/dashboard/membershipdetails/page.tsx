import MembershipCardSection from "@/components/Dashboard/Memberships/Membership Details/MembershipCardSection";
import { authOptions } from "@/components/Helper/nextAuthConst";
import { getCurrentMembership } from "@/prisma/user";
import { getServerSession } from "next-auth";
async function getData() {
  const session = await getServerSession(authOptions);
  let membership = null;
  if (session) {
    membership = await getCurrentMembership(session.user.id);
  }
  return {
    session: session,
    membership,
  };
}
export default async function MembershipDetails() {
  const { session, membership } = await getData();
  if (session) {
    return <MembershipCardSection membership={membership} session={session} />;
  } else {
  }
}
