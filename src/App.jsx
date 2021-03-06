import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTokenFromResponse } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { authenticateUser, setToken, selectToken } from "./store/reducers/user";
import { setDiscoverWeekly } from "./store/reducers/discoverWeekly";
import { setPlaylists } from "./store/reducers/playlists";
import Login from "./pages/login";
import Home from "./pages/home";
import NotFound from "./pages/not-found";

const spotify = new SpotifyWebApi();

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      spotify.setAccessToken(_token);

      spotify.getUserPlaylists().then((playlists) => {
        dispatch(setPlaylists(playlists.items));
      });

      spotify.getMe().then((user) => dispatch(authenticateUser(user)));

      dispatch(setToken(_token));

      spotify
        .getPlaylist("37i9dQZEVXcJZyENOWUFo7")
        .then((res) => dispatch(setDiscoverWeekly(res)));
    }
  }, []);

  if (!token) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
};

export default App;
