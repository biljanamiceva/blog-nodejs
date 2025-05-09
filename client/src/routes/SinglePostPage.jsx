import React from "react";
import ImageComponent from "../components/ImageComponent";
import { Link, useParams } from "react-router-dom";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "timeago.js";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;
  if (!data) return "Post not found!";

  console.log("Post", data);

  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg: w-3/5 flex flex-col gap-8">
          <h1 className="text-x md:text3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-blue-800">{data.user.username}</Link>
            <span>on</span>
            <Link className="text-blue-800">{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-400 font-medium">{data.desc}</p>
        </div>
        {data.img && (
          <div className="hidden lg:block w-2/5">
            <ImageComponent
              src={data.img}
              alt="singlePost"
              w="600"
              className="rounded-2xl"
            />
          </div>
        )}
      </div>
      {/* content */}
      <div className=" flex flex-col md:flex-row gap-12">
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <div
            className="lg:text-lg flex flex-col gap-6 text-justify quill-content"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              {data.user.img && (
                <ImageComponent
                  src={data.user.img}
                  alt="userImage"
                  w="48"
                  h="48"
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <Link className="text-blue-800">{data.user.username}</Link>
            </div>
            <p className="text-sm text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="flex gap-2">
              <Link>
                <ImageComponent src="/facebook.svg" />
              </Link>
              <Link>
                <ImageComponent src="/instagram.svg" />
              </Link>
            </div>
          </div>
          <PostMenuActions post={data}/>
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline" to="/">
              All
            </Link>
            <Link className="underline" to="/">
              Web Design
            </Link>
            <Link className="underline" to="/">
              Development
            </Link>
            <Link className="underline" to="/">
              Databases
            </Link>
            <Link className="underline" to="/">
              Search Engines
            </Link>
            <Link className="underline" to="/">
              Marketing
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data._id} />
    </div>
  );
};

export default SinglePostPage;
