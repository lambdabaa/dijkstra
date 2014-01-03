var FibonacciHeap = require('fibonacci-heap').FibonacciHeap,
    deepEqual = require('deep-equal'),
    stringify = require('json-stable-stringify');

/**
 * @param {Graph} graph some graph.
 * @param {Object} source node to search from.
 */
function dijkstra(graph, source) {
  var queue = new FibonacciHeap();
  var dist = {},
      prev = {};
  dist[stringify(source)] = 0;
  graph.vertices.forEach(function(vertex) {
    var key = stringify(vertex);
    if (!deepEqual(vertex, source)) {
      dist[key] = Infinity;
      prev[key] = null;
    }

    queue.insert({ value: vertex, priority: dist[key] });
  });

  while (queue.trees() !== 0) {
    var next = queue.deleteMin().value;
    var nextKey = stringify(next);
    var neighbors = graph.neighbors(next);
    neighbors.forEach(function(neighbor) {
      var neighborKey = stringify(neighbor);
      var alt = dist[nextKey] + graph.distance(next, neighbor);
      if (alt < dist[neighborKey]) {
        dist[neighborKey] = alt;
        prev[neighborKey] = next;
        queue.update({ value: neighbor, priority: alt });
      }
    });
  }

  return prev;
}
module.exports.dijkstra = dijkstra;

/**
 * @constructor
 */
function Graph() {
  this.vertexToEdges = {};
}
module.exports.Graph = Graph;

Graph.prototype = {
  vertexToEdges: null,

  get vertices() {
    return Object.keys(this.vertexToEdges).map(function(vertex) {
      return JSON.parse(vertex);
    });
  },

  addVertex: function(vertex) {
    var key = stringify(vertex);
    this.vertexToEdges[key] = {};
  },

  addEdge: function(u, v, distance) {
    var ukey = stringify(u);
    var vkey = stringify(v);
    this.vertexToEdges[ukey][vkey] = distance;
    this.vertexToEdges[vkey][ukey] = distance;
  },

  distance: function(u, v) {
    var ukey = stringify(u);
    var vkey = stringify(v);
    return this.vertexToEdges[ukey][vkey];
  },

  neighbors: function(vertex) {
    var key = stringify(vertex);
    return Object.keys(this.vertexToEdges[key]).map(function(neighbor) {
      return JSON.parse(neighbor);
    });
  }
};
