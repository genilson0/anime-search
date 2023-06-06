import { useState, useEffect } from "react";
import { adjustingScore } from "./extra_functions";

export default function Season() {
  const [seasonInfo, setSeasonInfo] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/seasons/now?q=&page=${page}`).then(
      (response) =>
        response.json().then((response) => {
          setSeasonInfo(seasonInfo.concat(response.data));
          if (response.pagination.has_next_page) {
            setPage(page + 1);
          }
        })
    );
  }, [page]);

  const sorted_seasonInfo = [...seasonInfo].sort((a, b) => b.score - a.score); // Sorting the array using the score.

  return (
    <div className="my-3">
      <h1 className="text-center current-season">CURRENT SEASON</h1>
      {sorted_seasonInfo && (
        <div className="container">
          <div className="row row-cols-1 gap-3">
            {sorted_seasonInfo.map((season) => (
              <div className="col" key={season.mal_id}>
                <div className="content-main text-center gy-4">
                  <a className="season-title" href={season.url} target="_blank">
                    {season.title}
                  </a>
                </div>
                <div className="content-secondary">
                  <img
                    className="rounded float-start img-thumbnail season-image"
                    src={season.images.jpg.image_url}
                    alt={season.title}
                  />
                  <div className="season-synopsis">{season.synopsis}</div>
                  <div className="season-informations">
                    <div>
                      &#x2B50;{" "}
                      {!season.score ? "N/A" : adjustingScore(season.score)}
                    </div>
                    <div>Source: {season.source}</div>
                    <div>{season.type}</div>
                    <div>{season.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
