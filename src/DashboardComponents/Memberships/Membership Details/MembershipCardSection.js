"use client";
import {Image,Button} from "@mui/material";

const MembershipCardSection = ({
  session,
  membership,
}) => {
 const checkValidity = () => {
    if (membership) {
      const startDate = new Date(membership.startDate);
      const endDate = new Date(membership.endDate);
      const currentDate = new Date();
      return currentDate >= startDate && currentDate <= endDate;
    }
    return false;
  };
  const cancelMembership = async () => {
    console.log("Cancel Membership");
    if (!membership) {
      alert("No Membership To Cancel");
      return;
    }
  };
  return membership ? (
    <div className=" text-themeblack w-full text-center">
      <div className="flex justify-between">
        <div className="text-base font-medium">Membership Card</div>
        {!membership.isCancelled && (
          <div>
            <Button
              type="button"
              className="rounded-2xl font-bold hover:scale-105 transition-all duration-100"
              onClick={cancelMembership}
            >
              Cancel Membership
            </Button>
          </div>
        )}
      </div>
      <hr className="my-2" />
      <div className="px-2">
        <div className="w-full md:w-[600px] h-[300px] bg-primary rounded-lg p-1 flex justify-center items-center relative overflow-hidden">
          {!checkValidity() && (
            <div className="expired-band">
              <div className="expired-text">Expired</div>
            </div>
          )}
          <div className="membership-inner">
            <div className="mt-4">
              <Image
                className="mx-auto rounded-full"
                src={
                  session.user.avatar != "" && session.user.avatar != "avatar"
                    ? session.user.avatar
                    : "/assets/placeholder/user_placeholder.jpg"
                }
                alt="Ummati Community"
                width={100}
                height={100}
              />
            </div>
            <div className=" uppercase text-xl font-bold">
              {session.user.firstName} {session.user.lastName}
            </div>
            <div className="membership-section">
              <div className="membership-section-inner">
                <div className="">
                  <span className="font-weight-bold membership-header">
                    Membership Start&nbsp;&nbsp;&nbsp;&nbsp;:
                  </span>{" "}
                  {checkValidity() && membership.startDate}
                </div>
                <div className="mb-4">
                  <span className="font-weight-bold membership-header">
                    Membership Expiry&nbsp;:
                  </span>{" "}
                  {checkValidity() && membership.endDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div>
          Status :{" "}
          {membership.isCancelled ? (
            <span className="font-bold text-red-600">Cancelled</span>
          ) : (
            <span className="font-bold text-green-600">Active</span>
          )}
        </div>
        {membership.isCancelled && (
          <div>
            Cancellation Reason :{" "}
            {membership.cancelReason && membership.cancelReason}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div>No Memberships</div>
  );
};
export default MembershipCardSection;
