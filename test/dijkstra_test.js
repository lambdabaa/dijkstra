var Graph = require('../index').Graph,
    dijkstra = require('../index').dijkstra;

suite('dijkstra', function() {
  var subject, a, b, c, d, e, f;

  setup(function() {
    /**
     *   b - c
     *  /   / \
     * a - d - f
     *  \ /   /
     *   e ---
     */
    subject = new Graph();
    subject.addVertex(a = { 1: 2 });
    subject.addVertex(b = { 3: 4 });
    subject.addVertex(c = { 5: 6 });
    subject.addVertex(d = { 7: 8 });
    subject.addVertex(e = { 9: 10 });
    subject.addVertex(f = { 11: 12 });
    subject.addEdge(a, b, 5);
    subject.addEdge(a, d, 5);
    subject.addEdge(a, e, 5);
    subject.addEdge(b, c, 5);
    subject.addEdge(c, d, 5);
    subject.addEdge(c, f, 5);
    subject.addEdge(d, e, 5);
    subject.addEdge(d, f, 1);
    subject.addEdge(e, f, 5);
  });

  test('should find the shortest paths', function() {
    var result = dijkstra(subject, a);
    var expected = {};
    expected[JSON.stringify(b)] = a;
    expected[JSON.stringify(c)] = b;
    expected[JSON.stringify(d)] = a;
    expected[JSON.stringify(e)] = a;
    expected[JSON.stringify(f)] = d;

    assert.deepEqual(result, expected);
  });
});
