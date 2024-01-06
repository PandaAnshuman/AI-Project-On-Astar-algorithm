// Define the graph as an adjacency list
var graph = {
  Cairo: {
    lat: 30.0444,
    lon: 31.2357,
    neighbors: [
      "Alexandria",
      "Aswan",
      "Luxor",
      "Giza",
      "Port Said",
      "Suez",
      "Ismailia",
      "Faiyum",
      "6th of October City",
    ],
  },
  Alexandria: {
    lat: 31.2001,
    lon: 29.9187,
    neighbors: ["Cairo", "Port Said", "Damanhur", "El Alamein", "Marsa Matruh"],
  },
  Aswan: {
    lat: 24.0889,
    lon: 32.8998,
    neighbors: ["Cairo", "Luxor", "Edfu", "Kom Ombo"],
  },
  Luxor: {
    lat: 25.6872,
    lon: 32.6396,
    neighbors: ["Cairo", "Aswan", "Qena", "Esna"],
  },
  "Port Said": {
    lat: 31.2653,
    lon: 32.3019,
    neighbors: ["Cairo", "Alexandria", "Ismailia", "Damietta"],
  },
  Giza: {
    lat: 30.0131,
    lon: 31.2089,
    neighbors: ["Cairo", "Faiyum", "6th of October City"],
  },
  Suez: {
    lat: 29.9737,
    lon: 32.5263,
    neighbors: ["Cairo", "Ismailia", "Hurghada"],
  },
  Ismailia: {
    lat: 30.6043,
    lon: 32.2723,
    neighbors: ["Cairo", "Port Said", "Suez"],
  },
  Faiyum: {
    lat: 29.3084,
    lon: 30.8428,
    neighbors: ["Cairo", "Giza", "Beni Suef"],
  },
  "6th of October City": {
    lat: 29.9381,
    lon: 30.9138,
    neighbors: ["Cairo", "Giza"],
  },
  // Add more nodes and edges here
  Damanhur: {
    lat: 31.0341,
    lon: 30.4682,
    neighbors: ["Alexandria", "Tanta", "Kafr El Sheikh"],
  },
  "El Alamein": {
    lat: 30.8176,
    lon: 28.945,
    neighbors: ["Alexandria", "Marsa Matruh"],
  },
  "Marsa Matruh": {
    lat: 31.3525,
    lon: 27.2453,
    neighbors: ["Alexandria", "El Alamein", "Siwa"],
  },
  Edfu: { lat: 24.9785, lon: 32.8758, neighbors: ["Aswan", "Luxor", "Asyut"] },
  "Kom Ombo": { lat: 24.4525, lon: 32.9282, neighbors: ["Aswan", "Edfu"] },
  Qena: {
    lat: 26.1615,
    lon: 32.7181,
    neighbors: ["Luxor", "Sohag", "Hurghada"],
  },
  Esna: { lat: 25.2934, lon: 32.554, neighbors: ["Luxor", "Qena"] },
  Damietta: {
    lat: 31.4165,
    lon: 31.8133,
    neighbors: ["Port Said", "Mansoura"],
  },
  "Beni Suef": { lat: 29.0744, lon: 31.0979, neighbors: ["Faiyum", "Minya"] },
  Tanta: {
    lat: 30.7885,
    lon: 31.0019,
    neighbors: ["Damanhur", "Mansoura", "Zagazig"],
  },
  "Kafr El Sheikh": {
    lat: 31.1143,
    lon: 30.9394,
    neighbors: ["Damanhur", "Tanta"],
  },
  Asyut: {
    lat: 27.181,
    lon: 31.1837,
    neighbors: ["Edfu", "Beni Suef", "Sohag"],
  },
  Hurghada: {
    lat: 27.2579,
    lon: 33.8116,
    neighbors: ["Suez", "Qena", "Safaga"],
  },
  Mansoura: {
    lat: 31.0364,
    lon: 31.3807,
    neighbors: ["Damietta", "Tanta", "Zagazig"],
  },
  Minya: {
    lat: 28.1099,
    lon: 30.7503,
    neighbors: ["Beni Suef", "Asyut", "El Minya"],
  },
  Zagazig: {
    lat: 30.5877,
    lon: 31.502,
    neighbors: ["Tanta", "Mansoura", "Ismailia"],
  },
  Sohag: {
    lat: 26.557,
    lon: 31.6948,
    neighbors: ["Qena", "Asyut", "El Balyana"],
  },
  Safaga: { lat: 26.7292, lon: 33.9365, neighbors: ["Hurghada", "Quseir"] },
  "El Minya": {
    lat: 28.0916,
    lon: 30.7522,
    neighbors: ["Minya", "El Balyana", "Mallawi"],
  },
  "El Balyana": {
    lat: 26.2324,
    lon: 31.3525,
    neighbors: ["Sohag", "El Minya", "Abydos"],
  },
  Mallawi: {
    lat: 27.7314,
    lon: 30.8416,
    neighbors: ["El Minya", "Asyut", "Amarna"],
  },
  Quseir: { lat: 26.1046, lon: 34.2778, neighbors: ["Safaga", "Marsa Alam"] },
  "Marsa Alam": { lat: 25.0661, lon: 34.8965, neighbors: ["Quseir", "Aswan"] },
  Siwa: { lat: 29.2041, lon: 25.5195, neighbors: ["Marsa Matruh"] },
  Abydos: { lat: 26.1856, lon: 31.9196, neighbors: ["El Balyana"] },
  Amarna: { lat: 27.6473, lon: 30.9475, neighbors: ["Mallawi"] },
};

//  heuristic function using the Haversine formula
function haversineDistance(node1, node2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(node2.lat - node1.lat); // deg2rad below
  var dLon = deg2rad(node2.lon - node1.lon);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(node1.lat)) *
      Math.cos(deg2rad(node2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// function that implements the A star algorithm
function aStar(start, goal) {
  // Initialize the open and closed lists
  var openList = [];
  var closedList = {};

  // Add the start node to the open list
  openList.push({
    name: start,
    cost: 0,
    heuristic: haversineDistance(graph[start], graph[goal]),
    parent: null,
  });

  // Loop until the open list is empty or the goal is found
  while (openList.length > 0) {
    // Pop the node with the lowest cost plus heuristic value from the open list
    var current = openList.shift();

    // If the current node is the goal node, then the path is found
    if (current.name === goal) {
      // Trace back the path from the goal node to the start node
      var path = [];
      var node = current;
      while (node !== null) {
        path.unshift(node.name);
        node = node.parent;
      }
      // Return the path and the cost
      return {
        path: path,
        cost: current.cost,
      };
    }

    // Otherwise, add the current node to the closed list, and expand its neighbors
    closedList[current.name] = true;
    var neighbors = graph[current.name].neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      // If the neighbor is not in the closed list, and is not a wall or an obstacle
      if (!closedList[neighbor]) {
        // Calculate its cost as the cost of the current node plus the distance to the neighbor
        var cost =
          current.cost +
          haversineDistance(graph[current.name], graph[neighbor]);
        // If the neighbor is not in the open list, or its cost is lower than the previous cost
        var index = openList.findIndex(function (node) {
          return node.name === neighbor;
        });
        if (index === -1 || cost < openList[index].cost) {
          // Update its cost, heuristic value, and parent pointer, and add it to the open list
          var heuristic = haversineDistance(graph[neighbor], graph[goal]);
          var node = {
            name: neighbor,
            cost: cost,
            heuristic: heuristic,
            parent: current,
          };
          openList.push(node);
          console.log(
            `Expanding neighbor ${neighbor}: G(n) = ${cost}, H(n) = ${heuristic}`
          );
          // Sort the open list by the cost plus heuristic value in ascending order
          openList.sort(function (a, b) {
            return a.cost + a.heuristic - (b.cost + b.heuristic);
          });
        }
      }
    }
  }

  // If the open list is empty and the goal is not found, return null
  return null;
}

// Call the function with the start and goal nodes as arguments
var startCity = prompt("Enter the start city:");
var goalCity = prompt("Enter the goal city:");
var result = aStar(startCity, goalCity);
var resultContainer = document.getElementById("resultContainer");

if (result) {
  // Create HTML content
  var htmlContent =
    "<p style='color: green;'>The shortest path is: " +
    result.path.join(" -> ") +
    "</p>";
  htmlContent +=
    "<p style='color: blue;'>The total cost is: " +
    result.cost.toFixed(2) +
    " km</p>";
  htmlContent +=
    "<p>We have meticulously computed this distance employing the precise Haversine Formula and A* Algorithm. This value represents an estimated cost, and it's important to note that the actual cost may vary due to dynamic factors</p>";

  resultContainer.innerHTML = htmlContent;
  console.log("The shortest path is: " + result.path.join(" -> "));
  console.log("The total cost is: " + result.cost.toFixed(2) + " km");
} else {
  console.log("No path found");
}
var startCityData = graph[startCity];
var goalCityData = graph[goalCity];
var h = haversineDistance(startCityData, goalCityData);
var g = 0;
console.log(`H(${startCity}) = ${h.toFixed(4)} km, G(${startCity}) = ${g}`);

function displayMap() {
  var startPointlat = startCityData.lat.toString();
  var StartCitylon = startCityData.lon.toString();
  var endPointlat = goalCityData.lat.toString();
  var endPointlon = goalCityData.lon.toString();

  var start = new google.maps.LatLng(startPointlat, StartCitylon);
  var end = new google.maps.LatLng(endPointlat, endPointlon);

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: start,
  });

  var path = new google.maps.Polyline({
    path: [start, end],
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  path.setMap(map);
}
