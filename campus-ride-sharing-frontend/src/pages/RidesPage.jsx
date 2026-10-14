import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import RideCard from "../components/RideCard";
import "../styles/RidesPage.css";

import { api } from "../api";

function AllRides() {
  //const { rides } = useSelector((state) => state.rides);

  const [rides, setRides] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const filterType = searchParams.get("type") || "all"; //default all rides show

  const [search, setSearch] = useState("");

  // fetch rides from backend on load
  useEffect(() => {
    const fetchRides = async () => {
      const data = await api.getRides();
      setRides(data);
    };
    fetchRides();
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    if (value === "all") {
      setSearchParams({}); //remove the param from the url
    } else {
      setSearchParams({ type: value }); //will add ?type=offering to url
    }
  };

  const filteredRides = rides.filter((ride) => {
    const matchType = filterType === "all" || ride.type === filterType;
    const matchSearch =
      ride.pickup?.toLowerCase().includes(search.toLowerCase()) ||
      ride.destination?.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="rides-page">
      <h1 className="rides-title">Find Your Ride</h1>

      <div className="rides-filter">
        <input
          type="text"
          className="rides-search"
          placeholder="Search by location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="rides-dropdown"
          value={filterType}
          onChange={handleFilterChange}
        >
          <option value="all">All Rides</option>
          <option value="offering">Offering Rides</option>
          <option value="requesting">Requesting Rides</option>
        </select>
      </div>

      {filteredRides.length > 0 ? (
        <div className="rides-grid">
          {filteredRides.map((ride) => (
            <RideCard key={ride._id} ride={ride} />
          ))}
        </div>
      ) : (
        <div className="rides-empty">
          <p>No rides found. Try a different filter or search.</p>
        </div>
      )}
    </div>
  );
}

export default AllRides;
