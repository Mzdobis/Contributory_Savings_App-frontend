import { useEffect, useState } from "react";
import ViewGroupHeader from "../../components/ViewGroupHeader";
import GroupInfo from "../../components/GroupInfo";
import GroupPerformance from "../../components/GroupPerformance";
import cover from "../../assets/groupPic1.svg";
import banner from "../../assets/group_banner.svg";
import JoinGroupModal from "../../components/JoinGroupModal";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getSingleGroup } from "../../slices/createGroupSlice";

const ViewGroup = () => {
  const [showModal, setShowModal] = useState(false);
  const { Group } = useAppSelector((state) => state.groups);
  console.log(Group)

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSingleGroup())
  }, [dispatch]);



  const handleShow = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="mr-16 ml-4 mb-14">
      <ViewGroupHeader setShowModal={setShowModal} />

      {/* <div
      // style={{ backgroundImage: `url(${cover})` }}
      // className="w-full h-[260px] bg-cover bg-top"
      ></div> */}

      <div className="mb-6">
        <img className="hidden md:inline" src={banner} alt="" />
        <img className=" md:hidden w-full  " src={cover} alt="" />

        <p className="mt-5 text-base text-gray-500 font-normal tracking-wide ">
          Bros/Sis, no dull yourself for dis service year money mata. Join Lagos
          Corp Members Thrift Saving Group sharp-sharp! We go secure your money,
          make am grow well-well, and support each other for dis money journey.
          Learn money sense, plan for your future, and enjoy the benefits of our
          community. No time to waste, come join us now! Contact [07067482633].
          Make we flex our money together!
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between">
        <GroupInfo />
        <GroupPerformance />
      </div>

      <JoinGroupModal visible={showModal} onClose={handleShow} />
    </div>
  );
};

export default ViewGroup;
