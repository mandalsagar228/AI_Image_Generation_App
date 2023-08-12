import { useState } from "react";
import PropTypes from "prop-types";

import { Loader, Card, FormField } from "../Components";

const RenderCard = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return (
    <h2 className="mt-5 font-bold  text-[#6449f1] text-xl uppercase">
      {title}
    </h2>
  );
};

RenderCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPost, setAllPost] = useState(null);
  const [searchText, setSearchText] = useState("something");
  return (
    <>
      <section className="max-w-7xl  mx-auto">
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px] ">
            The Community Showcase
          </h1>
          <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
            Browse through the colection of imaginative & visually stunning
            images generated by DALL-E .
          </p>
        </div>
        <div className="mt-16">
          <FormField />
        </div>
        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center items-center ">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h1 className=" font-medium text-[#666e75]  text-xl mb-3">
                  Showing result for &nbsp;
                  <span className="text-[#222328]">{searchText} </span>
                </h1>
              )}
              <div className="grid lg:grid-cols-4 sm:grid col-span-3 xs:grid-cols-2 grid-cols-1  gap-3">
                {searchText ? (
                  <RenderCard data={[1, 2, 3]} title="No search result found" />
                ) : (
                  <RenderCard data={[]} title="No post found" />
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};
export default Home;
