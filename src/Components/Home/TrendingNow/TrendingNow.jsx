import { useState } from "react";
import useApi from "../../../Hooks/useApi";
import HomeCard from "../HomeCard/HomeCard";
import { ThreeDots } from "react-loader-spinner";
import LoaderSpinner from "../../LoaderSpinner/LoaderSpinner";

const TrendingNow = () => {
  const apiKey = import.meta.env.VITE_apiKey;
  const trendingMovieURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
  const trendingTvURL = `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`;
  const topRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
  const [url, setUrl] = useState(`${trendingMovieURL}`);
  const trendingFetchData = useApi(url);
  const topRatedFetchData = useApi(topRated);
  const setMovies = () => {
    setUrl(trendingMovieURL);
  };
  const setTv = () => {
    setUrl(trendingTvURL);
  };

  return (
    <div className="md:px-[10%] px-[5%] py-[2%]">
      <h1 className="font-semibold text-xl pb-[15px]">Trending Now</h1>
      <div className="flex gap-2">
        <button onClick={setMovies} className="btn-red">
          Movies
        </button>
        <button onClick={setTv} className="btn-black">
          TV-Shows
        </button>
      </div>
      <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-x-[6px] gap-y-[12px] place-items-center py-[25px] overflow-hidden">
        <>
          {topRatedFetchData?.loading ? (
            <>
              <LoaderSpinner></LoaderSpinner>
            </>
          ) : (
            <>
              {trendingFetchData?.datas?.results?.map((cate) => (
                <HomeCard cate={cate} key={cate?.backdrop_path}></HomeCard>
              ))}
            </>
          )}
        </>
      </div>

      <h1 className="font-semibold text-xl">Top Rated Movies</h1>
      <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-x-[6px] gap-y-[12px] place-items-center py-[25px] overflow-hidden">
        <>
          {topRatedFetchData?.loading ? (
            <>
              <LoaderSpinner></LoaderSpinner>
            </>
          ) : (
            <>
              {topRatedFetchData?.datas?.results?.map((cate) => (
                <HomeCard cate={cate} key={cate?.backdrop_path}></HomeCard>
              ))}
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default TrendingNow;
