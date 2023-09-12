/**
 * Stores 20 example questions from Appendix 3.
 * Missing:
 * 1) Question ids (actual numbers, not for key)
 * 2) Question descriptions
 */

export const questionData = [
  {
    qid: 1,
    title: "Reverse a String",
    category: "Strings, Algorithms",
    complexity: "Easy",
  },
  {
    qid: 2,
    title: "Linked List Cycle Detection",
    category: "Data Structures, Algorithms",
    complexity: "Easy",
  },
  {
    qid: 3,
    title: "Roman to Integer",
    category: "Algorithms",
    complexity: "Easy",
  },
  {
    qid: 4,
    title: "Add Binary",
    category: "Bit Manipulation, Algorithms",
    complexity: "Easy",
  },
  {
    qid: 5,
    title: "Fibonacci Number",
    category: "Recursion, Algorithms",
    complexity: "Easy",
  },
  {
    qid: 6,
    title: "Implement Stack using Queues",
    category: "Data Structures",
    complexity: "Easy",
  },
  {
    qid: 7,
    title: "Combine Two Tables",
    category: "Databases",
    complexity: "Easy",
  },
  {
    qid: 8,
    title: "Repeated DNA Sequences",
    category: "Algorithms, Bit Manipulation",
    complexity: "Medium",
  },
  {
    qid: 9,
    title: "Course Schedule",
    category: "Data Structures, Algorithms",
    complexity: "Medium",
  },
  {
    qid: 10,
    title: "LRU Cache Design",
    category: "Data Structures",
    complexity: "Medium",
  },
  {
    qid: 11,
    title: "Longest Common Subsequence",
    category: "Strings, Algorithms",
    complexity: "Medium",
  },
  {
    qid: 12,
    title: "Rotate Image",
    category: "Arrays, Algorithms",
    complexity: "Medium",
  },
  {
    qid: 13,
    title: "Airplane Seat Assignment Probability",
    category: "Brainteaser",
    complexity: "Medium",
  },
  {
    qid: 14,
    title: "Validate Binary Search Tree",
    category: "Data Structures, Algorithms",
    complexity: "Medium",
  },
  {
    qid: 15,
    title: "Sliding Window Maximum",
    category: "Arrays, Algorithms",
    complexity: "Hard",
  },
  {
    qid: 16,
    title: "N-Queen Problem",
    category: "Algorithms",
    complexity: "Hard",
  },
  {
    qid: 17,
    title: "Serialize and Deserialize a Binary Tree",
    category: "Data Structures, Algorithms",
    complexity: "Hard",
  },
  {
    qid: 18,
    title: "Wildcard Matching",
    category: "Strings, Algorithms",
    complexity: "Hard",
  },
  {
    qid: 19,
    title: "Chalkboard XOR Game",
    category: "Brainteaser",
    complexity: "Hard",
  },
  {
    qid: 20,
    title: "Trips and Users",
    category: "Databases",
    complexity: "Hard",
  },
];

const questionDescriptions = [
  {
    qid: 1,
    description: `<div class="xFUwe" data-track-load="description_content"><p>Write a function that reverses a string. The input string is given as an array of characters <code>s</code>.</p>

      <p>You must do this by modifying the input array <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank">in-place</a> with <code>O(1)</code> extra memory.</p>
      
      <p>&nbsp;</p>
      <p><strong class="example">Example 1:</strong></p>
      <pre><strong>Input:</strong> s = ["h","e","l","l","o"]
      <strong>Output:</strong> ["o","l","l","e","h"]
      </pre><p><strong class="example">Example 2:</strong></p>
      <pre><strong>Input:</strong> s = ["H","a","n","n","a","h"]
      <strong>Output:</strong> ["h","a","n","n","a","H"]
      </pre>
      <p>&nbsp;</p>
      <p><strong>Constraints:</strong></p>
      
      <ul>
          <li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
          <li><code>s[i]</code> is a <a href="https://en.wikipedia.org/wiki/ASCII#Printable_characters" target="_blank">printable ascii character</a>.</li>
      </ul>
      </div>`,
  },
  {
    qid: 2,
    description: `<div class="xFUwe" data-track-load="description_content"><p>Given <code>head</code>, the head of a linked list, determine if the linked list has a cycle in it.</p>

      <p>There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the&nbsp;<code>next</code>&nbsp;pointer. Internally, <code>pos</code>&nbsp;is used to denote the index of the node that&nbsp;tail's&nbsp;<code>next</code>&nbsp;pointer is connected to.&nbsp;<strong>Note that&nbsp;<code>pos</code>&nbsp;is not passed as a parameter</strong>.</p>
      
      <p>Return&nbsp;<code>true</code><em> if there is a cycle in the linked list</em>. Otherwise, return <code>false</code>.</p>
      
      <p>&nbsp;</p>
      <p><strong class="example">Example 1:</strong></p>
      <img alt="" src="https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png" style="width: 300px; height: 97px; margin-top: 8px; margin-bottom: 8px;">
      <pre><strong>Input:</strong> head = [3,2,0,-4], pos = 1
      <strong>Output:</strong> true
      <strong>Explanation:</strong> There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
      </pre>
      
      <p><strong class="example">Example 2:</strong></p>
      <img alt="" src="https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test2.png" style="width: 141px; height: 74px;">
      <pre><strong>Input:</strong> head = [1,2], pos = 0
      <strong>Output:</strong> true
      <strong>Explanation:</strong> There is a cycle in the linked list, where the tail connects to the 0th node.
      </pre>
      
      <p><strong class="example">Example 3:</strong></p>
      <img alt="" src="https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test3.png" style="width: 45px; height: 45px;">
      <pre><strong>Input:</strong> head = [1], pos = -1
      <strong>Output:</strong> false
      <strong>Explanation:</strong> There is no cycle in the linked list.
      </pre>
      
      <p>&nbsp;</p>
      <p><strong>Constraints:</strong></p>
      
      <ul>
          <li>The number of the nodes in the list is in the range <code>[0, 10<sup>4</sup>]</code>.</li>
          <li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>
          <li><code>pos</code> is <code>-1</code> or a <strong>valid index</strong> in the linked-list.</li>
      </ul>
      
      <p>&nbsp;</p>
      <p><strong>Follow up:</strong> Can you solve it using <code>O(1)</code> (i.e. constant) memory?</p>
      </div>`,
  },
  {
    qid: 3,
    description: `<div class="xFUwe" data-track-load="description_content"><p>Roman numerals are represented by seven different symbols:&nbsp;<code>I</code>, <code>V</code>, <code>X</code>, <code>L</code>, <code>C</code>, <code>D</code> and <code>M</code>.</p>

      <pre><strong>Symbol</strong>       <strong>Value</strong>
      I             1
      V             5
      X             10
      L             50
      C             100
      D             500
      M             1000</pre>
      
      <p>For example,&nbsp;<code>2</code> is written as <code>II</code>&nbsp;in Roman numeral, just two ones added together. <code>12</code> is written as&nbsp;<code>XII</code>, which is simply <code>X + II</code>. The number <code>27</code> is written as <code>XXVII</code>, which is <code>XX + V + II</code>.</p>
      
      <p>Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not <code>IIII</code>. Instead, the number four is written as <code>IV</code>. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as <code>IX</code>. There are six instances where subtraction is used:</p>
      
      <ul>
          <li><code>I</code> can be placed before <code>V</code> (5) and <code>X</code> (10) to make 4 and 9.&nbsp;</li>
          <li><code>X</code> can be placed before <code>L</code> (50) and <code>C</code> (100) to make 40 and 90.&nbsp;</li>
          <li><code>C</code> can be placed before <code>D</code> (500) and <code>M</code> (1000) to make 400 and 900.</li>
      </ul>
      
      <p>Given a roman numeral, convert it to an integer.</p>
      
      <p>&nbsp;</p>
      <p><strong class="example">Example 1:</strong></p>
      
      <pre><strong>Input:</strong> s = "III"
      <strong>Output:</strong> 3
      <strong>Explanation:</strong> III = 3.
      </pre>
      
      <p><strong class="example">Example 2:</strong></p>
      
      <pre><strong>Input:</strong> s = "LVIII"
      <strong>Output:</strong> 58
      <strong>Explanation:</strong> L = 50, V= 5, III = 3.
      </pre>
      
      <p><strong class="example">Example 3:</strong></p>
      
      <pre><strong>Input:</strong> s = "MCMXCIV"
      <strong>Output:</strong> 1994
      <strong>Explanation:</strong> M = 1000, CM = 900, XC = 90 and IV = 4.
      </pre>
      
      <p>&nbsp;</p>
      <p><strong>Constraints:</strong></p>
      
      <ul>
          <li><code>1 &lt;= s.length &lt;= 15</code></li>
          <li><code>s</code> contains only&nbsp;the characters <code>('I', 'V', 'X', 'L', 'C', 'D', 'M')</code>.</li>
          <li>It is <strong>guaranteed</strong>&nbsp;that <code>s</code> is a valid roman numeral in the range <code>[1, 3999]</code>.</li>
      </ul>
      </div>`,
  },
  {
    qid: 4,
    description: `<div class="xFUwe" data-track-load="description_content"><p>Given two binary strings <code>a</code> and <code>b</code>, return <em>their sum as a binary string</em>.</p>

      <p>&nbsp;</p>
      <p><strong class="example">Example 1:</strong></p>
      <pre><strong>Input:</strong> a = "11", b = "1"
      <strong>Output:</strong> "100"
      </pre><p><strong class="example">Example 2:</strong></p>
      <pre><strong>Input:</strong> a = "1010", b = "1011"
      <strong>Output:</strong> "10101"
      </pre>
      <p>&nbsp;</p>
      <p><strong>Constraints:</strong></p>
      
      <ul>
          <li><code>1 &lt;= a.length, b.length &lt;= 10<sup>4</sup></code></li>
          <li><code>a</code> and <code>b</code> consist&nbsp;only of <code>'0'</code> or <code>'1'</code> characters.</li>
          <li>Each string does not contain leading zeros except for the zero itself.</li>
      </ul>
      </div>`,
  },
  {
    qid: 5,
    description: `<div class="xFUwe" data-track-load="description_content"><p>The <b>Fibonacci numbers</b>, commonly denoted <code>F(n)</code> form a sequence, called the <b>Fibonacci sequence</b>, such that each number is the sum of the two preceding ones, starting from <code>0</code> and <code>1</code>. That is,</p>

      <pre>F(0) = 0, F(1) = 1
      F(n) = F(n - 1) + F(n - 2), for n &gt; 1.
      </pre>
      
      <p>Given <code>n</code>, calculate <code>F(n)</code>.</p>
      
      <p>&nbsp;</p>
      <p><strong class="example">Example 1:</strong></p>
      
      <pre><strong>Input:</strong> n = 2
      <strong>Output:</strong> 1
      <strong>Explanation:</strong> F(2) = F(1) + F(0) = 1 + 0 = 1.
      </pre>
      
      <p><strong class="example">Example 2:</strong></p>
      
      <pre><strong>Input:</strong> n = 3
      <strong>Output:</strong> 2
      <strong>Explanation:</strong> F(3) = F(2) + F(1) = 1 + 1 = 2.
      </pre>
      
      <p><strong class="example">Example 3:</strong></p>
      
      <pre><strong>Input:</strong> n = 4
      <strong>Output:</strong> 3
      <strong>Explanation:</strong> F(4) = F(3) + F(2) = 2 + 1 = 3.
      </pre>
      
      <p>&nbsp;</p>
      <p><strong>Constraints:</strong></p>
      
      <ul>
          <li><code>0 &lt;= n &lt;= 30</code></li>
      </ul>
      </div>`,
  },
  {
    qid: 6,
    description: `<div class="xFUwe" data-track-load="description_content"><p>Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (<code>push</code>, <code>top</code>, <code>pop</code>, and <code>empty</code>).</p>

      <p>Implement the <code>MyStack</code> class:</p>
      
      <ul>
          <li><code>void push(int x)</code> Pushes element x to the top of the stack.</li>
          <li><code>int pop()</code> Removes the element on the top of the stack and returns it.</li>
          <li><code>int top()</code> Returns the element on the top of the stack.</li>
          <li><code>boolean empty()</code> Returns <code>true</code> if the stack is empty, <code>false</code> otherwise.</li>
      </ul>
      
      <p><b>Notes:</b></p>
      
      <ul>
          <li>You must use <strong>only</strong> standard operations of a queue, which means that only <code>push to back</code>, <code>peek/pop from front</code>, <code>size</code> and <code>is empty</code> operations are valid.</li>
          <li>Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue's standard operations.</li>
      </ul>
      
      <p>&nbsp;</p>
      <p><strong class="example">Example 1:</strong></p>
      
      <pre><strong>Input</strong>
      ["MyStack", "push", "push", "top", "pop", "empty"]
      [[], [1], [2], [], [], []]
      <strong>Output</strong>
      [null, null, null, 2, 2, false]
      
      <strong>Explanation</strong>
      MyStack myStack = new MyStack();
      myStack.push(1);
      myStack.push(2);
      myStack.top(); // return 2
      myStack.pop(); // return 2
      myStack.empty(); // return False
      </pre>
      
      <p>&nbsp;</p>
      <p><strong>Constraints:</strong></p>
      
      <ul>
          <li><code>1 &lt;= x &lt;= 9</code></li>
          <li>At most <code>100</code> calls will be made to <code>push</code>, <code>pop</code>, <code>top</code>, and <code>empty</code>.</li>
          <li>All the calls to <code>pop</code> and <code>top</code> are valid.</li>
      </ul>
      
      <p>&nbsp;</p>
      <p><strong>Follow-up:</strong> Can you implement the stack using only one queue?</p>
      </div>`,
  },
  {
    qid: 7,
    description: `<div class="xFUwe" data-track-load="description_content"><p>Table: <code>Person</code></p>

      <pre>+-------------+---------+
      | Column Name | Type    |
      +-------------+---------+
      | personId    | int     |
      | lastName    | varchar |
      | firstName   | varchar |
      +-------------+---------+
      personId is the primary key (column with unique values) for this table.
      This table contains information about the ID of some persons and their first and last names.
      </pre>
      
      <p>&nbsp;</p>
      
      <p>Table: <code>Address</code></p>
      
      <pre>+-------------+---------+
      | Column Name | Type    |
      +-------------+---------+
      | addressId   | int     |
      | personId    | int     |
      | city        | varchar |
      | state       | varchar |
      +-------------+---------+
      addressId is the primary key (column with unique values) for this table.
      Each row of this table contains information about the city and state of one person with ID = PersonId.
      </pre>
      
      <p>&nbsp;</p>
      
      <p>Write a solution to report the first name, last name, city, and state of each person in the <code>Person</code> table. If the address of a <code>personId</code> is not present in the <code>Address</code> table, report <code>null</code> instead.</p>
      
      <p>Return the result table in <strong>any order</strong>.</p>
      
      <p>The result format is in the following example.</p>
      
      <p>&nbsp;</p>
      <p><strong class="example">Example 1:</strong></p>
      
      <pre><strong>Input:</strong> 
      Person table:
      +----------+----------+-----------+
      | personId | lastName | firstName |
      +----------+----------+-----------+
      | 1        | Wang     | Allen     |
      | 2        | Alice    | Bob       |
      +----------+----------+-----------+
      Address table:
      +-----------+----------+---------------+------------+
      | addressId | personId | city          | state      |
      +-----------+----------+---------------+------------+
      | 1         | 2        | New York City | New York   |
      | 2         | 3        | Leetcode      | California |
      +-----------+----------+---------------+------------+
      <strong>Output:</strong> 
      +-----------+----------+---------------+----------+
      | firstName | lastName | city          | state    |
      +-----------+----------+---------------+----------+
      | Allen     | Wang     | Null          | Null     |
      | Bob       | Alice    | New York City | New York |
      +-----------+----------+---------------+----------+
      <strong>Explanation:</strong> 
      There is no address in the address table for the personId = 1 so we return null in their city and state.
      addressId = 1 contains information about the address of personId = 2.
      </pre>
      </div>`,
  },
  {
    qid: 8,
    description: `<div class="xFUwe" data-track-load="description_content"><p>The <strong>DNA sequence</strong> is composed of a series of nucleotides abbreviated as <code>'A'</code>, <code>'C'</code>, <code>'G'</code>, and <code>'T'</code>.</p>

      <ul>
          <li>For example, <code>"ACGAATTCCG"</code> is a <strong>DNA sequence</strong>.</li>
      </ul>
      
      <p>When studying <strong>DNA</strong>, it is useful to identify repeated sequences within the DNA.</p>
      
      <p>Given a string <code>s</code> that represents a <strong>DNA sequence</strong>, return all the <strong><code>10</code>-letter-long</strong> sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in <strong>any order</strong>.</p>
      
      <p>&nbsp;</p>
      <p><strong class="example">Example 1:</strong></p>
      <pre><strong>Input:</strong> s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
      <strong>Output:</strong> ["AAAAACCCCC","CCCCCAAAAA"]
      </pre><p><strong class="example">Example 2:</strong></p>
      <pre><strong>Input:</strong> s = "AAAAAAAAAAAAA"
      <strong>Output:</strong> ["AAAAAAAAAA"]
      </pre>
      <p>&nbsp;</p>
      <p><strong>Constraints:</strong></p>
      
      <ul>
          <li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
          <li><code>s[i]</code> is either <code>'A'</code>, <code>'C'</code>, <code>'G'</code>, or <code>'T'</code>.</li>
      </ul>
      </div>`,
  },
  {
    qid: 9,
    description: `<div class="xFUwe" data-track-load="description_content"><p>There are a total of <code>numCourses</code> courses you have to take, labeled from <code>0</code> to <code>numCourses - 1</code>. You are given an array <code>prerequisites</code> where <code>prerequisites[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that you <strong>must</strong> take course <code>b<sub>i</sub></code> first if you want to take course <code>a<sub>i</sub></code>.</p>

      <ul>
          <li>For example, the pair <code>[0, 1]</code>, indicates that to take course <code>0</code> you have to first take course <code>1</code>.</li>
      </ul>
      
      <p>Return <code>true</code> if you can finish all courses. Otherwise, return <code>false</code>.</p>
      
      <p>&nbsp;</p>
      <p><strong class="example">Example 1:</strong></p>
      
      <pre><strong>Input:</strong> numCourses = 2, prerequisites = [[1,0]]
      <strong>Output:</strong> true
      <strong>Explanation:</strong> There are a total of 2 courses to take. 
      To take course 1 you should have finished course 0. So it is possible.
      </pre>
      
      <p><strong class="example">Example 2:</strong></p>
      
      <pre><strong>Input:</strong> numCourses = 2, prerequisites = [[1,0],[0,1]]
      <strong>Output:</strong> false
      <strong>Explanation:</strong> There are a total of 2 courses to take. 
      To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
      </pre>
      
      <p>&nbsp;</p>
      <p><strong>Constraints:</strong></p>
      
      <ul>
          <li><code>1 &lt;= numCourses &lt;= 2000</code></li>
          <li><code>0 &lt;= prerequisites.length &lt;= 5000</code></li>
          <li><code>prerequisites[i].length == 2</code></li>
          <li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt; numCourses</code></li>
          <li>All the pairs prerequisites[i] are <strong>unique</strong>.</li>
      </ul>
      </div>`,
  },
  {
    qid: 10,
    description: `<div class="xFUwe" data-track-load="description_content"><p>Design a data structure that follows the constraints of a <strong><a href="https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU" target="_blank">Least Recently Used (LRU) cache</a></strong>.</p>

      <p>Implement the <code>LRUCache</code> class:</p>
      
      <ul>
          <li><code>LRUCache(int capacity)</code> Initialize the LRU cache with <strong>positive</strong> size <code>capacity</code>.</li>
          <li><code>int get(int key)</code> Return the value of the <code>key</code> if the key exists, otherwise return <code>-1</code>.</li>
          <li><code>void put(int key, int value)</code> Update the value of the <code>key</code> if the <code>key</code> exists. Otherwise, add the <code>key-value</code> pair to the cache. If the number of keys exceeds the <code>capacity</code> from this operation, <strong>evict</strong> the least recently used key.</li>
      </ul>
      
      <p>The functions <code>get</code> and <code>put</code> must each run in <code>O(1)</code> average time complexity.</p>
      
      <p>&nbsp;</p>
      <p><strong class="example">Example 1:</strong></p>
      
      <pre><strong>Input</strong>
      ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
      [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
      <strong>Output</strong>
      [null, null, null, 1, null, -1, null, -1, 3, 4]
      
      <strong>Explanation</strong>
      LRUCache lRUCache = new LRUCache(2);
      lRUCache.put(1, 1); // cache is {1=1}
      lRUCache.put(2, 2); // cache is {1=1, 2=2}
      lRUCache.get(1);    // return 1
      lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
      lRUCache.get(2);    // returns -1 (not found)
      lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
      lRUCache.get(1);    // return -1 (not found)
      lRUCache.get(3);    // return 3
      lRUCache.get(4);    // return 4
      </pre>
      
      <p>&nbsp;</p>
      <p><strong>Constraints:</strong></p>
      
      <ul>
          <li><code>1 &lt;= capacity &lt;= 3000</code></li>
          <li><code>0 &lt;= key &lt;= 10<sup>4</sup></code></li>
          <li><code>0 &lt;= value &lt;= 10<sup>5</sup></code></li>
          <li>At most <code>2 * 10<sup>5</sup></code> calls will be made to <code>get</code> and <code>put</code>.</li>
      </ul>
      </div>`,
  },
  {
    qid: 11,
    description: `<div class="xFUwe" data-track-load="description_content"><p>Given two strings <code>text1</code> and <code>text2</code>, return <em>the length of their longest <strong>common subsequence</strong>. </em>If there is no <strong>common subsequence</strong>, return <code>0</code>.</p>

      <p>A <strong>subsequence</strong> of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.</p>
      
      <ul>
          <li>For example, <code>"ace"</code> is a subsequence of <code>"abcde"</code>.</li>
      </ul>
      
      <p>A <strong>common subsequence</strong> of two strings is a subsequence that is common to both strings.</p>
      
      <p>&nbsp;</p>
      <p><strong class="example">Example 1:</strong></p>
      
      <pre><strong>Input:</strong> text1 = "abcde", text2 = "ace" 
      <strong>Output:</strong> 3  
      <strong>Explanation:</strong> The longest common subsequence is "ace" and its length is 3.
      </pre>
      
      <p><strong class="example">Example 2:</strong></p>
      
      <pre><strong>Input:</strong> text1 = "abc", text2 = "abc"
      <strong>Output:</strong> 3
      <strong>Explanation:</strong> The longest common subsequence is "abc" and its length is 3.
      </pre>
      
      <p><strong class="example">Example 3:</strong></p>
      
      <pre><strong>Input:</strong> text1 = "abc", text2 = "def"
      <strong>Output:</strong> 0
      <strong>Explanation:</strong> There is no such common subsequence, so the result is 0.
      </pre>
      
      <p>&nbsp;</p>
      <p><strong>Constraints:</strong></p>
      
      <ul>
          <li><code>1 &lt;= text1.length, text2.length &lt;= 1000</code></li>
          <li><code>text1</code> and <code>text2</code> consist of only lowercase English characters.</li>
      </ul>
      </div>`,
  },
  {
    qid: 12,
    description: `<div class="xFUwe" data-track-load="description_content"><p>You are given an <code>n x n</code> 2D <code>matrix</code> representing an image, rotate the image by <strong>90</strong> degrees (clockwise).</p>

      <p>You have to rotate the image <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank"><strong>in-place</strong></a>, which means you have to modify the input 2D matrix directly. <strong>DO NOT</strong> allocate another 2D matrix and do the rotation.</p>
      
      <p>&nbsp;</p>
      <p><strong class="example">Example 1:</strong></p>
      <img alt="" src="https://assets.leetcode.com/uploads/2020/08/28/mat1.jpg" style="width: 500px; height: 188px;">
      <pre><strong>Input:</strong> matrix = [[1,2,3],[4,5,6],[7,8,9]]
      <strong>Output:</strong> [[7,4,1],[8,5,2],[9,6,3]]
      </pre>
      
      <p><strong class="example">Example 2:</strong></p>
      <img alt="" src="https://assets.leetcode.com/uploads/2020/08/28/mat2.jpg" style="width: 500px; height: 201px;">
      <pre><strong>Input:</strong> matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
      <strong>Output:</strong> [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
      </pre>
      
      <p>&nbsp;</p>
      <p><strong>Constraints:</strong></p>
      
      <ul>
          <li><code>n == matrix.length == matrix[i].length</code></li>
          <li><code>1 &lt;= n &lt;= 20</code></li>
          <li><code>-1000 &lt;= matrix[i][j] &lt;= 1000</code></li>
      </ul>
      </div>`,
  },
  {
    qid: 13,
    description: `<div class="xFUwe" data-track-load="description_content"><p><code>n</code> passengers board an airplane with exactly <code>n</code> seats. The first passenger has lost the ticket and picks a seat randomly. But after that, the rest of the passengers will:</p>

      <ul>
          <li>Take their own seat if it is still available, and</li>
          <li>Pick other seats randomly when they find their seat occupied</li>
      </ul>
      
      <p>Return <em>the probability that the </em><code>n<sup>th</sup></code><em> person gets his own seat</em>.</p>
      
      <p>&nbsp;</p>
      <p><strong class="example">Example 1:</strong></p>
      
      <pre><strong>Input:</strong> n = 1
      <strong>Output:</strong> 1.00000
      <strong>Explanation: </strong>The first person can only get the first seat.</pre>
      
      <p><strong class="example">Example 2:</strong></p>
      
      <pre><strong>Input:</strong> n = 2
      <strong>Output:</strong> 0.50000
      <strong>Explanation: </strong>The second person has a probability of 0.5 to get the second seat (when first person gets the first seat).
      </pre>
      
      <p>&nbsp;</p>
      <p><strong>Constraints:</strong></p>
      
      <ul>
          <li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
      </ul>
      </div>`,
  },
  {
    qid: 14,
    description: `<div class="xFUwe" data-track-load="description_content"><p>Given the <code>root</code> of a binary tree, <em>determine if it is a valid binary search tree (BST)</em>.</p>

      <p>A <strong>valid BST</strong> is defined as follows:</p>
      
      <ul>
          <li>The left <span data-keyword="subtree" class=" cursor-pointer relative text-dark-blue-s text-sm"><div class="popover-wrapper inline-block" data-headlessui-state=""><div><div aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:rp:"><div>subtree</div></div><div style="position: fixed; z-index: 40; inset: 0px auto auto 0px; transform: translate(122px, 316px);"></div></div></div></span> of a node contains only nodes with keys <strong>less than</strong> the node's key.</li>
          <li>The right subtree of a node contains only nodes with keys <strong>greater than</strong> the node's key.</li>
          <li>Both the left and right subtrees must also be binary search trees.</li>
      </ul>
      
      <p>&nbsp;</p>
      <p><strong class="example">Example 1:</strong></p>
      <img alt="" src="https://assets.leetcode.com/uploads/2020/12/01/tree1.jpg" style="width: 302px; height: 182px;">
      <pre><strong>Input:</strong> root = [2,1,3]
      <strong>Output:</strong> true
      </pre>
      
      <p><strong class="example">Example 2:</strong></p>
      <img alt="" src="https://assets.leetcode.com/uploads/2020/12/01/tree2.jpg" style="width: 422px; height: 292px;">
      <pre><strong>Input:</strong> root = [5,1,4,null,null,3,6]
      <strong>Output:</strong> false
      <strong>Explanation:</strong> The root node's value is 5 but its right child's value is 4.
      </pre>
      
      <p>&nbsp;</p>
      <p><strong>Constraints:</strong></p>
      
      <ul>
          <li>The number of nodes in the tree is in the range <code>[1, 10<sup>4</sup>]</code>.</li>
          <li><code>-2<sup>31</sup> &lt;= Node.val &lt;= 2<sup>31</sup> - 1</code></li>
      </ul>
      </div>`,
  },
  {
    qid: 15,
    description: `<div class="xFUwe" data-track-load="description_content"><p>You are given an array of integers&nbsp;<code>nums</code>, there is a sliding window of size <code>k</code> which is moving from the very left of the array to the very right. You can only see the <code>k</code> numbers in the window. Each time the sliding window moves right by one position.</p>

      <p>Return <em>the max sliding window</em>.</p>
      
      <p>&nbsp;</p>
      <p><strong class="example">Example 1:</strong></p>
      
      <pre><strong>Input:</strong> nums = [1,3,-1,-3,5,3,6,7], k = 3
      <strong>Output:</strong> [3,3,5,5,6,7]
      <strong>Explanation:</strong> 
      Window position                Max
      ---------------               -----
      [1  3  -1] -3  5  3  6  7       <strong>3</strong>
       1 [3  -1  -3] 5  3  6  7       <strong>3</strong>
       1  3 [-1  -3  5] 3  6  7      <strong> 5</strong>
       1  3  -1 [-3  5  3] 6  7       <strong>5</strong>
       1  3  -1  -3 [5  3  6] 7       <strong>6</strong>
       1  3  -1  -3  5 [3  6  7]      <strong>7</strong>
      </pre>
      
      <p><strong class="example">Example 2:</strong></p>
      
      <pre><strong>Input:</strong> nums = [1], k = 1
      <strong>Output:</strong> [1]
      </pre>
      
      <p>&nbsp;</p>
      <p><strong>Constraints:</strong></p>
      
      <ul>
          <li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
          <li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
          <li><code>1 &lt;= k &lt;= nums.length</code></li>
      </ul>
      </div>`,
  },
  {
    qid: 16,
    description: `<div class="xFUwe" data-track-load="description_content"><p>The <strong>n-queens</strong> puzzle is the problem of placing <code>n</code> queens on an <code>n x n</code> chessboard such that no two queens attack each other.</p>

      <p>Given an integer <code>n</code>, return <em>all distinct solutions to the <strong>n-queens puzzle</strong></em>. You may return the answer in <strong>any order</strong>.</p>
      
      <p>Each solution contains a distinct board configuration of the n-queens' placement, where <code>'Q'</code> and <code>'.'</code> both indicate a queen and an empty space, respectively.</p>
      
      <p>&nbsp;</p>
      <p><strong class="example">Example 1:</strong></p>
      <img alt="" src="https://assets.leetcode.com/uploads/2020/11/13/queens.jpg" style="width: 600px; height: 268px;">
      <pre><strong>Input:</strong> n = 4
      <strong>Output:</strong> [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
      <strong>Explanation:</strong> There exist two distinct solutions to the 4-queens puzzle as shown above
      </pre>
      
      <p><strong class="example">Example 2:</strong></p>
      
      <pre><strong>Input:</strong> n = 1
      <strong>Output:</strong> [["Q"]]
      </pre>
      
      <p>&nbsp;</p>
      <p><strong>Constraints:</strong></p>
      
      <ul>
          <li><code>1 &lt;= n &lt;= 9</code></li>
      </ul>
      </div>`,
  },
  {
    qid: 17,
    description: `<div class="xFUwe" data-track-load="description_content"><p>Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.</p>

      <p>Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.</p>
      
      <p><strong>Clarification:</strong> The input/output format is the same as <a href="https://support.leetcode.com/hc/en-us/articles/360011883654-What-does-1-null-2-3-mean-in-binary-tree-representation-" target="_blank">how LeetCode serializes a binary tree</a>. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.</p>
      
      <p>&nbsp;</p>
      <p><strong class="example">Example 1:</strong></p>
      <img alt="" src="https://assets.leetcode.com/uploads/2020/09/15/serdeser.jpg" style="width: 442px; height: 324px;">
      <pre><strong>Input:</strong> root = [1,2,3,null,null,4,5]
      <strong>Output:</strong> [1,2,3,null,null,4,5]
      </pre>
      
      <p><strong class="example">Example 2:</strong></p>
      
      <pre><strong>Input:</strong> root = []
      <strong>Output:</strong> []
      </pre>
      
      <p>&nbsp;</p>
      <p><strong>Constraints:</strong></p>
      
      <ul>
          <li>The number of nodes in the tree is in the range <code>[0, 10<sup>4</sup>]</code>.</li>
          <li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>
      </ul>
      </div>`,
  },
  {
    qid: 18,
    description: `<div class="xFUwe" data-track-load="description_content"><p>Given an input string (<code>s</code>) and a pattern (<code>p</code>), implement wildcard pattern matching with support for <code>'?'</code> and <code>'*'</code> where:</p>

      <ul>
          <li><code>'?'</code> Matches any single character.</li>
          <li><code>'*'</code> Matches any sequence of characters (including the empty sequence).</li>
      </ul>
      
      <p>The matching should cover the <strong>entire</strong> input string (not partial).</p>
      
      <p>&nbsp;</p>
      <p><strong class="example">Example 1:</strong></p>
      
      <pre><strong>Input:</strong> s = "aa", p = "a"
      <strong>Output:</strong> false
      <strong>Explanation:</strong> "a" does not match the entire string "aa".
      </pre>
      
      <p><strong class="example">Example 2:</strong></p>
      
      <pre><strong>Input:</strong> s = "aa", p = "*"
      <strong>Output:</strong> true
      <strong>Explanation:</strong>&nbsp;'*' matches any sequence.
      </pre>
      
      <p><strong class="example">Example 3:</strong></p>
      
      <pre><strong>Input:</strong> s = "cb", p = "?a"
      <strong>Output:</strong> false
      <strong>Explanation:</strong>&nbsp;'?' matches 'c', but the second letter is 'a', which does not match 'b'.
      </pre>
      
      <p>&nbsp;</p>
      <p><strong>Constraints:</strong></p>
      
      <ul>
          <li><code>0 &lt;= s.length, p.length &lt;= 2000</code></li>
          <li><code>s</code> contains only lowercase English letters.</li>
          <li><code>p</code> contains only lowercase English letters, <code>'?'</code> or <code>'*'</code>.</li>
      </ul>
      </div>`,
  },
  {
    qid: 19,
    description: `<div class="xFUwe" data-track-load="description_content"><p>You are given an array of integers <code>nums</code> represents the numbers written on a chalkboard.</p>

      <p>Alice and Bob take turns erasing exactly one number from the chalkboard, with Alice starting first. If erasing a number causes the bitwise XOR of all the elements of the chalkboard to become <code>0</code>, then that player loses. The bitwise XOR of one element is that element itself, and the bitwise XOR of no elements is <code>0</code>.</p>
      
      <p>Also, if any player starts their turn with the bitwise XOR of all the elements of the chalkboard equal to <code>0</code>, then that player wins.</p>
      
      <p>Return <code>true</code> <em>if and only if Alice wins the game, assuming both players play optimally</em>.</p>
      
      <p>&nbsp;</p>
      <p><strong class="example">Example 1:</strong></p>
      
      <pre><strong>Input:</strong> nums = [1,1,2]
      <strong>Output:</strong> false
      <strong>Explanation:</strong> 
      Alice has two choices: erase 1 or erase 2. 
      If she erases 1, the nums array becomes [1, 2]. The bitwise XOR of all the elements of the chalkboard is 1 XOR 2 = 3. Now Bob can remove any element he wants, because Alice will be the one to erase the last element and she will lose. 
      If Alice erases 2 first, now nums become [1, 1]. The bitwise XOR of all the elements of the chalkboard is 1 XOR 1 = 0. Alice will lose.
      </pre>
      
      <p><strong class="example">Example 2:</strong></p>
      
      <pre><strong>Input:</strong> nums = [0,1]
      <strong>Output:</strong> true
      </pre>
      
      <p><strong class="example">Example 3:</strong></p>
      
      <pre><strong>Input:</strong> nums = [1,2,3]
      <strong>Output:</strong> true
      </pre>
      
      <p>&nbsp;</p>
      <p><strong>Constraints:</strong></p>
      
      <ul>
          <li><code>1 &lt;= nums.length &lt;= 1000</code></li>
          <li><code>0 &lt;= nums[i] &lt; 2<sup>16</sup></code></li>
      </ul>
      </div>`,
  },
  {
    qid: 20,
    description: `<div class="xFUwe" data-track-load="description_content"><p>Table: <code>Trips</code></p>

      <pre>
      +-------------+----------+
      | Column Name | Type     |
      +-------------+----------+
      | id          | int      |
      | client_id   | int      |
      | driver_id   | int      |
      | city_id     | int      |
      | status      | enum     |
      | request_at  | date     |     
      +-------------+----------+
      id is the primary key (column with unique values) for this table.
      The table holds all taxi trips. Each trip has a unique id, while client_id and driver_id are foreign keys to the users_id at the Users table.
      Status is an ENUM (category) type of ('completed', 'cancelled_by_driver', 'cancelled_by_client').
      </pre>
      
      <p>&nbsp;</p>
      
      <p>Table: <code>Users</code></p>
      <pre>
      +-------------+----------+
      | Column Name | Type     |
      +-------------+----------+
      | users_id    | int      |
      | banned      | enum     |
      | role        | enum     |
      +-------------+----------+
      users_id is the primary key (column with unique values) for this table.
      The table holds all users. Each user has a unique users_id, and role is an ENUM type of ('client', 'driver', 'partner').
      banned is an ENUM (category) type of ('Yes', 'No').
      </pre>
      
      <p>&nbsp;</p>
      
      <p>The <strong>cancellation rate</strong> is computed by dividing the number of canceled (by client or driver) requests with unbanned users by the total number of requests with unbanned users on that day.</p>
      
      <p>Write a solution to find the <strong>cancellation rate</strong> of requests with unbanned users (<strong>both client and driver must not be banned</strong>) each day between <code>"2013-10-01"</code> and <code>"2013-10-03"</code>. Round <code>Cancellation Rate</code> to <strong>two decimal</strong> points.</p>
      
      <p>Return the result table in <strong>any order</strong>.</p>
      
      <p>The&nbsp;result format is in the following example.</p>
      
      <p>&nbsp;</p>
      <p><strong class="example">Example 1:</strong></p>
      
      <pre><strong>Input:</strong> 
      Trips table:
      +----+-----------+-----------+---------+---------------------+------------+
      | id | client_id | driver_id | city_id | status              | request_at |
      +----+-----------+-----------+---------+---------------------+------------+
      | 1  | 1         | 10        | 1       | completed           | 2013-10-01 |
      | 2  | 2         | 11        | 1       | cancelled_by_driver | 2013-10-01 |
      | 3  | 3         | 12        | 6       | completed           | 2013-10-01 |
      | 4  | 4         | 13        | 6       | cancelled_by_client | 2013-10-01 |
      | 5  | 1         | 10        | 1       | completed           | 2013-10-02 |
      | 6  | 2         | 11        | 6       | completed           | 2013-10-02 |
      | 7  | 3         | 12        | 6       | completed           | 2013-10-02 |
      | 8  | 2         | 12        | 12      | completed           | 2013-10-03 |
      | 9  | 3         | 10        | 12      | completed           | 2013-10-03 |
      | 10 | 4         | 13        | 12      | cancelled_by_driver | 2013-10-03 |
      +----+-----------+-----------+---------+---------------------+------------+
      Users table:
      +----------+--------+--------+
      | users_id | banned | role   |
      +----------+--------+--------+
      | 1        | No     | client |
      | 2        | Yes    | client |
      | 3        | No     | client |
      | 4        | No     | client |
      | 10       | No     | driver |
      | 11       | No     | driver |
      | 12       | No     | driver |
      | 13       | No     | driver |
      +----------+--------+--------+
      <strong>Output:</strong> 
      +------------+-------------------+
      | Day        | Cancellation Rate |
      +------------+-------------------+
      | 2013-10-01 | 0.33              |
      | 2013-10-02 | 0.00              |
      | 2013-10-03 | 0.50              |
      +------------+-------------------+
      <strong>Explanation:</strong> 
      On 2013-10-01:
        - There were 4 requests in total, 2 of which were canceled.
        - However, the request with Id=2 was made by a banned client (User_Id=2), so it is ignored in the calculation.
        - Hence there are 3 unbanned requests in total, 1 of which was canceled.
        - The Cancellation Rate is (1 / 3) = 0.33
      On 2013-10-02:
        - There were 3 requests in total, 0 of which were canceled.
        - The request with Id=6 was made by a banned client, so it is ignored.
        - Hence there are 2 unbanned requests in total, 0 of which were canceled.
        - The Cancellation Rate is (0 / 2) = 0.00
      On 2013-10-03:
        - There were 3 requests in total, 1 of which was canceled.
        - The request with Id=8 was made by a banned client, so it is ignored.
        - Hence there are 2 unbanned request in total, 1 of which were canceled.
        - The Cancellation Rate is (1 / 2) = 0.50
      </pre>
      </div>`,
  },
];
