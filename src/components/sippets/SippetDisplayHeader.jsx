import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Dot } from "../utilities/Dot";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { SippetsContext } from "../../context/sippetsContext";

import {
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/outline";
import { ConfirmModal } from "../common/ConfirmModal";
import { toast } from 'react-toastify'
import { ImageComp } from "../common/ImageComp";
import instance from "../../services/axios";

export const SippetDisplayHeader = ({ sippet, toastAuthor = null }) => {
  const navigate = useNavigate();

  const { user, loggedIn } = useContext(UserContext);
  const { setFollowingSippets } = useContext(SippetsContext)

  const { id } = useParams();

  const [followed, setFollowed] = useState(() => sippet.followed);
  const [modal, setModal] = useState(false)

  const getRandomColor = () => {
    const midRangeColors = [
      "#89CFF0",
      "#0000FF",
      "#7393B3",
      "#088F8F",
      "#0096FF",
      "#0047AB",
      "#6495ED",
      "#1434A4",
      "#1F51FF",
      "#4169E1",
      "#4682B4",
    ];

    const randomIndex = Math.floor(Math.random() * midRangeColors.length);
    return midRangeColors[randomIndex];
  };

  const randomColor = getRandomColor();

  const handleFollow = async () => {
    if (!loggedIn) return;
    try {
      if (sippet.author._id == user._id) throw new Error("Cannot follow self");
      const { data } = await instance.put(`/protected/user/follow/${sippet.author._id}`,
        {},
        { withCredentials: true }
      );
      if (data.op === "del") {
        setFollowed(false);
        toast.success('Updated successfully')
      } else if (data.op === "add") {
        setFollowed(true);
      }
      setFollowingSippets([])
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (e, cb) => {
    cb();
    e.stopPropagation();
  };

  useEffect(() => {
    setFollowed(sippet.followed);
  }, [sippet.followed]);

  return (
    <header className="py-2 flex flex-col items-end">
      {modal && <ConfirmModal
      onAction={handleFollow} onClose={() => setModal(false)} text={'Are you sure you want to unfollow ' + sippet.author.username + '?'} />}
      {toastAuthor && (
        <button
          onClick={(e) =>
            handleClick(e, () => navigate(`/user/${toastAuthor._id}`))
          }
          className="pb-4 flex items-center space-x-2 text-slate-500"
        >
          <p>toasted by {toastAuthor.username}</p>
          <ArrowPathRoundedSquareIcon className="w-5 h-5" />
        </button>
      )}
      <article className="w-full flex justify-between items-center">
        {loggedIn && sippet._id == id && user._id != sippet.author._id && (
          <button
            onClick={(e) => followed ? setModal(true) : handleFollow()}
            className={`rounded-full text-neutral-300 w-20 h-8 border border-neutral-700 active:scale-95 shadow-slate-100 duration-300 ${
              loggedIn && followed ? "bg-neutral-800" : "bg-neutral-700"
            }`}
          >
            {loggedIn && followed ? "following" : "follow"}
          </button>
        )}

        <div className="grow"></div>
        <section className="flex items-center justify-end space-x-1">
          <p className="text-slate-400 text-xs">
            {moment(sippet.createdAt).fromNow()}
          </p>
          <Dot w={8} />
          <p className=" p-1">{sippet.author.username}</p>
          <Dot w={8} />
          <button
            onClick={(e) =>
              handleClick(e, () => navigate(`/user/${sippet.author._id}`))
            }
            style={{
              backgroundColor: "#6699FF",
            }}
            className={
              "h-10 w-10 md:h-14 md:w-14 rounded overflow-clip flex items-center justify-center"
            }
          >
            {/* {user?.image ?
            <ImageComp url={sippet.author.image.replace('upload/', 'upload/c_fill,h_200,w_200/')} /> : 
            <p className="font-bold ">
              {sippet.author.username.charAt(0).toUpperCase()}
            </p>} */}
          </button>
        </section>
      </article>
    </header>
  );
};
