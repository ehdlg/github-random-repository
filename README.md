# Random Repo

![Random Repo](https://i.imgur.com/2W1A4dA.png)

This project is based on the [roadmap.sh GitHub random repository project](https://roadmap.sh/projects/github-random-repo) from the frontend section. It is designed to introduce you to working with external APIs, handling asynchronous requests, and managing different UI states.

## Live Preview

You can view a live preview of the project [here](https://github-random-repository.vercel.app/)

## Objectives

The main goals of this project were to refresh my knowledge fetching data from external APIs with React and styling with Tailwind. However, due to the limitaions of the GitHub API, the project evolved to focus on implementing a caching system to avoid hitting the API limits. This change made the "Refresh" functionality and changing language almost instantaneous without the need to make additional API requests, which became the top priority after discovering the issue.

## Features

- Select a programming language from a dropdown menu.
- Fetch and display a random repository using the GitHub Repository Search API.
- Display the repository name, description, stars, forks, and open issues.
- Handle loading and error states.
- Allow users to fetch another random repository with a "Refresh" button.

## Problem Solved: API Request Limit

During the development of this app, I encountered GitHub API's Search short rate limit (even when using an API token). This limited the ability to continuously request new repositories, affecting the "Refresh" functionality for the same programming language or fetching a new one.

### Solution: Caching with a Custom Hook

To address this, I prioritized implementing a custom React hook that caches repository data after the first API request. Instead of fetching a new repository on each button click, the app fetches a larger set of repositories initially and stores them in cache (using `localStorage` for now). This approach checks if there are cached repositoies for the selected programming language; if they exist, the app retrieves them from cache rather than making an additional API call. This allows the "Refresh" functionality to work almost instantly, whether for the same language or when switching to other languages.

- **First Load**: The app fetches multiple repositories at once for the selected programming language and caches them in the browser's `localStorage`.
- **Subsequent Loads**: When the user clicks "Refresh" or switches to another language the app checks and pulls the next repository from the cache rather than hitting the API again.
- **Future Plans**: I plan to implement a more robust caching system using Redis, as `localStorage` has size limitations, which was another challenge I faced during development.

## Technologies Used

- **React**: For building the user interface and managing state.
- **Tailwind**: For styling.
- **GitHub Repository Search API**: To fetch repositories based on the selected language.
- **localStorage**: To cache repository data and reduce the number of API calls.
- **React-Select**: For the language dropdown component.
- **SWR**: For data fetching.
