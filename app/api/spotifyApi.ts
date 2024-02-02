"use client";
import config from "./config";

export const getNewReleases = async (accessToken: string) => {
  const response = await fetch(`${config.api.baseUrl}/browse/new-releases`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await response.json();
  return data;
};

export const getAccessToken = async () => {
  var authParameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "grant_type=client_credentials&client_id=" +
      config.api.clientId +
      "&client_secret=" +
      config.api.clientSecret,
  };

  const result = await fetch(
    "https://accounts.spotify.com/api/token",
    authParameters
  );
  const data = await result.json();
  return data;
};

export const getUserPlaylists = async (accessToken: any) => {
  const response = await fetch(
    `${config.api.baseUrl}/users/smedjan/playlists`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  const userPlaylistsData = await response.json();
  return userPlaylistsData;
};

export const getFeaturedPlaylists = async (accessToken: string) => {
  const response = await fetch(
    `${config.api.baseUrl}/browse/featured-playlists`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  const data = await response.json();
  return data;
};

export const getSearchItems = async (accessToken: string, query: string) => {
  const response = await fetch(
    "https://api.spotify.com/v1/search?" +
      new URLSearchParams({
        q: query,
        type: ["artist", "playlist", "track"].join(","),
      }),
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const getArtist = async (accessToken: any, id: string) => {
  const response = await fetch(`${config.api.baseUrl}/artists/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const artistData = await response.json();
  return artistData;
};

export const getArtistTracks = async (accessToken: any, id: string) => {
  const response = await fetch(
    `${config.api.baseUrl}/artists/${id}/top-tracks?` +
      new URLSearchParams({ market: "ES" }),
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  const artistTracksData = await response.json();
  return artistTracksData;
};

export const getPlaylistById = async (accessToken: any, id: string) => {
  const response = await fetch(`${config.api.baseUrl}/playlists/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const data = await response.json();
  return data;
};

export const getPlaylistTrackById = async (accessToken: any, id: string) => {
  const response = await fetch(
    `${config.api.baseUrl}/playlists/${id}/tracks?` +
      new URLSearchParams({ market: "ES" }),
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  const data = await response.json();
  return data;
};
