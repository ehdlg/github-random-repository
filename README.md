# Random Repo

![Random Repo](https://i.imgur.com/2W1A4dA.png)

This project is based on the [roadmap.sh GitHub random repository project](https://roadmap.sh/projects/github-random-repo) from the frontend section. It is designed to introduce you to working with external APIs, handling asynchronous requests, and managing different UI states.

## Live Preview

You can view a live preview of the project [here](https://github-random-repository.vercel.app/). Note that the live version currently uses localStorage for caching due to hosting limitations.

## Objectives

The main goals of this project were to refresh my knowledge fetching data from external APIs with React and styling with Tailwind. However, due to the limitaions of the GitHub API, the project evolved to focus on implementing a caching system to avoid hitting the API limits. This change made the "Refresh" functionality and changing language almost instantaneous without the need to make additional API requests, which became the top priority after discovering the issue.

## Features

- Select a programming language from a dropdown menu.
- Fetch and display a random repository using the GitHub Repository Search API.
- Display the repository name, description, stars, forks, and open issues.
- Handle loading and error states.
- Allow users to fetch another random repository with a "Refresh" button.
- Caching: Now supports both `localStorage` and `Redis` for caching repository data.

## Problem Solved: API Request Limit

During the development of this app, I encountered GitHub API's Search short rate limit (even when using an API token). This limited the ability to continuously request new repositories, affecting the "Refresh" functionality for the same programming language or fetching a new one.

### Solution: Caching with a Custom Hook

To address this, I implemented a custom React hook that caches repository data after the first API request. The app fetches a larger set of repositories initially and stores them in cache. Depending on the configuration, it uses either localStorage or Redis.

- **First Load**: The app fetches multiple repositories at once for the selected programming language and caches them in the browser's `localStorage`.
- **Subsequent Loads**: When the user clicks "Refresh" or switches to another language the app checks and pulls the next repository from the cache rather than hitting the API again.
- **Backend Implementation**: A backend has been implemented using Node.js and TypeScript to manage caching with Redis. However, due to hosting limitations, the live preview utilizes localStorage. Additionally, I have created a backend using Python and Flask. Due to the simplicity of the backend, I saw it as a great opportunity to practice
- **Testing Redis:** To test the Redis implementation, clone the repository and configure the .env file to use Redis either locally or with Redis Cloud.

## Technologies Used

- **TypeScript**: Main language used for the React frontend and Node backend
- **React**: For building the user interface and managing state.
- **Tailwind**: For styling.
- **GitHub Repository Search API**: To fetch repositories based on the selected language.
- **localStorage**: To cache repository data and reduce the number of API calls.
- **React-Select**: For the language dropdown component.
- **SWR**: For data fetching.
- **Redis**: For data caching.
- **Python and Flask**: For implementing an alternative backend.
