Navigating Cities - A Geospatial Adventure with A* Algorithm
This project implements the A* algorithm to find the shortest path between cities in Egypt using geospatial coordinates. The cities and their connections are represented as an adjacency list, and the Haversine formula is utilized as the heuristic function for estimating distances between cities.

Files and Structure
index.js: JavaScript file containing the graph representation, A* algorithm implementation, and the Haversine formula.
index.html: HTML file for the user interface, allowing users to input start and goal cities, displaying the results, and showing the path on a Google Map.
README.md: This file, providing information about the project.
How to Use
Open index.html in a web browser.
Enter the start and goal cities when prompted.
Click the "Show Map" button to display the shortest path on Google Maps.
Results, including the path and total cost, will be shown below the map.
Additional Information
The project uses the Haversine formula to calculate distances between cities based on their latitude and longitude.
A* algorithm is employed to find the shortest path, considering both the actual cost and the heuristic estimate.
The Google Maps API is utilized to visualize the path on a map.
Important Note
The calculated distances are estimations and may vary due to dynamic factors. This project is for educational and illustrative purposes.

Credits
Google Maps API: Google Maps JavaScript API
Haversine Formula: Haversine Formula - Wikipedia
Feel free to explore and enhance the project as needed!
